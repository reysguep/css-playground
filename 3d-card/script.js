function setMouseMoveEvent() {
  const wrap1 = document.getElementById('wrap1');
  wrap1.addEventListener('mousemove', onMouseMoveWrap1);
  wrap1.addEventListener('mouseleave', onMouseLeaveWrap1);

  const wrap2 = document.getElementById('wrap2');
  wrap2.addEventListener('mousemove', onMouseMoveWrap2);
  wrap2.addEventListener('mouseleave', onMouseLeaveWrap2);
}

function onMouseMoveWrap1(event) {
  const wrap = document.getElementById('wrap1');
  const card = document.getElementById('card1');

  const width = wrap.offsetWidth;
  const height = wrap.offsetHeight;

  const minX = wrap.offsetLeft;
  const maxX = minX + width;

  const minY = wrap.offsetTop;
  const maxY = minY + height

  const mouseX = event.pageX;
  const mouseY = event.pageY;

  const containsMouse = contains(minX, maxX, minY, maxY, mouseX, mouseY);

  if (!containsMouse) {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    return;
  }

  let x = mouseX - minX;
  let y = mouseY - minY;

  x = Math.max(Math.min(event.pageX - wrap.offsetLeft, width), 0);
  y = Math.max(Math.min(event.pageY - wrap.offsetTop, height), 0);

  window.x = x;
  window.y = y;

  const relativeX = (x - width / 2) / (width / 2);
  const relativeY = (y - height / 2) / (height / 2) * -1;

  const degX = 5 * relativeX;
  const degY = 5 * relativeY;

  card.style.transform = `rotateX(${degY}deg) rotateY(${degX}deg)`;
}

function contains(
  minX,
  maxX,
  minY,
  maxY,
  pointX,
  pointY,
) {
  const xContains = pointX > minX && pointX < maxX;
  const yContains = pointY > minY && pointY < maxY;

  return xContains && yContains;
}

function onMouseLeaveWrap1(event) {
  const card = document.getElementById('card1');
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

function onMouseMoveWrap2(event) {
  const wrap = document.getElementById('wrap2');
  const card = document.getElementById('card2');

  const width = wrap.offsetWidth;
  const height = wrap.offsetHeight;

  const minX = wrap.offsetLeft;
  const maxX = minX + width;

  const minY = wrap.offsetTop;
  const maxY = minY + height

  const mouseX = event.pageX;
  const mouseY = event.pageY;

  const containsMouse = contains(minX, maxX, minY, maxY, mouseX, mouseY);

  if (!containsMouse) {
    removeQuadrantClasses(card);
    return;
  }

  let x = minX - mouseX;
  let y = minY - mouseY;

  x = Math.max(Math.min(event.pageX - wrap.offsetLeft, width), 0);
  y = Math.max(Math.min(event.pageY - wrap.offsetTop, height), 0);

  const quadrant = getQuadrant(x, y, width, height);
  const sameQuadrant = isSameQuadrant(card, quadrant);

  if (sameQuadrant) {
    return;
  }

  removeQuadrantClasses(card);
  card.classList.add('card-quadrant-' + quadrant);
}

function isSameQuadrant(
  card,
  quadrant,
) {
  const same = card.classList.contains('card-quadrant-' + quadrant);
  return same;
}

function removeQuadrantClasses(
  card,
) {
  const classList = card.classList;

  classList.remove(
    'card-quadrant-1',
    'card-quadrant-2',
    'card-quadrant-3',
    'card-quadrant-4',
  );
}

function getQuadrant(
  x,
  y,
  width,
  height,
) {
  let quadrant = 0;

  if (x >= width / 2) {
    quadrant = y >= height / 2 ?
      4 :
      1;
  } else {
    quadrant = y >= height / 2 ?
      3 :
      2;
  }

  return quadrant;
}

function onMouseLeaveWrap2() {
  const card = document.getElementById('card2');
  removeQuadrantClasses(card);
}

window.onload = setMouseMoveEvent;