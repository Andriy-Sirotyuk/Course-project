import { weekButton, monthButton } from "./variables.js";
import { addWeek, addMonth } from "./date.js";

weekButton.addEventListener("click", addWeek);

monthButton.addEventListener("click", addMonth);
