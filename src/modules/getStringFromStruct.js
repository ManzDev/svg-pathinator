/* eslint-disable */
export const getStringFromStruct = (struct) => {
  return struct.map(([action, ...params]) => {
    return params ? `${action}${params.join(" ")}` : action;
  }).join(" ")
}
