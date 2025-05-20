import { getStringFromStruct } from "./getStringFromStruct.js";

const w = document.querySelector(".viewbox.w");
const h = document.querySelector(".viewbox.h");

export const generateSVG = (struct, element) => {
  const code = getStringFromStruct(struct);
  const html = /* html */`
    <svg draggable="false" width="550" height="500" viewBox="0 0 ${w.value} ${h.value}">
      <path d="${code}" stroke="#fff" fill="#000" />
    </svg>
  `;

  element.style = "--x:0; --y:0";
  element.setHTMLUnsafe(html);
};
