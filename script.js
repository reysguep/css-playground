function setMouseMoveEvent() {
  const wrap = document.getElementById('wrap');
  wrap.addEventListener('mousemove', onMouseMove);
  wrap.addEventListener('mouseleave', onMouseLeave);
}

function onMouseMove(event) {
  // console.log(event);return
  const wrap = document.getElementById('wrap');
  const card = document.getElementById('card');

  const width = wrap.offsetWidth;
  const height = wrap.offsetHeight;

  const minX = wrap.offsetLeft;
  const maxX = minX + width;

  const minY = wrap.offsetTop;
  const maxY = minY + height

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const containsMouse = contains(minX, maxX, minY, maxY, mouseX, mouseY);

  if (!containsMouse) {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    return;
  }

  let x = minX - mouseX;
  let y = minY - mouseY;

  x = Math.max(Math.min(event.clientX - wrap.offsetLeft, width), 0);
  y = Math.max(Math.min(event.clientY - wrap.offsetTop, height), 0);

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

function onMouseLeave(event) {
  const card = document.getElementById('card');
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

window.onload = setMouseMoveEvent;