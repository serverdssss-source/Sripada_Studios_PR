import { expect, test } from "@playwright/test";

test("home page loads and nav reaches contact", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Building Brands");
  await expect(page.locator("#contact")).toBeAttached();
});

test("no horizontal page overflow", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
