import { addWeek, addMonth, subtractTime, countWorkdays, countWeekends } from "./date.js";
import { storeResult } from "./localStorage.js";

const startDateInput = document.querySelector(".start-date");
const endDateInput = document.querySelector(".end-date");
const weekButton = document.querySelector(".week-button");
const monthButton = document.querySelector(".month-button");
const calculator = document.querySelector(".all-calculator");
const test = document.querySelector(".test-tab ");
const firstTab = document.querySelector(".first-tab");
const secondTab = document.querySelector(".second-tab");
const button = document.querySelector(".button");
const span = document.querySelector(" .botton-span");
const timeUnit = document.querySelector(".time-unit");
const dayOptions = document.querySelector(".day-options");
const tableStartDate = document.querySelector(".start-date-th");
const tableEndDate = document.querySelector(".end-date-th");
const tableRasultDate = document.querySelector(".result-date-th");
const ukr = document.querySelector(".ukr");
const eng = document.querySelector(".eng");
const showTable = document.querySelector(".show-table");

function activateInput() {
    if (startDateInput.value) {
        endDateInput.disabled = false;
    } else {
        endDateInput.disabled = true;
    }
}

function activeButton() {
    if (endDateInput.value) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function handleButtonClick(addData) {
    endDateInput.disabled = false;
    button.disabled = false;
    const dateValue = startDateInput.value;
    if (dateValue) {
        const date = new Date(startDateInput.value);
        endDateInput.valueAsDate = addData(date);
    } else {
        const today = new Date();
        startDateInput.valueAsDate = today;
        endDateInput.valueAsDate = addData(today);
    }
}

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

ukr.addEventListener("click", function () {
    this.classList.add("active-list");
    eng.classList.remove("active-list");
});

eng.addEventListener("click", function () {
    this.classList.add("active-list");
    ukr.classList.remove("active-list");
});

startDateInput.addEventListener("change", activateInput);

endDateInput.addEventListener("input", activeButton);

endDateInput.addEventListener("input", function () {
    startDateInput.max = endDateInput.value;
});

startDateInput.addEventListener("input", function () {
    endDateInput.min = startDateInput.value;
});

weekButton.addEventListener("click", () => handleButtonClick(addWeek));

monthButton.addEventListener("click", () => handleButtonClick(addMonth));

button.addEventListener("click", () => {
    showTable.style.display = "block";
    const firstDate = startDateInput.value;
    const secondDate = endDateInput.value;
    const unitValue = timeUnit.value;
    const optionsValue = dayOptions.value;

    let timeDifference;
    let workdays;
    let weekends;

    if (unitValue === "days") {
        timeDifference = subtractTime(firstDate, secondDate, "days");
    } else if (unitValue === "hours") {
        timeDifference = subtractTime(firstDate, secondDate, "hours");
    } else if (unitValue === "minutes") {
        timeDifference = subtractTime(firstDate, secondDate, "minutes");
    } else if (unitValue === "seconds") {
        timeDifference = subtractTime(firstDate, secondDate, "seconds");
    }
    let result = timeDifference;

    if (optionsValue === "weekdays") {
        workdays = countWorkdays(firstDate, secondDate);
        result = workdays;
    } else if (optionsValue === "weekends") {
        weekends = countWeekends(firstDate, secondDate);
        result = weekends;
    }

    span.textContent = result;

    function createElement(value, targetElement) {
        const tableElement = document.createElement("strong");
        tableElement.textContent = value;
        tableElement.classList.add("table-text");

        if (targetElement.childNodes.length > 10) {
            const childElement = targetElement.firstElementChild;
            targetElement.replaceChild(tableElement, childElement);
        } else {
            targetElement.append(tableElement);
        }
    }

    createElement(firstDate, tableStartDate);
    createElement(secondDate, tableEndDate);
    createElement(span.textContent, tableRasultDate);

    storeResult(firstDate, secondDate, span.textContent);
});
