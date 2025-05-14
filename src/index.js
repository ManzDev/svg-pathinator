import { generateSVG } from "./modules/generateSVG.js";
import { getStringFromStruct } from "./modules/getStringFromStruct.js";
import { optimizeCode } from "./modules/optimizeCode.js";
import { renderOptimizedCode } from "./modules/renderOptimizedCode.js";

const source = document.querySelector("textarea.source");
const preview = document.querySelector(".preview");
const optimized = document.querySelector("textarea.optimized");
const precision = document.querySelector(".precision");
const size = document.querySelector(".size");

precision.addEventListener("input", () => {
  precision.nextElementSibling.textContent = precision.value;
  const optimizedCode = optimizeCode(source.value, precision.value);
  generateSVG(optimizedCode, preview);
  renderOptimizedCode(optimizedCode, optimized);
  size.value = getStringFromStruct(optimizedCode).length;
});

source.addEventListener("input", () => {
  const optimizedCode = optimizeCode(source.value, precision.value);
  generateSVG(optimizedCode, preview);
  renderOptimizedCode(optimizedCode, optimized);
  size.value = getStringFromStruct(optimizedCode).length;
});
