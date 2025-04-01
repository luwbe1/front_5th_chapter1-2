import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps, originOldProps) {
  for (const [attr, value] of Object.entries(originNewProps)) {
    if (originOldProps[attr] === value) {
      continue;
    }

    if (attr.startsWith("on")) {
      const eventType = attr.slice(2).toLowerCase();
      removeEvent(target, eventType, originOldProps[attr]);
      addEvent(target, eventType, value);
    } else {
      target.setAttribute(
        attr.toLowerCase() === "classname" ? "class" : attr,
        value,
      );
    }
  }

  for (const attr of Object.keys(originOldProps)) {
    if (!(attr in originNewProps)) {
      if (attr.startsWith("on")) {
        const eventType = attr.slice(2).toLowerCase();
        removeEvent(target, eventType, originOldProps[attr]);
      } else {
        target.removeAttribute(
          attr.toLowerCase() === "classname" ? "class" : attr,
        );
      }
    }
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  // if (!parentElement) return;

  // // childNodes[index]가 존재하는지 확인
  // if (!parentElement.childNodes[index] && oldNode) return;

  if (!newNode && oldNode) {
    return parentElement.removeChild(parentElement.childNodes[index]);
  }

  if (newNode && !oldNode) {
    return parentElement.appendChild(createElement(newNode));
  }

  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode !== oldNode) {
      parentElement.replaceChild(
        createElement(newNode),
        parentElement.childNodes[index],
      );
    }
    return;
  }

  if (newNode.type !== oldNode.type) {
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
  }

  // childNodes[index]가 존재하는지 다시 확인 (안전성 확보)
  if (!parentElement.childNodes[index]) return;

  updateAttributes(
    parentElement.childNodes[index],
    newNode.props || {},
    oldNode.props || {},
  );

  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index],
      newNode.children?.[i],
      oldNode.children?.[i],
      i,
    );
  }
}
