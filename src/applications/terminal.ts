import { run } from "@jxa/run";

export async function openTerminal(scripts: string[][]) {
  return run((scripts: string[][]) => {
    const system = Application("System Events");
    const terminal = Application("Terminal");

    terminal.doScript();
    terminal.activate();
    const window = terminal.windows[0];

    const first = scripts.shift();
    first?.forEach((v) => {
      terminal.doScript(v, { in: window });
    });

    scripts.forEach((v) => {
      // open new tab
      system.keystroke("t", { using: "command down" });

      v.forEach((w) => {
        terminal.doScript(w, { in: window });
      });
    });
  }, scripts);
}
