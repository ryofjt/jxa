import { SystemEvents } from "@jxa/types/src/core/SystemEvents";

type UIClass = Pick<SystemEvents.UIElement, "class">;
interface UIElement
  extends Pick<SystemEvents.UIElement, "name" | "role" | "description"> {
  actions: () => SystemEvents.Action[];
  uiElements: () => UIClass[];
}

function print(target: UIElement | UIElement[]) {
  function actionProperties(action: SystemEvents.Action) {
    return {
      name: action.name(),
      description: action.description(),
    };
  }
  function properties(element: UIElement) {
    return {
      name: element.name(),
      description: element.description(),
      role: element.role(),
      actions: element.actions().map((v) => actionProperties(v)),
    };
  }

  function view(target: UIElement | UIElement[]): any {
    if (target instanceof Array) {
      return target.map((v) => view(v));
    }

    const children = target.uiElements().map((v) => {
      const className = v.class();
      const elements: UIElement[] = eval(`target.${className}s()`);
      return {
        class: className,
        _: view(elements),
      };
    });
    return {
      ...properties(target),
      children,
    };
  }

  function indent(lines: string[]) {
    return lines.map((v) => "  " + v);
  }
  function stringify(obj: any): string[] {
    if (obj instanceof Array) {
      if (!obj.length) {
        return ["[]"];
      }
      return [
        "[",
        ...indent(
          obj.flatMap((v) => {
            const element = stringify(v);
            const last = element.pop();
            return [...element, `${last},`];
          })
        ),
        "]",
      ];
    }
    if (obj instanceof Object) {
      const content = Object.entries(obj).flatMap(([key, v]) => {
        const item = stringify(v);
        if (item.length === 1) {
          return [`${key}: ${item[0]},`];
        }
        const first = item.shift();
        const last = item.pop();
        return [`${key}: ${first}`, ...item, `${last},`];
      });
      return ["{", ...indent(content), "}"];
    }
    return [JSON.stringify(obj)];
  }

  stringify(view(target)).forEach((v) => {
    console.log(v);
  });
}

/*
run((printStatement) => {
  const print = eval(printStatement);
}, printStatement);
*/
export const printStatement = `(${print.toString()})`;
