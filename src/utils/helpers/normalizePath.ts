const normalizePath = (str: string) => {
  const splitLowerUpper = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  const splitUppers = splitLowerUpper.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  const splitNumbers = splitUppers.replace(/([a-z])?([0-9]+)([a-z])?/g, '$1 $2 $3');

  return splitNumbers.replace(/^./, firstChar => firstChar.toUpperCase());
};

export default normalizePath;
