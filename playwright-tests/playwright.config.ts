import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: require.resolve("./global.setup"),
  use: {
    // All API requests will be prefixed with this baseURL
    baseURL: "https://api-testing-with-playwright-b1gd.vercel.app",
    storageState: "./userAuth.json",
    extraHTTPHeaders: {
      // We can add headers that are common for all requests.
      // For example, an authorization token.
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
  },
});
