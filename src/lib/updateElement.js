import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps, originOldProps) {
  for (const [attr, value] of Object.entries(originNewProps)) {
    if (originOldProps[attr] === originNewProps[attr]) {
      continue;
    }

    if (attr.startsWith("on")) {
      const eventType = attr.slice(2).toLowerCase();
      removeEvent(target, eventType, originOldProps[attr]); // 기존 이벤트 제거
      addEvent(target, eventType, value); // 새로운 이벤트 추가
    } else {
      target.setAttribute(attr, value);
    }
  }

  for (const attr of Object.keys(originOldProps)) {
    if (originNewProps[attr] !== undefined) continue;

    if (attr.startsWith("on")) {
      const eventType = attr.slice(2).toLowerCase();
      removeEvent(target, eventType, originOldProps[attr]);
    } else {
      target.removeAttribute(attr);
    }
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!newNode && oldNode) {
    return parentElement.removeChild(parentElement.childNodes[index]);
  }

  if (newNode && !oldNode) {
    return parentElement.appendChild(createElement(newNode));
  }

  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) {
      return;
    }

    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
  }

  if (newNode.type !== oldNode.type) {
    return parentElement.replaceChild(
      createElement(newNode),
      parent.childNodes[index],
    );
  }

  updateAttributes(
    parentElement.childNodes[index],
    newNode.props || {},
    oldNode.props || {},
  );

  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
    );
  }
}
