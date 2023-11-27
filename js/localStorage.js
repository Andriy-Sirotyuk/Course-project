export function storeResult(startDate, endDate, result) {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];

    const MAX_STORED_RESULTS = 10;

    const entry = { startDate, endDate, result };

    storedResults.push(entry);

    if (storedResults.length > MAX_STORED_RESULTS) {
        storedResults.shift();
    }

    localStorage.setItem("results", JSON.stringify(storedResults));
}
