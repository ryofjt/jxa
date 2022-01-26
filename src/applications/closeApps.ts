import { run } from "@jxa/run";
import { printStatement } from "../utils";

export async function closeApps(terminalName = "ターミナル") {
  return run(
    (printStatement: string, terminalName: string) => {
      const print = eval(printStatement);

      const system = Application("System Events");
      const dock = system.processes["Dock"];

      // quit terminal
      const terminal = Application("Terminal");
      const windows = terminal.windows();
      if (windows.length > 1) {
        windows[1].frontmost = true;
        system.keystroke("q", { using: "command down" });
      }

      const appNames: string[] = dock.lists[0]
        .uiElements()
        .map((v: any) => v.name());
      appNames
        .filter((v) => v !== terminalName)
        .forEach((v: any) => {
          try {
            Application(v).quit();
          } catch (e) {}
          delay(0.1);
        });
    },
    printStatement,
    terminalName
  );
}
