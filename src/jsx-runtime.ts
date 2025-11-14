export interface VNode {
  type: string | ComponentFunction;
  props: Record<string, any>;
  children: Array<VNode | string | number>;
}

export interface ComponentProps {
  children?: any;
  [key: string]: any;
}

export type ComponentFunction = (props: ComponentProps) => VNode;

function flatten(children: any[], out: any[] = []) {
  for (const c of children) {
    if (c == null || typeof c === "boolean") continue;
    if (Array.isArray(c)) flatten(c, out);
    else out.push(c);
  }
  return out;
}

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, any> | null,
  ...children: any[]
): VNode {
  const safeProps = props ? { ...props } : {};
  const flatChildren = flatten(children);
  return { type, props: safeProps, children: flatChildren };
}

export function createFragment(
  props: Record<string, any> | null,
  ...children: any[]
): VNode {
  return createElement("fragment", props, ...children);
}
