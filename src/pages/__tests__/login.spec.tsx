import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Login, LOGIN_MUTATION } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  it("should render OK", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <Login />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Login | Uber-Eats");
    });
  });
  it("displays email validation errors", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <Login />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );

    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, "123@ttt");
    await waitFor(() => {
      screen.getByText("Invalid email address");
    });
    userEvent.clear(email);
    await waitFor(() => {
      screen.getByText("Email is required.");
    });
  });
  it("displays password validation errors", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <Login />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );

    const password = screen.getByPlaceholderText(/password/i);
    userEvent.type(password, "123");
    await waitFor(() => {
      screen.getByText("The password must be at least 8 digits.");
    });
    userEvent.clear(password);
    await waitFor(() => {
      screen.getByText(/password is required./i);
    });
  });
  it("submits form and calls mutation", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <Login />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        logIn: {
          ok: true,
          token: "XXX",
          error: "mutation error",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    const formData = {
      email: "test@test.com",
      password: "123456789",
    };
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByText("Log In");
    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
    userEvent.click(button);

    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        loginInput: {
          ...formData,
        },
      });
    });
    screen.getByText("mutation error");
    expect(localStorage.setItem).toHaveBeenCalledWith("uberEats-token", "XXX");
  });
});
