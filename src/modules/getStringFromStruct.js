/* eslint-disable */
export const getStringFromStruct = (struct) => {
  return struct.map(([action, params]) => {
    const line = `${action}${params.join(" ")}`;
    return line;
  }).join(" ")
}
