-- CreateTable
CREATE TABLE "GuestBookEntry" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestBookEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuestBookEntry" ADD CONSTRAINT "GuestBookEntry_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
