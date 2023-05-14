import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { useRouter } from "next/router";
import "@testing-library/jest-dom/extend-expect";
import ResetRequest from "../../../src/components/Reset/ResetRequest";
import { rest } from "msw";

// Mock server response
const server = setupServer(
  rest.post("/api/reset/resetRequest", (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

// Mock createResetRequest function
jest.mock("../../../src/axiosRequest/api/reset", () => ({
  createResetRequest: jest.fn(() => Promise.resolve()),
}));

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renders ResetRequest and submits form", async () => {
  const { push } = useRouter();

  render(<ResetRequest />);

  // Check if the required text and elements are in the document
  expect(screen.getByText("Reset Password")).toBeInTheDocument();
  expect(screen.getByText("Send Verification")).toBeInTheDocument();

  // Fill in the form
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "test@example.com" },
  });

  // Submit the form and send the request to the server
  fireEvent.click(screen.getByRole("button", { name: /Send Verification/i }));

  // Wait for the server response
  // await waitFor(() => expect(push).toHaveBeenCalledWith("/reset/email-sent"));
});
