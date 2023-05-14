import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CollectButton, {
  CollectButtonProps,
} from "../../../src/components/PhotoQuickView/CollectButton";
import { Provider } from "react-redux";
import { store } from "../../../src/store/store";
import mockedRouter from "next-router-mock";

const renderCollectButton = (props: Partial<CollectButtonProps> = {}) => {
  const defaultProps: CollectButtonProps = {
    filenameString: "test-image.jpg",
    collected: false,
    userCollects: 0,
    router: { ...mockedRouter } as any,
    isAuthenticated: false,
    ...props,
  };

  return render(
    <Provider store={store}>
      <CollectButton {...defaultProps} />
    </Provider>
  );
};

describe("CollectButton Component", () => {
  it("renders the button with the correct text and styles", () => {
    const { rerender } = renderCollectButton({
      collected: false,
      userCollects: 5,
    });

    const button = screen.getByTestId("collect-button");
    expect(button).toHaveTextContent("Collect 5");
    expect(button).not.toHaveStyle("color: orange");

    rerender(
      <Provider store={store}>
        <CollectButton
          filenameString="test-image.jpg"
          collected={true}
          userCollects={5}
          router={mockedRouter as any}
          isAuthenticated={false}
        />
      </Provider>
    );

    expect(button).toHaveTextContent("Collected 5");
    expect(button).toHaveStyle("color: orange");
  });

  it("calls addToCollection when the button is clicked", () => {
    const pushMock = jest.fn();
    renderCollectButton({
      isAuthenticated: false,
      router: { ...mockedRouter, push: pushMock } as any,
    });

    const button = screen.getByTestId("collect-button");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
