export function sleep(second: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, second * 1000);
  });
}

export * from "./printer";
