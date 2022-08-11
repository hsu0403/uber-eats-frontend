import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMe";

describe("<Header />", () => {
  it("should render OK without banner", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: "1",
                  email: "test@test.com",
                  role: "Client",
                  emailVerified: true,
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(
        screen.queryByText("Please verify your email(undefined).")
      ).toBeNull();
    });
  });
  it("should render OK with banner", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: "1",
                  email: "test@test.com",
                  role: "Client",
                  emailVerified: false,
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );
    expect(
      await screen.findByText("Please verify your email(test@test.com).")
    ).toBeInTheDocument();
  });
});
