export const createTitle = (str: string) => {
  const match = str.match(/[A-Z]/);
  const upperCaseLetter = str[0].toUpperCase();

  if (match) {
    const index = match.index;
    return upperCaseLetter + str.substring(1, index);
  } else {
    return upperCaseLetter + str.slice(1);
  }
};
