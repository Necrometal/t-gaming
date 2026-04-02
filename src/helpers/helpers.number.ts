export const generateNumber = (
  length: number,
  asString: boolean = false,
): number | string => {
  const code = Array.from({ length: length }, () =>
    Math.floor(Math.random() * 10),
  ).join('');
  return asString ? code : parseInt(code);
};
