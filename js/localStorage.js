export function storeResult(startDate, endDate, result) {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];

    const entry = { startDate, endDate, result };

    storedResults.push(entry);

    if (storedResults.length > 10) {
        storedResults.shift();
    }

    localStorage.setItem("results", JSON.stringify(storedResults));
}
