const eventMap = new Map();

export function setupEventListeners(root) {
  root.addEventListener("click", (event) => {
    let target = event.target;
    while (target && target !== root) {
      // 타겟 요소에서 이벤트 핸들러 찾기
      const eventType = "click"; // 이벤트 타입
      if (eventMap.has(target) && eventMap.get(target)[eventType]) {
        eventMap.get(target)[eventType](event); // 핸들러 실행
      }
      target = target.parentElement; // 부모 요소로 올라가기
    }
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    eventMap.set(element, {});
  }
  const elementHandlers = eventMap.get(element);

  // 핸들러를 해당 이벤트 타입에 추가
  elementHandlers[eventType] = handler;
}

export function removeEvent(element, eventType) {
  if (eventMap.has(element)) {
    const elementHandlers = eventMap.get(element);
    delete elementHandlers[eventType]; // 해당 이벤트 타입의 핸들러 제거
  }
}
