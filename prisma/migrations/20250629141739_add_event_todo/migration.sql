-- CreateTable
CREATE TABLE "EventTodo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventTodo" ADD CONSTRAINT "EventTodo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
