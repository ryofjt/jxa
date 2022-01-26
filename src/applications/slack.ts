import { run } from "@jxa/run";

export function openSlack() {
  return run(() => {
    const app = Application("Slack");
    app.activate();
  });
}
