import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PhotoCategory from "../../../src/components/Category/PhotoCategory";

describe("PhotoCategory", () => {
  beforeEach(() => {
    render(<PhotoCategory />);
  });

  const categories = [
    "mars",
    "building",
    "flowers",
    "aurora",
    "nature",
    "cloud",
    "coffee",
    "beach",
    "space",
    "dogs",
    "abstract",
    "sea",
    "office",
    "cars",
    "food",
    "cats",
    "machine",
    "night",
    "city",
    "colorful",
  ];

  categories.forEach((category, index) => {
    test(`renders link, image, and heading for ${category}`, () => {
      const link = screen.getByRole("link", { name: category });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/category/${category}`);

      const image = screen.getByRole("img", { name: category });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", `/category-photos/${index + 1}.jpg`);

      const heading = screen.getByText(new RegExp(category, "i"));
      expect(heading).toBeInTheDocument();
    });
  });
});
