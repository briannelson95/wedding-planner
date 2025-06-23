-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COUPLE', 'PLANNER', 'GUEST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';
