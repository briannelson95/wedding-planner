/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `InviteToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InviteToken_email_key" ON "InviteToken"("email");
