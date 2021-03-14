

function getRandomDate(): Date {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
}

function formatDate(date: Date): string {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);

    return `${da} ${mo} ${ye}`;
}

export {
    getRandomDate,
    formatDate
};