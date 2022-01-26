import "@jxa/global-type";
import { closeApps } from "./applications/closeApps";
import { clearSpaces } from "./applications/space";

const clear = async () => {
  await clearSpaces();
  await closeApps();
};

clear().catch((error) => {
  console.error(error);
});
