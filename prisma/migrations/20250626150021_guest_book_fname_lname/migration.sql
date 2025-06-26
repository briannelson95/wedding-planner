/*
  Warnings:

  - You are about to drop the column `name` on the `GuestBookEntry` table. All the data in the column will be lost.
  - Added the required column `fName` to the `GuestBookEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `GuestBookEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuestBookEntry" DROP COLUMN "name",
ADD COLUMN     "fName" TEXT NOT NULL,
ADD COLUMN     "lName" TEXT NOT NULL;
