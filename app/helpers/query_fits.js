export const queryFits = (text, query) => {
  const letters = query.split('');
  let lastFoundLetterPosition = -1;
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const letterPosition = text.substr(lastFoundLetterPosition + 1).indexOf(letter);
    if (letterPosition < 0) {
      return false;
    }
    lastFoundLetterPosition += letterPosition;
  }
  return true;
};

export default queryFits;
