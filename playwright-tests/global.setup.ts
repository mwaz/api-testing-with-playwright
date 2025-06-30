import { request } from "@playwright/test";
import config from "./playwright.config";

const authFile = "./userAuth.json";

async function globalSetup() {
  const baseURL = config.use?.baseURL;
  // Send a request to log in the user.
  const apiContext = await request.newContext();
  await apiContext.post(`${baseURL}/api/login`, {
    data: {
      username: "process.env.TEST_USERNAME",
      password: "process.env.TEST_PASSWORD",
    },
  });

  // Save the storage state to the userAuth.json.
  await apiContext.storageState({ path: authFile });
}

export default globalSetup;
