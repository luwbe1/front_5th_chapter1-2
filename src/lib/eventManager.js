const eventMap = new Map();

export function setupEventListeners(root) {
  const delegatedEvents = ["click", "mouseover", "focus", "keydown"];

  delegatedEvents.forEach((eventType) => {
    root.addEventListener(eventType, (event) => {
      let target = event.target;
      while (target && target !== root) {
        // 타겟 요소에서 이벤트 핸들러 찾기
        if (eventMap.has(target) && eventMap.get(target)[eventType]) {
          eventMap.get(target)[eventType](event); // 핸들러 실행
        }
        target = target.parentElement; // 부모 요소로 올라가기
      }
    });
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    eventMap.set(element, {});
  }
  const elementHandlers = eventMap.get(element);

  // 이미 해당 이벤트 핸들러가 등록되어 있으면 등록하지 않음
  if (elementHandlers[eventType]) {
    return; // 이미 이벤트가 등록되었으면 리턴
  }

  // 핸들러를 해당 이벤트 타입에 추가
  elementHandlers[eventType] = handler;
}

export function removeEvent(element, eventType) {
  if (eventMap.has(element)) {
    const elementHandlers = eventMap.get(element);
    delete elementHandlers[eventType]; // 해당 이벤트 타입의 핸들러 제거
  }
}
