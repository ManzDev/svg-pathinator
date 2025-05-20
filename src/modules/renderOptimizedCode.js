import { getStringFromStruct } from "./getStringFromStruct.js";

export const renderOptimizedCode = (code, element) => {
  // element.textContent = getStringFromStruct(code);
  const parsedCode = getStringFromStruct(code);

  console.log(code);

  const html = code.map(([action, ...params]) => {
    const lowerClass = action.toLowerCase() === action ? "lower" : "";
    const htmlParams = params.map(param => /* html */`<span class="p">${param}</span>`).join("");
    return /* html */`<div class="action"><span class="letter ${action} ${lowerClass}">${action}</span>${htmlParams}</div>`;
  }).join("");

  element.setHTMLUnsafe("");
  element.insertAdjacentHTML("beforeend", html);
};
