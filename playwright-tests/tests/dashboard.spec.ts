import { test, expect } from "@playwright/test";

test("user can access their dashboard", async ({ page }) => {
  // The user is already logged in thanks to global setup! :)
  test.setTimeout(60000); // Set a longer timeout for this test
  await page.goto("/dashboard");

  // Assert that the user's name is visible on the page
  await expect(page.locator("h1")).toContainText("Welcome, Authenticated User!");
});
