import { run } from "@jxa/run";
import { printStatement } from "../utils";

export async function openSpace() {
  return run((printStatement) => {
    const print = eval(printStatement);

    Application("Mission Control").launch();

    const dock = Application("System Events").processes["Dock"];
    const group = dock.groups[0].groups[0].groups[1];

    // print(group);

    // click open
    group.buttons[0].click();

    delay(0.5);
    const buttons = group.lists[0].buttons();
    buttons[buttons.length - 1].click();
    delay(0.5);
  }, printStatement);
}

export function clearSpaces() {
  return run((printStatement) => {
    const print = eval(printStatement);

    Application("Mission Control").launch();
    delay(0.5);

    const dock = Application("System Events").processes["Dock"];
    function getButtons() {
      const group = dock.groups[0].groups[0].groups[1];
      return group.lists[0].buttons();
    }

    while (1) {
      const buttons = getButtons();
      if (buttons.length <= 1) {
        break;
      }
      buttons[buttons.length - 1].actions()[1].perform();
      delay(0.1);
    }

    delay(0.5);
    getButtons()[0].click();
    delay(0.5);
  }, printStatement);
}
