import { weekButton, monthButton, calculator, test, firstTab, secondTab, languageList, languageBox, blockLanguage, globe } from "./variables.js";
import { addWeek, addMonth } from "./date.js";

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

languageBox.addEventListener("click", toggleLanguageList);

weekButton.addEventListener("click", addWeek);

monthButton.addEventListener("click", addMonth);
