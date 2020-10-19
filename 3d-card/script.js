function setMouseMoveEvent() {
  const wrap1 = document.getElementById('wrap1');
  wrap1.addEventListener('mousemove', onMouseMoveWrap1);
  wrap1.addEventListener('mouseleave', onMouseLeaveWrap1);

  const wrap2 = document.getElementById('wrap2');
  wrap2.addEventListener('mousemove', onMouseMoveWrap2);
  wrap2.addEventListener('mouseleave', onMouseLeaveWrap2);

  const wrap3 = document.getElementById('wrap3');
  wrap3.addEventListener('mousemove', onMouseMoveWrap3);
  wrap3.addEventListener('mouseleave', onMouseLeaveWrap3);
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

function onMouseLeaveWrap3(event) {
  const card = document.getElementById('card3');
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

function onMouseMoveWrap3(event) {
  const MAX_ANGLE = 5;
  const SLOTS_X = 3;
  const SLOTS_Y = 3;

  const wrap = document.getElementById('wrap3');
  const card = document.getElementById('card3');

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

  let x = Math.max(Math.min(mouseX - minX, width), 0);
  let y = Math.max(Math.min(mouseY - minY, height), 0);

  window.x = x;
  window.y = y;

  const relativeX = x / width;
  const relativeY = y / height;

  const distanceX = distanceFromCenter(SLOTS_X, relativeX);
  const distanceY = distanceFromCenter(SLOTS_Y, relativeY);

  const angleX = getAngle(SLOTS_X, distanceX, MAX_ANGLE);
  const angleY = getAngle(SLOTS_Y, distanceY, MAX_ANGLE) * -1;

  const changed = changedAngle(card, angleX, angleY);

  if (changed) {
    card.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`;
  }
}

function distanceFromCenter(
  slots,
  relativeAxis,
) {
  const mouseSlot = Math.floor(slots * relativeAxis);
  const even = slots % 2 === 0;
  const center = (slots - 1) / 2;
  let distance = mouseSlot - center;

  if (even) {
    distance = distance > 0 ?
      Math.round(distance) :
      Math.floor(distance);
  }

  const maxDistance = Math.floor(slots / 2);
  const minDistance = maxDistance * -1;

  distance = Math.min(maxDistance, distance);
  distance = Math.max(minDistance, distance);

  return distance;
}

function getAngle(
  slots,
  distance,
  maxAngle,
) {
  const middle = Math.floor(slots / 2);
  const angle = (distance / middle) * maxAngle;

  return angle;
}

function changedAngle(
  card,
  newAngleX,
  newAngleY,
) {
  const oldAngleX = parseFloat(card.style.transform.charAt(8));
  const oldAngleY = parseFloat(card.style.transform.charAt(22));

  const changed =
    newAngleX !== oldAngleX ||
    newAngleY !== oldAngleY;

  return changed;
}

window.onload = setMouseMoveEvent;