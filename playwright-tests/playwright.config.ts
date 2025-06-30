import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: require.resolve("./global.setup"),
  use: {
    // All API requests will be prefixed with this baseURL
    baseURL: "http://localhost:3000",
    storageState: "./userAuth.json",
    extraHTTPHeaders: {
      // We can add headers that are common for all requests.
      // For example, an authorization token.
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      "Content-Type": "application/json",
    },
  },
});
