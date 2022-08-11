import { render, screen } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    const { debug, rerender } = render(
      <Button canClick={true} loading={false} actionText={"test"} />
    );
    screen.getByText("test");
    rerender(<Button canClick={true} loading={true} actionText={"test"} />);
    screen.getByText("Loading...");
  });
  it("should canClick false", () => {
    const {
      container: { firstChild },
    } = render(<Button canClick={false} loading={false} actionText={"test"} />);
    expect(firstChild).toHaveClass("bg-red-200");
  });
});
