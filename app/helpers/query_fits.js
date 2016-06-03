export const queryFits = (text, query, caseInsensitive = true) => {
  const queryToSplit = caseInsensitive ? query.toLowerCase() : query;
  const pattern = caseInsensitive ? text.toLowerCase() : text;
  const letters = queryToSplit.split('');
  let lastFoundLetterPosition = -1;
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const letterPosition = pattern.substr(lastFoundLetterPosition + 1).indexOf(letter);
    if (letterPosition < 0) {
      return false;
    }
    lastFoundLetterPosition += letterPosition;
  }
  return true;
};

export default queryFits;
