import { addEvent } from "./eventManager";
import { normalizeVNode } from "./normalizeVNode";

export function createElement(vNode) {
  if (
    typeof vNode === "boolean" ||
    typeof vNode === "undefined" ||
    vNode === null
  ) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    fragment.append(...vNode.map(createElement));

    return fragment;
  }

  // 컴포넌트가 직접 전달되면 예외 발생
  if (typeof vNode.type === "function") {
    throw new Error("createElement()에 컴포넌트를 직접 전달할 수 없습니다.");
  }

  const normalizedNode = normalizeVNode(vNode);
  const el = document.createElement(normalizedNode.type);
  updateAttributes(el, normalizedNode.props);

  const children = normalizedNode.children.map(createElement);
  children.forEach((child) => el.appendChild(child));

  return el;
}

function updateAttributes($el, props) {
  if (!props) return;

  Object.entries(props).forEach(([attr, value]) => {
    if (value == null || value === false) return;

    if (attr.toLowerCase() === "classname") {
      $el.setAttribute("class", value);
    } else if (attr.startsWith("on")) {
      if (typeof value === "function") {
        const eventType = attr.slice(2).toLowerCase();
        addEvent($el, eventType, value);
      }
    } else {
      $el.setAttribute(attr, value);
    }
  });
}
