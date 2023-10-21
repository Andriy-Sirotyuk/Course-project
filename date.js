import { startDateInput } from "./variables.js";

export function addWeek() {
    const selectedDate = new Date(startDateInput.value);
    if (!isNaN(selectedDate)) {
        selectedDate.setDate(selectedDate.getDate() + 7);
        startDateInput.valueAsDate = selectedDate;
    }
}

export function addMonth() {
    const selectedDate = new Date(startDateInput.value);
    if (!isNaN(selectedDate)) {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        startDateInput.valueAsDate = selectedDate;
    }
}
