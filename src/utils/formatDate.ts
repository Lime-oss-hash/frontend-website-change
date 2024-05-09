export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            
        });
}

export function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US",
    {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}