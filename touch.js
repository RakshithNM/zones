const zones = document.querySelector('dialog');
const eventNameElement = document.querySelector('mark[id="yellow"]');
const touchInfoElement = document.querySelector('mark[id="green"]');

const ongoingTouches = [];
const TARGETS = [];

const getTouchByIdentifier = (inId) => {
  const touchIdx = ongoingTouches.findIndex((touch) => touch.identifier === inId);
  if(touchIdx !== null && touchIdx !== void 0) {
    return touchIdx;
  }
  return -1;
}

const mouseDownHandler = (event) => {
  eventNameElement.textContent = "MOUSE DOWN";
};
const mouseUpHandler = () => {
  eventNameElement.textContent = "MOUSE UP";
};
const mouseMoveHandler = () => {
  eventNameElement.textContent = "MOUSE UP";
};

const touchStartHandler = (event) => {
  event.preventDefault();
  const touches = event.changedTouches;
  for(const touch of touches) {
    ongoingTouches.push(touch);
    const touchPointer = document.createElement('div');
    touchPointer.id = `nui-${touch.identifier}`;
    touchPointer.style.width = '50px';
    touchPointer.style.height = '50px';
    touchPointer.style.background = 'red';
    touchPointer.style.position = 'absolute';
    touchPointer.style.borderRadius = '50%';
    touchPointer.style.left = `${touch.pageX - 50}px`;
    touchPointer.style.top = `${touch.pageY - 50}px`;
    zones.prepend(touchPointer);
  }
  TARGETS.push(event.target.getAttribute('name'));
  touchInfoElement.textContent = `TOUCH COUNT: ${ongoingTouches.length}, TOUCH TARGET: ${TARGETS.join("")}`;
};

const touchEndHandler = (event) => {
  const touches = event.changedTouches;
  for(const touch of touches) {
    const touchToContinue = getTouchByIdentifier(touch.identifier);
    if(touchToContinue >= 0) {
      ongoingTouches.splice(touchToContinue, 1);

    }
    touchInfoElement.textContent = `${ongoingTouches.length}`;
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

zones.addEventListener('mousedown', mouseDownHandler);
zones.addEventListener('mouseup', mouseUpHandler);
zones.addEventListener('mousemove', mouseMoveHandler);
zones.addEventListener('touchstart', touchStartHandler);
zones.addEventListener('touchend', touchEndHandler);
zones.addEventListener('touchcancel', touchCancelHandler);
zones.addEventListener('touchmove', touchMoveHandler);
