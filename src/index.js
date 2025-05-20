import { generateSVG } from "./modules/generateSVG.js";
import { getStringFromStruct } from "./modules/getStringFromStruct.js";
import { optimizeCode } from "./modules/optimizeCode.js";
import { renderOptimizedCode } from "./modules/renderOptimizedCode.js";

const source = document.querySelector(".source");
const preview = document.querySelector(".preview");
const optimized = document.querySelector(".optimized");
const precision = document.querySelector(".precision");
const size = document.querySelector(".size");
const viewBox = document.querySelectorAll(".viewbox");

precision.addEventListener("input", () => {
  precision.nextElementSibling.textContent = precision.value;
  const optimizedCode = optimizeCode(source.textContent, precision.value);
  generateSVG(optimizedCode, preview);
  renderOptimizedCode(optimizedCode, optimized);
  size.value = getStringFromStruct(optimizedCode).length;
});

source.addEventListener("input", () => {
  const optimizedCode = optimizeCode(source.textContent, precision.value);
  generateSVG(optimizedCode, preview);
  renderOptimizedCode(optimizedCode, optimized);
  size.value = getStringFromStruct(optimizedCode).length;
});

viewBox.forEach(input => {
  input.addEventListener("wheel", ({ deltaY }) => {
    const value = deltaY > 0 ? -1 : 1;
    input.value = Math.min(Math.max(1, Number(input.value) + value), 2048);
  });
});

let isDragMove = false;
let initialOffsetX = 0; let initialOffsetY = 0;

preview.addEventListener("mousedown", (ev) => {
  isDragMove = true;
  initialOffsetX = ev.offsetX;
  initialOffsetY = ev.offsetY;
});
preview.addEventListener("mouseup", () => (isDragMove = false));
preview.addEventListener("mouseleave", () => (isDragMove = false));

preview.addEventListener("mousemove", (ev) => {
  if (!isDragMove) return;

  const prevX = preview.style.getPropertyValue("--x");
  const prevY = preview.style.getPropertyValue("--y");

  const x = ev.offsetX + Number(prevX) - initialOffsetX;
  const y = ev.offsetY + Number(prevY) - initialOffsetY;

  preview.style.setProperty("--x", x);
  preview.style.setProperty("--y", y);
});

preview.addEventListener("wheel", (ev) => {
  ev.preventDefault();
  const inc = ev.deltaY > 0 ? 15 : -15;

  const svg = preview.children[0];
  const [x, y, w, h] = svg.getAttribute("viewBox").replaceAll(",", " ").split(" ");

  svg.setAttribute("viewBox", `${x} ${y} ${Number(w) + inc} ${Number(h) + inc}`);
});

preview.addEventListener("dragstart", (ev) => ev.preventDefault());
preview.addEventListener("drop", (ev) => ev.preventDefault());
