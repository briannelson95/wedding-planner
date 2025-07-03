export function getDaysUntilEvent(eventDate: Date): number {
    const today = new Date();
    const target = new Date(eventDate);
    
    // Clear time from both dates to ensure accurate full-day difference
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffInMs = target.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
}