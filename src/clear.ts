import "@jxa/global-type";
import { closeApps } from "./applications/closeApps";
import { clearSpaces } from "./applications/space";

const clear = async () => {
  await clearSpaces();
  await closeApps();
};

clear()
  .then((output) => {
    console.log(output);
  })
  .catch((error) => {
    console.error(error);
  });
