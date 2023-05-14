import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostImage from "../../../src/components/PhotoQuickView/PostImage";

describe("PostImage Component", () => {
  it("renders the image with the correct src and alt attributes", () => {
    const postPhoto = "https://example.com/image.jpg";
    render(<PostImage postPhoto={postPhoto} />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", postPhoto);
    expect(imageElement).toHaveAttribute("alt", "image");
  });
});
