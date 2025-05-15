export const optimizeCode = (code, precision = 3) => {
  const path = code.replaceAll(",", " ").match(/[a-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
  const pathActions = [];
  while (path.length > 0) {
    const currentStep = path.at(0);

    if (isAction(currentStep)) {
      const actions = [path.shift()];
      const numParams = getParams(currentStep);

      for (let i = 0; i < numParams; i++) {
        const currentAction = round(path.shift(), precision);
        actions.push(currentAction);
      }

      pathActions.push(actions);
    } else {
      const action = currentStep.toLowerCase() === currentStep ? "l" : "L";
      while (path.length > 0 && !isAction(path.at(0))) {
        const actions = [action];
        actions.push(round(path.shift(), precision), round(path.shift(), precision));
        pathActions.push(actions);
      }
    }
  };

  // console.log(pathActions);

  return pathActions;
};

const round = (text, precision) => Number(Number(text).toFixed(precision));

const SVG_ACTION_PARAMS = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  s: 1,
  t: 1,
  z: 0,
  c: 6,
  q: 4,
  a: 7
};

const isAction = (character) => {
  const isValidAction = /^[mhvlstzcqa]$/i.test(character);
  return isValidAction;
};

const getParams = (action) => SVG_ACTION_PARAMS[action[0].toLowerCase()];
