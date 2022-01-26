import { exec } from "child_process";
import { sleep } from "../utils";

export async function openVSCode(dir: string) {
  exec(`code ${dir}`);
  await sleep(3);
}
