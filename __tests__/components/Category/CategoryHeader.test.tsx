import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CategoryHeader from "../../../src/components/Category/CategoryHeader";

describe("CategoryHeader", () => {
  test("renders CategoryHeader component with correct text", () => {
    render(<CategoryHeader />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent("Popular Searches");

    const h3Element = screen.getByRole("heading", { level: 3 });
    expect(h3Element).toBeInTheDocument();
    expect(h3Element).toHaveTextContent(
      "The most popular search terms on FotoPie"
    );
  });
});
