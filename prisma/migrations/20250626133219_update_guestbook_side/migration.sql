/*
  Warnings:

  - You are about to drop the column `ownerId` on the `GuestBookEntry` table. All the data in the column will be lost.
  - Added the required column `side` to the `GuestBookEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuestBookEntry" DROP CONSTRAINT "GuestBookEntry_ownerId_fkey";

-- AlterTable
ALTER TABLE "GuestBookEntry" DROP COLUMN "ownerId",
ADD COLUMN     "side" TEXT NOT NULL;
