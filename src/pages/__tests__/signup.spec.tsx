import { ApolloProvider } from "@apollo/client";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { CREATE_ACCOUNT_MUTATION, SignUp } from "../signup";
import { BrowserRouter as Router } from "react-router-dom";
import { createMockClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../mytypes";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useNavigate: () => {
      return mockUseNavigate;
    },
  };
});

describe("<SignUp />", () => {
  it("should render OK", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <SignUp />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Uber-Eats");
    });
  });

  it("should renders validation errors", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <SignUp />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    userEvent.type(email, "test@tt");
    await waitFor(async () => {
      expect(
        await screen.findByText("Invalid email address")
      ).toBeInTheDocument();
    });
    userEvent.clear(email);
    await waitFor(async () => {
      expect(await screen.findByText("Email is required.")).toBeInTheDocument();
    });

    userEvent.type(password, "12");
    await waitFor(async () => {
      expect(
        await screen.findByText("The password must be at least 8 digits.")
      ).toBeInTheDocument();
    });
    userEvent.clear(password);
    await waitFor(async () => {
      expect(
        await screen.findByText("Password is required.")
      ).toBeInTheDocument();
    });
  });

  it("should mutation with form values", async () => {
    const mockedClient = createMockClient();
    render(
      <HelmetProvider>
        <Router>
          <ApolloProvider client={mockedClient}>
            <SignUp />
          </ApolloProvider>
        </Router>
      </HelmetProvider>
    );
    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation error",
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedLoginMutationResponse
    );
    const formData = {
      email: "test@test.com",
      password: "123456789",
      role: UserRole.Client,
    };
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByText("Create Account");

    userEvent.type(email, formData.email);
    userEvent.type(password, formData.password);
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
        createAccountInput: {
          ...formData,
        },
      });
    });
    expect(await screen.findByText("mutation error")).toBeInTheDocument();
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/", {
      replace: true,
      state: { ...formData },
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
