import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { nav } from "@/content/site";
import Home from "./page";

describe("Home", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Connecting Iconic\s*Brands/);
  });

  it("has a section for every nav anchor plus contact", () => {
    const { container } = render(<Home />);
    for (const href of [...nav.map((n) => n.href), "#contact"]) {
      expect(container.querySelector(href), href).not.toBeNull();
    }
  });

  it("renders the enquiry form", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /request pitch deck/i })).toBeInTheDocument();
  });
});
