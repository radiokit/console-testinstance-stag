export const queryFits = (text, query, caseInsensitive = true) => {
  const queryToSplit = caseInsensitive ? query.toLowerCase() : query;
  const pattern = caseInsensitive ? text.toLowerCase() : text;
  const letters = queryToSplit.split('');
  let seekableOffset = 0;
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const letterPosition = pattern.substr(seekableOffset).indexOf(letter);
    if (letterPosition < 0) {
      return false;
    }
    seekableOffset += letterPosition + 1;
  }
  return true;
};

export default queryFits;
