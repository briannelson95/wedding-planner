-- CreateTable
CREATE TABLE "EventGuest" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "guestBookEntryId" TEXT NOT NULL,
    "rsvp" "RsvpStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventGuest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventGuest_eventId_guestBookEntryId_key" ON "EventGuest"("eventId", "guestBookEntryId");

-- AddForeignKey
ALTER TABLE "EventGuest" ADD CONSTRAINT "EventGuest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGuest" ADD CONSTRAINT "EventGuest_guestBookEntryId_fkey" FOREIGN KEY ("guestBookEntryId") REFERENCES "GuestBookEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
