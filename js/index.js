import { addWeek, addMonth, subtractTime, countWorkdays, countWeekends } from "./date.js";
import { storeResult } from "./localStorage.js";
import { fetchCountriesData, getHolidaysByCountryAndYear } from "./api.js";
import { showAlert } from "./alert.js";

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
const showTable = document.querySelector(".show-table");
const selebretionDate = document.querySelector(".selebretion-date");
const nameDate = document.querySelector(".name-date");
const headerHoliddays = document.querySelector(".header-holiddays");
const sortDdata = document.querySelector(".sort-data");
export const countrySelect = document.querySelector(".country-select");
export const yearSelect = document.querySelector(".year-select");

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

function fillCountriesSelect(countriesList) {
    for (const countryData of countriesList) {
        const isoCode = countryData["iso-3166"];
        const countryName = countryData["country_name"];

        const option = document.createElement("option");
        option.value = countryName;
        option.textContent = countryName;
        option.setAttribute("data-iso", isoCode);

        countrySelect.appendChild(option);
    }
}
let sortAsc = true;

async function handleCountrySelect() {
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    const selectedIsoCode = selectedOption.getAttribute("data-iso");
    const selectedYear = Number(yearSelect.value);

    const holidays = await getHolidaysByCountryAndYear(selectedIsoCode, selectedYear);
    const sortedHolidays = sortHolidaysByDate(holidays, sortAsc);

    // Очистіть список перед виведенням нових свят
    headerHoliddays.innerHTML = "";

    for (const eventData of sortedHolidays) {
        const row = document.createElement("tr");
        row.classList.add("full-second-teble");

        // Створення нових комірок (td) для назви та опису
        const nameElement = document.createElement("td");
        nameElement.classList.add("teble-name-text");
        const descriptionElement = document.createElement("td");
        descriptionElement.classList.add("teble-second-text");

        // Заповнення вмісту DOM-елементів
        nameElement.textContent = eventData.name;
        descriptionElement.textContent = eventData.description;

        // Додавання елементів на сторінку
        row.appendChild(nameElement);
        row.appendChild(descriptionElement);

        headerHoliddays.appendChild(row);
    }

    console.log("Selected ISO Code:", selectedIsoCode);
}

function sortHolidaysByDate(holidays, asc) {
    return holidays.sort((a, b) => {
        const dateA = new Date(a.date.iso);
        const dateB = new Date(b.date.iso);

        return asc ? dateA - dateB : dateB - dateA;
    });
}

sortDdata.addEventListener("click", () => {
    sortAsc = !sortAsc;
    handleCountrySelect();
    sortDdata.classList.toggle("rotate");
});
async function getCountries() {
    try {
        const data = await fetchCountriesData();
        console.log(data);
        const countriesList = data.response.countries;

        fillCountriesSelect(countriesList);
        addCountrySelectListener();
        addYearSelectListener;
    } catch (error) {
        showAlert(error.message, "danger");
    }
}

getCountries();

for (let year = 2001; year <= 2049; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

function activateYearsSelect() {
    if (countrySelect.value) {
        yearSelect.disabled = false;
    } else {
        yearSelect.disabled = true;
    }
}

function addCountrySelectListener() {
    countrySelect.addEventListener("change", handleCountrySelect);
    countrySelect.addEventListener("change", activateYearsSelect);
}

function addYearSelectListener() {
    yearSelect.addEventListener("change", handleCountrySelect);
}
