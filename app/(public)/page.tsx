import { isFirstSetup } from "@/lib/setup";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  const firstSetup = await isFirstSetup();

  if (firstSetup) {
    redirect('/setup')
  }

  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        HOMEPAGE
      </main>

  );
}
