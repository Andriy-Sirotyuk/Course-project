export function addWeek(date) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);

    return newDate;
}

export function addMonth(date) {
    const selectedDate = new Date(date);
    selectedDate.setMonth(selectedDate.getMonth() + 1);

    return selectedDate;
}

export function subtractDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start) && !isNaN(end)) {
        const differenceInMilliseconds = end - start;
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return differenceInDays;
    } else {
        return null;
    }
}

export function subtractHours(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start) && !isNaN(end)) {
        const differenceInMilliseconds = end - start;
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        return differenceInHours;
    } else {
        return null;
    }
}

export function subtractMinutes(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start) && !isNaN(end)) {
        const differenceInMilliseconds = end - start;
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
        return differenceInMinutes;
    } else {
        return null;
    }
}

export function subtractSeconds(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start) && !isNaN(end)) {
        const differenceInMilliseconds = end - start;
        const differenceInSeconds = differenceInMilliseconds / 1000;
        return differenceInSeconds;
    } else {
        return null;
    }
}

export function countWorkdays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workdays = 0;

    while (start <= end) {
        const dayOfWeek = start.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workdays++;
        }
        start.setDate(start.getDate() + 1);
    }

    return workdays;
}

export function countWeekends(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let weekends = 0;

    while (start <= end) {
        const dayOfWeek = start.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends++;
        }
        start.setDate(start.getDate() + 1);
    }

    return weekends;
}
