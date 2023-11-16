import { showAlert } from "./alert.js";

const API_KEY = "gADWRTJ80gz1poqtlCeYzfCf9Sbo8WDt";

export async function fetchCountriesData() {
    try {
        const response = await fetch(`https://calendarific.com/api/v2/countries?api_key=${API_KEY}`);
        if (!response.ok) {
            showAlert(error.message, "danger");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching countries data: ", error);
        throw error;
    }
}

export async function getHolidaysByCountryAndYear(country, year) {
    const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        showAlert(error.message, "danger");
    }

    const data = await response.json();
    console.log(data.response.holidays);
    return data.response.holidays;
}
