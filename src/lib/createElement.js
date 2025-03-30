// import { addEvent } from "./eventManager";

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

  const el = document.createElement(vNode.type);
  //   updateAttributes(el, vNode.props);

  return el;
}

// function updateAttributes($el, props) {
//   Object.entries(props || {})
//     .filter(([attr, value]) => value)
//     .forEach(([attr, value]) => $el.setAttribute(attr, value));
//   const children = props.children.map(createElement);
//   // $el에 변환된 children dom을 추가한다.
//   children.forEach((child) => $el.appendChild(child));
//   return $el;
// }
