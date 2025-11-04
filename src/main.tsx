/** @jsx h */
/** @jsxFrag Fragment */
export {}; // 👈 để declare global hoạt động

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// ✅ FIXED VERSION
function h(tag: any, props: any, ...children: any[]): any {
  if (typeof tag === "function") {
    return tag(...children);
  }

  const el = document.createElement(tag);

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      el.setAttribute(key, String(value));
    }
  }

  for (const child of children) {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}

function Fragment(...children: any[]): DocumentFragment {
  const fragment = document.createDocumentFragment();

  for (const child of children) {
    if (typeof child === "string") {
      fragment.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    }
  }

  return fragment;
}

const App = (
  <div id="app">
    <h1>Hello JSX without React!</h1>
    <>
      <p>This is custom JSX.</p>
      <p>No React needed 🚀</p>
    </>
  </div>
);

document.body.appendChild(App);
