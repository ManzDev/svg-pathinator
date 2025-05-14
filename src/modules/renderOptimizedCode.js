import { getStringFromStruct } from "./getStringFromStruct.js";

export const renderOptimizedCode = (code, element) => {
  element.textContent = getStringFromStruct(code);
};
