const zones = document.querySelector('dialog');
const sections = document.querySelectorAll('section');
const mouseInfoElement = document.querySelector('mark[id="yellow"]');
const touchInfoElement = document.querySelector('mark[id="green"]');

let touchClearTimer = null;
const ongoingTouches = [];
const TARGETS = [];

const stillTouching = (inId) => {
  let isTouching = ongoingTouches.find((touch) => touch.identifier === inId);
  return isTouching ? true : false;
}

const hide = (inElement) => {
  inElement.style.display = "none";
}

const show = (inElement) => {
  inElement.style.display = "block";
}

const getTarget = (inElement) => {
  return inElement.closest('section').getAttribute('id') || inElement.getAttribute('id');
}

const timerToClearTouch = (inTouchId) => {
  if(touchClearTimer !== null && touchClearTimer !== void 0) {
    clearTimeout(touchClearTimer);
  }
  if(stillTouching(inTouchId) === false) {
    touchClearTimer = setTimeout(() => {
      document.getElementById(inTouchId)?.remove();
    }, 500);
  }
}

hide(mouseInfoElement);
hide(touchInfoElement);

const getTouchByIdentifier = (inId) => {
  const touchIdx = ongoingTouches.findIndex((touch) => touch.identifier === inId);
  if(touchIdx !== null && touchIdx !== void 0) {
    return touchIdx;
  }
  return -1;
}

const mouseDownHandler = (event) => {
  event.preventDefault();
  mouseInfoElement.textContent = `MOUSE DOWN, TARGET: ${getTarget(event.target)}`
  show(mouseInfoElement);
};

const mouseUpHandler = (event) => {
  event.preventDefault();
  mouseInfoElement.textContent = `MOUSE UP, TARGET: ${getTarget(event.target)}`
};

const mouseMoveHandler = (event) => {
  event.preventDefault();
  mouseInfoElement.textContent = `MOUSE MOVE, TARGET: ${getTarget(event.target)}`
  show(mouseInfoElement);
};

const touchStartHandler = (event) => {
  event.preventDefault();
  const touches = event.changedTouches;
  for(const touch of touches) {
    ongoingTouches.push(touch);
    const touchPointer = document.createElement('div');
    touchPointer.id = `nui-${touch.identifier}`;
    touchPointer.classList.add('touch');
    touchPointer.style.left = `${touch.pageX - 50}px`;
    touchPointer.style.top = `${touch.pageY - 50}px`;
    zones.prepend(touchPointer);
  }
  TARGETS.push(`${getTarget(event.target)} : ${event.target.getAttribute('name')}`);
  touchInfoElement.textContent = `TOUCH COUNT: ${ongoingTouches.length}, TOUCH TARGET: ${TARGETS.join("")}`;
  show(touchInfoElement);
};

const touchEndHandler = (event) => {
  const touches = event.changedTouches;
  for(const touch of touches) {
    const touchToContinue = getTouchByIdentifier(touch.identifier);
    if(touchToContinue >= 0) {
      ongoingTouches.splice(touchToContinue, 1);

    }
    touchInfoElement.textContent = `${ongoingTouches.length}`;
    timerToClearTouch(`nui-${touch.identifier}`);
  }

  TARGETS.splice(TARGETS.findIndex((target) => target === event.target.getAttribute('name')), 1);
  touchInfoElement.textContent = `TOUCH COUNT: ${ongoingTouches.length}, TOUCH TARGET: ${TARGETS.join("")}`;
};

const touchCancelHandler = () => {};

const touchMoveHandler = (event) => {
  event.preventDefault();
  const touches = event.changedTouches;
  for(const touch of touches) {
    const touchToContinue = getTouchByIdentifier(touch.identifier);
    if(touchToContinue >= 0) {
      const touchPointer = document.getElementById(`nui-${touch.identifier}`);
      ongoingTouches.splice(touchToContinue, 1, touch);
      if(touchPointer !== null && touchPointer !== void 0) {
        touchPointer.style.left = `${touch.pageX}`;
        touchPointer.style.top = `${touch.pageY}`;
      }
    }
  }
  touchInfoElement.textContent = `TOUCH COUNT: ${ongoingTouches.length}, TOUCH TARGET: ${TARGETS.join("")}`;
};

for(const section of sections) {
  section.addEventListener('mousedown', mouseDownHandler, true);
  section.addEventListener('mouseup', mouseUpHandler, true);
  section.addEventListener('mousemove', mouseMoveHandler, true);
  section.addEventListener('touchstart', touchStartHandler, true);
  section.addEventListener('touchend', touchEndHandler, true);
  section.addEventListener('touchcancel', touchCancelHandler, true);
  section.addEventListener('touchmove', touchMoveHandler, true);
}
