/**
 * This fle contains legacy code.
 * Code that was not documented and it has not been discovered what
 * it does, good luck.
 */

/**
 * This re-use canvas object for better performance
 * @param {*} text the text to get measure width
 * @legacy
 */
export const measureWidth = (text) => {
  const canvas =
    measureWidth.canvas ||
    (measureWidth.canvas = document.createElement('canvas'));
  let context = canvas.getContext('2d');
  context.font = '15px Verdana';
  const metrics = context.measureText(text);
  return metrics.width;
};

/**
 * Find the midpoint of two elements
 * @return midpoint
 * @ref https://en.wikipedia.org/wiki/Homothetic_center probably the formula used ????
 * @legacy
 */
export const centerPointOf = (from, to, textLen) => {
  let [x1, y1] = [from.coords.x, from.coords.y];
  let [x2, y2] = [to.coords.x, to.coords.y];

  let margenX = (textLen * 8 / 2);
  margenX = margenX < 40 ? 40 : margenX;

  let m = (y2 - y1) / (x2 - x1);
  m = m > 230 ? 230 : m;
  m = m < -230 ? -230 : m;

  if (m > 1 || m < -1) {
    x1 = y2 > y1 ? ((y1 + 50) - y1 + (m * x1)) / m : ((m * x1 - (y1 + 50) + y1)) / m;
    y1 = y2 > y1 ? y1 + 50 : y1 - 50;
  } else {
    y1 = x2 > x1 ? (m * (x1 + margenX - x1)) + y1 : ((-1 * m) * (x1 + margenX - x1)) + y1;
    x1 = x2 > x1 ? x1 + margenX : x1 - margenX;
  }

  return {
    x: x1,
    y: y1,
  };
};

/**
 * @legacy
 */
export const txtPosOfAssociation = (x1, y1, x2, y2, textLen) => {
  let [a, m = 0, m2 = 0] = [x1, 0, 0];
  let [vertice, vertice2] = [{x: 0, y: 0}, {x: 0, y: 0}];
  let [x = 0, y = 0] = [0, 0];

  m = (y2 - y1) / (x2 - x1);
  m = m > 230 ? 230 : m;
  m = m < -230 ? -230 : m;

  textLen = ((1<m&&m<230)||(-1>m&&m>-230))?1: (0>m&&m>-1)?textLen*(1+m):textLen*(1-m);

  m2 = -1 / m;
  m2 = ((m === 230)||(m === -230)) ? 0 : (m === 0) ? 230 : m2;

  if (x1 > x2) {
    x1 = x2;
    x2 = a;
  }

  a = y1;

  if (y1 > y2) {
    y1 = y2;
    y2 = a;
  }

  x1 = x1 + ((x2 - x1) / 2);
  y1 = y1 + ((y2 - y1) / 2);

  vertice = {
    x: x1 - (textLen / 2),
    y: y1 + ((m > 0) ? 5 : -5)
  };

  vertice2.x = ((m * vertice.x) - vertice.y - (m2 * x1) + y1) / (m - m2);
  vertice2.y = (m * vertice2.x) - (m * vertice.x) + vertice.y;

  x = vertice.x + (x1 - vertice2.x);
  y = vertice.y + (y1 - vertice2.y);

  return {
    x: x + 5,
    y:((m > 0) ? y - 5 : (y + 15)),
    a: vertice2.x,
    b: vertice2.y,
  };
};

/**
 * @legacy
 */
export const getLineAttributes = (from, to, line) => {
  const { x: x1 = 0, y: y1 = 0 } = centerPointOf(
    from,
    to,
    1
  );
  const { x: x2 = 0, y: y2 = 0 } = centerPointOf(
    to,
    from,
    1
  );
  const textLen = txtPosOfAssociation(x1, y1, x2, y2, measureWidth(line.text));
  return { x1, y1, x2, y2, textLen };
};
