export default function padLeft(txt = '', places = 0, filler = '0') {
  const txtLength = Math.max(places, txt.length);
  const generouslyFilled = createPadArray(txtLength, filler).concat(txt.split(''));
  return generouslyFilled
    .slice(generouslyFilled.length - txtLength, generouslyFilled.length)
    .join('')
    ;
}

function createPadArray(length, filler) {
  const padArray = [];
  for (let i = 0; i < length; i++) {
    padArray.push(filler);
  }
  return padArray;
}
