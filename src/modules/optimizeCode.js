export const optimizeCode = (code, precision = 3) => {
  const path = code.match(/[a-z][0-9\s.]*/gi);
  const actions = path.map(fragment => {
    const action = fragment.at(0);
    const params = fragment.slice(1).split(" ");
    return [action, params];
  });

  const optimizedActions = actions.map(([action, params]) => {
    const optimizedParams = params.map(number => {
      const optimizedNumber = String(Number(Number(number).toFixed(precision)));
      return optimizedNumber;
    });
    return [action, optimizedParams];
  });

  return optimizedActions;
};
