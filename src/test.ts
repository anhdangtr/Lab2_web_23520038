import { createElement, createFragment } from "./jsx-runtime";

const vnode = createElement('div', { className: 'test' }, 'Hello World');
console.log("VNode:", vnode);

const frag = createFragment(null,
  createElement("span", null, "A"),
  createElement("span", null, "B")
);
console.log("Fragment:", frag);
