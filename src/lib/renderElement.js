import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.

  // vNode가 null이면 container의 innerHTML을 ""로 초기화한다.
  if (!vNode) {
    container.innerHTML = "";
    return;
  }
  // vNode가 null이 아니면 vNode를 normalizeVNode로 정규화한다.
  vNode = normalizeVNode(vNode);

  // vNode가 DOM이 아니면 vNode를 createElement로 DOM으로 변환한다.
  const oldNode = container.firstChild;
  const newElement = createElement(vNode);

  // vNode가 DOM이면 vNode를 createElement로 DOM으로 변환한다.
  if (oldNode) {
    updateElement(oldNode, oldNode.vNode, vNode);
    container.replaceChild(newElement, oldNode);
  } else {
    container.appendChild(newElement);
  }

  // 이벤트 핸들러를 위임 방식으로 등록
  setupEventListeners(container); // 부모 요소인 container에 이벤트를 위임
}
