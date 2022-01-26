import { run } from "@jxa/run";
import { exec } from "child_process";
import { sleep } from "../utils";

export async function openChrome(profile?: string) {
  // https://itectec.com/askdifferent/use-apple-script-to-open-chrome-with-specific-profile/
  exec(
    `open -na 'Google Chrome' --args --profile-directory="${
      profile ?? "Default"
    }"`
  );
  await sleep(3);
}

export function openChromeTabs(urls: string[], overWrite: boolean = true) {
  return run(
    (urls: string[], overWrite: boolean) => {
      const app = Application("Google Chrome");
      const window = app.windows[0];

      if (overWrite) {
        for (const tab of window.tabs()) {
          tab.url = urls.shift();
        }
      }

      urls.forEach((v, i) => {
        const tab = app.Tab({ url: v });
        window.tabs.push(tab);
        delay(0.1);
      });
    },
    urls,
    overWrite
  );
}
