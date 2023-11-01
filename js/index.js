import { addWeek, addMonth, subtractDates, subtractHours, subtractMinutes, subtractSeconds, countWorkdays, countWeekends } from "./date.js";

const startDateInput = document.querySelector(".start-date");
const endDateInput = document.querySelector(".end-date");
const weekButton = document.querySelector(".week-button");
const monthButton = document.querySelector(".month-button");
const calculator = document.querySelector(".all-calculator");
const test = document.querySelector(".test-tab ");
const firstTab = document.querySelector(".first-tab");
const secondTab = document.querySelector(".second-tab");
const languageList = document.querySelector(".language-list");
const languageBox = document.querySelector(".language-box");
const blockLanguage = document.querySelector(".block-language ");
const globe = document.querySelector(".language-img");
const button = document.querySelector(".button");
const span = document.querySelector(" .botton-span");
const timeUnit = document.querySelector(".time-unit");
const dayOptions = document.querySelector(".day-options");
const tableStartDate = document.querySelector(".start-date-th");
const tableEndDate = document.querySelector(".end-date-th");
const tableRasultDate = document.querySelector(".result-date-th");

firstTab.addEventListener("click", function () {
    calculator.style.display = "block";
    test.style.display = "none";
    this.classList.add("active");
    secondTab.classList.remove("active");
});

secondTab.addEventListener("click", function () {
    calculator.style.display = "none";
    test.style.display = "block";
    this.classList.add("active");
    firstTab.classList.remove("active");
});

function toggleLanguageList() {
    blockLanguage.classList.add("active");
    globe.classList.add("globe");
    if (languageList.style.display === "block") {
        languageList.style.display = "none";
        blockLanguage.classList.remove("active");
        globe.classList.remove("globe");
    } else {
        languageList.style.display = "block";
    }
}

function activeInput() {
    if (startDateInput.value) {
        endDateInput.disabled = false;
    } else {
        endDateInput.disabled = true;
    }
}
startDateInput.addEventListener("change", activeInput);

function activeButton() {
    if (endDateInput.value) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}
endDateInput.addEventListener("input", activeButton);

startDateInput.addEventListener("input", function () {
    endDateInput.min = startDateInput.value;
});

const newDate = new Date();
const minDate = newDate.toISOString().split("T")[0];
startDateInput.min = minDate;

weekButton.addEventListener("click", () => {
    endDateInput.disabled = false;
    button.disabled = false;
    const dateValue = startDateInput.value;
    if (dateValue) {
        const date = new Date(endDateInput.value || startDateInput.value);
        endDateInput.valueAsDate = addWeek(date);
    } else {
        const today = new Date();
        startDateInput.valueAsDate = today;
        endDateInput.valueAsDate = addWeek(today);
    }
});

monthButton.addEventListener("click", () => {
    endDateInput.disabled = false;
    button.disabled = false;
    const dateValue = startDateInput.value;
    if (dateValue) {
        const date = new Date(endDateInput.value || startDateInput.value);
        endDateInput.valueAsDate = addMonth(date);
    } else {
        const today = new Date();
        startDateInput.valueAsDate = today;
        endDateInput.valueAsDate = addMonth(today);
    }
});

languageBox.addEventListener("click", toggleLanguageList);

const tableStartDateElement = document.createElement("p");
tableStartDateElement.textContent = startDateInput.value;

button.addEventListener("click", () => {
    const firstDate = startDateInput.value;
    const secondDate = endDateInput.value;
    const unitValue = timeUnit.value;
    const optionsValue = dayOptions.value;
    let result;
    if (unitValue === "days") {
        const differenceInDays = subtractDates(firstDate, secondDate);
        result = differenceInDays + "днів";
    } else if (unitValue === "hours") {
        const differenceInHours = subtractHours(firstDate, secondDate);
        result = differenceInHours + "годин";
    } else if (unitValue === "minutes") {
        const differenceInMinutes = subtractMinutes(firstDate, secondDate);
        result = differenceInMinutes + "хвилин";
    } else if (unitValue === "seconds") {
        const differenceInSeconds = subtractSeconds(firstDate, secondDate);
        result = differenceInSeconds + "cекунд";
    } else {
        return null;
    }
    if (optionsValue === "weekdays") {
        const weekdays = countWorkdays(firstDate, secondDate);
        result += ` (${weekdays} будніх днів)`;
    } else if (optionsValue === "weekends") {
        const weekends = countWeekends(firstDate, secondDate);
        result += ` (${weekends} вихідних днів)`;
    }
    span.textContent = result;

    const tableStartDateElement = document.createElement("p");
    tableStartDateElement.textContent = startDateInput.value;
    tableStartDate.append(tableStartDateElement);
    tableStartDateElement.classList.add("table-text");
    localStorage.setItem("StartDate", tableStartDateElement.textContent);

    const tableEndDateElement = document.createElement("p");
    tableEndDateElement.textContent = endDateInput.value;
    tableEndDate.append(tableEndDateElement);
    tableEndDateElement.classList.add("table-text");
    localStorage.setItem("EndDate", tableEndDateElement.textContent);

    const tableRasultDateElement = document.createElement("p");
    tableRasultDateElement.textContent = span.textContent;
    tableRasultDate.append(tableRasultDateElement);
    tableRasultDateElement.classList.add("table-text");
    localStorage.setItem("Rasult", tableRasultDateElement.textContent);
});
