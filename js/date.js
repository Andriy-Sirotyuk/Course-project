import { MAX_STORED_RESULTS } from "./index.js";

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

export function subtractTime(startDate, endDate, unit) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMilliseconds = end - start;
    switch (unit) {
        case "days":
            return differenceInMilliseconds / (1000 * 60 * 60 * 24);
        case "hours":
            return differenceInMilliseconds / (1000 * 60 * 60);
        case "minutes":
            return differenceInMilliseconds / (1000 * 60);
        case "seconds":
            return differenceInMilliseconds / 1000;
        default:
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

export function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < MAX_STORED_RESULTS ? `0${day}` : day;
    const formattedMonth = month < MAX_STORED_RESULTS ? `0${month}` : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    return formattedDate;
}
