import { getStringFromStruct } from "./getStringFromStruct.js";

export const generateSVG = (struct, element) => {
  const code = getStringFromStruct(struct);
  const html = /* html */`
    <svg width="550" height="500" viewBox="0 0 100 100">
      <path d="${code}" stroke="#fff" fill="#000" />
    </svg>
  `;

  element.setHTMLUnsafe(html);
};
