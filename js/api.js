const apiKey = "gADWRTJ80gz1poqtlCeYzfCf9Sbo8WDt";

export async function fetchCountriesData() {
    try {
        const response = await fetch(`https://calendarific.com/api/v2/countries?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error("Something went wrong with the request");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching countries data: ", error);
        throw error;
    }
}

export async function getHolidaysByCountryAndYear(country, year) {
    const apiKey = "gADWRTJ80gz1poqtlCeYzfCf9Sbo8WDt";
    const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        return data.response.holidays;
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}
