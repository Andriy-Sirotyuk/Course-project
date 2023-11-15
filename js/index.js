import { addWeek, addMonth, subtractTime, countWorkdays, countWeekends } from "./date.js";
import { storeResult } from "./localStorage.js";
import { fetchCountriesData, getHolidaysByCountryAndYear } from "./api.js";

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
const optionCountry = document.querySelector(".option-country");
const optionYear = document.querySelector(".option-year");
const showTable = document.querySelector(".show-table");
const countrySelect = document.querySelector(".country-select");
const yearSelect = document.querySelector(".year-select");

function activateInput() {
    if (startDateInput.value) {
        endDateInput.disabled = false;
    } else {
        endDateInput.disabled = true;
    }
}

function activateButton() {
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
    this.classList.remove("active");
    secondTab.classList.add("active");
});

secondTab.addEventListener("click", function () {
    calculator.style.display = "none";
    test.style.display = "block";
    this.classList.remove("active");
    firstTab.classList.add("active");
});

endDateInput.addEventListener("input", function () {
    startDateInput.max = endDateInput.value;
    activateButton();
});

startDateInput.addEventListener("input", function () {
    endDateInput.min = startDateInput.value;
    activateInput();
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

function displayCountries(countriesList) {
    countriesList.forEach(({ country_name }) => {
        const option = document.createElement("option");
        option.textContent = country_name;
        countrySelect.appendChild(option);
    });
}

async function getCountries() {
    try {
        const data = await fetchCountriesData();
        console.log(data);
        const countriesList = data.response.countries;
        displayCountries(countriesList);
    } catch (error) {}
}

getCountries();

for (let year = 2001; year <= 2049; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

function activateYearsSlect() {
    if (countrySelect.value) {
        yearSelect.disabled = false;
    } else {
        yearSelect.disabled = true;
    }
}
countrySelect.addEventListener("change", activateYearsSlect);

const country = optionCountry.value;
const year = optionYear.value;
try {
    const holidays = await getHolidaysByCountryAndYear(country, year);
    console.log(holidays);
} catch (error) {
    console.error("Error:", error.message);
}
