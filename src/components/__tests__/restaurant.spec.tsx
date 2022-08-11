import { render, screen } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("should render OK with props", () => {
    const restaurantProps = {
      address: "test address",
      coverImg: "test img",
      id: "1",
      restaurantName: "testR",
      categoryName: "testC",
    };
    const {
      debug,
      container: { firstChild },
    } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    screen.getByText(restaurantProps.address);
    screen.getByText(restaurantProps.restaurantName);
    screen.getByText(restaurantProps.categoryName);
    expect(firstChild).toHaveAttribute(
      "href",
      `/restaurant/${restaurantProps.id}`
    );
  });
});
