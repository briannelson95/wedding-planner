import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { canUploadOrViewFiles } from "@/lib/auth/checkRole";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { prisma } from "@/lib/prisma";

const MAX_SIZE_MB = parseInt(process.env.UPLOAD_FILE_SIZE || '10', 10);
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// Ensure it's relative to project root
const UPLOAD_DIR = path.join(process.cwd(), 'data/uploads');

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !canUploadOrViewFiles(user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const eventId = formData.get("eventId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: `File exceeds ${MAX_SIZE_MB}MB` }, { status: 400 });
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    // Ensure uploads directory exists
    if (!existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Create unique filename
    const safeFileName = `${uuidv4()}-${file.name}`;
    const fullPath = path.join(UPLOAD_DIR, safeFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    writeFileSync(fullPath, buffer);

    // Save metadata in DB
    const saved = await prisma.fileUpload.create({
      data: {
        filename: file.name,
        filepath: fullPath,
        filetype: file.type,
        filesize: file.size,
        uploadedBy: {
          connect: { email: user.email! },
        },
        event: eventId ? {
          connect: { id: eventId }
        } : undefined,
      },
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      file: saved,
    }, { status: 201 });

  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
