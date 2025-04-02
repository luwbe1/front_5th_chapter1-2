const eventMap = new WeakMap(); // 요소별 이벤트 저장소
const eventTypes = new Set(); // 등록된 이벤트 타입 저장소

export function setupEventListeners(root) {
  eventTypes.forEach((eventType) => {
    root.addEventListener(eventType, handleEvent);
  });
}

// 이벤트 위임 핸들러
function handleEvent(event) {
  let target = event.target;
  while (target) {
    const elementEvents = eventMap.get(target);
    if (elementEvents && elementEvents.has(event.type)) {
      elementEvents.get(event.type).call(target, event);
      break; // 이벤트가 처리되었으면 중단
    }
    target = target.parentElement;
  }
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    eventMap.set(element, new Map());
  }
  const elementEvents = eventMap.get(element);
  elementEvents.set(eventType, handler);
  eventTypes.add(eventType); // 이벤트 타입 저장
}

export function removeEvent(element, eventType) {
  if (!eventMap.has(element)) return;

  const elementEvents = eventMap.get(element);
  elementEvents.delete(eventType);

  if (elementEvents.size === 0) {
    eventMap.delete(element);
  }
}
