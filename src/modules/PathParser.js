const kCommandTypeRegex = /^[\t\n\f\r ]*([MLHVZCSQTA])[\t\n\f\r ]*/i;
const kFlagRegex = /^[01]/;
const kNumberRegex = /^[+-]?((\d*\.\d+)|(\d+\.)|(\d+))(e[+-]?\d+)?/i;
const kCoordinateRegex = kNumberRegex;
const kCommaWsp = /^(([\t\n\f\r ]+,?[\t\n\f\r ]*)|(,[\t\n\f\r ]*))/;

const kGrammar = {
  M: [kCoordinateRegex, kCoordinateRegex],
  L: [kCoordinateRegex, kCoordinateRegex],
  H: [kCoordinateRegex],
  V: [kCoordinateRegex],
  Z: [],
  C: [
    kCoordinateRegex, kCoordinateRegex, kCoordinateRegex,
    kCoordinateRegex, kCoordinateRegex, kCoordinateRegex
  ],
  S: [
    kCoordinateRegex, kCoordinateRegex,
    kCoordinateRegex, kCoordinateRegex
  ],
  Q: [
    kCoordinateRegex, kCoordinateRegex,
    kCoordinateRegex, kCoordinateRegex
  ],
  T: [kCoordinateRegex, kCoordinateRegex],
  A: [
    kNumberRegex, kNumberRegex, kCoordinateRegex,
    kFlagRegex, kFlagRegex, kCoordinateRegex, kCoordinateRegex
  ],
};

export class PathParser {
  static components(type, path, cursor) {
    const expectedRegexList = kGrammar[type.toUpperCase()];
    const components = [];

    while (cursor <= path.length) {
      const component = [type];
      for (const regex of expectedRegexList) {
        const match = path.slice(cursor).match(regex);

        if (match !== null) {
          component.push(match[0]);
          cursor += match[0].length;
          const ws = path.slice(cursor).match(kCommaWsp);
          if (ws !== null) {
            cursor += ws[0].length;
          }
        } else if (component.length === 1 && components.length >= 1) {
          return [cursor, components];
        } else {
          throw new Error(`malformed path (first error at ${cursor})`);
        }
      }
      components.push(component);
      if (expectedRegexList.length === 0) {
        return [cursor, components];
      }
      if (type === "m") {
        type = "l";
      }
      if (type === "M") {
        type = "L";
      }
    }

    throw new Error(`malformed path (first error at ${cursor})`);
  }

  static parse(path) {
    let cursor = 0;
    let tokens = [];

    while (cursor < path.length) {
      const match = path.slice(cursor).match(kCommandTypeRegex);
      if (match !== null) {
        const command = match[1];
        if (cursor === 0 && command.toLowerCase() !== "m") {
          throw new Error(`malformed path (first error at ${cursor})`);
        }
        cursor += match[0].length;
        const componentList = PathParser.components(command, path, cursor);
        cursor = componentList[0];
        tokens = [...tokens, ...componentList[1]];
      } else {
        throw new Error(`malformed path (first error at ${cursor})`);
      }
    }

    return tokens;
  }
}
