import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

export function renderElement(vNode, container) {
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.

  if (!vNode) {
    container.innerHTML = "";
    return;
  }

  vNode = normalizeVNode(vNode);
  const oldVNode = container.vNode;

  if (!oldVNode) {
    container.appendChild(createElement(vNode));
  } else {
    updateElement(container, vNode, oldVNode);
  }

  container.vNode = vNode;
  setupEventListeners(container);
}
