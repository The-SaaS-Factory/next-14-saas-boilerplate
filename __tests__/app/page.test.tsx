import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "@/app/[locale]/(landing)/page";

test("Page", () => {
  render(<LandingPage />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
