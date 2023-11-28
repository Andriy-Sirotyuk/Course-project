import { MAX_STORED_RESULTS } from "./index.js";

export function storeResult(startDate, endDate, result) {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];

    const entry = { startDate, endDate, result };

    storedResults.push(entry);

    if (storedResults.length > MAX_STORED_RESULTS) {
        storedResults.shift();
    }

    localStorage.setItem("results", JSON.stringify(storedResults));
}
