import { PathParser } from "./PathParser.js";

export const optimizeCode = (code, precision = 3) => {
  const parsedCode = PathParser.parse(code);

  const optimizedCode = parsedCode.map(([action, ...params]) => {
    const optimizedParams = params.map(param => round(param, precision));
    return [action, ...optimizedParams];
  });

  return optimizedCode;
};

const round = (text, precision) => Number(Number(text).toFixed(precision));
