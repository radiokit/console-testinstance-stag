// Calculates HSLa color string basing on non-negative number
// Algorithm is deterministic (for given arguments result is always the same)
// h is in [0, 360], s in [25, 75], l and a can be given as parameters
// Colors are assumed to be as distinguishable as possible

function getColor(n, l = 50, a = 1) {
  const rnd = Math.pow(2, Math.ceil(Math.log2(n + 1)));
  const base = 50 * 360 / rnd;
  const result = base * (1 + 2 * (rnd - (n + 1)));
  const h = Math.round(result / 50);
  const s = (Math.round(result) % 50 + 50) % 50 + 25;
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

export default getColor;
