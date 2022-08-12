describe("Create Account", () => {
  it("should see email / password validation errors", () => {
    cy.visit("/");
    cy.findByText(/create an account/i).click();
    cy.findByPlaceholderText(/email/i).type("test@t");
    cy.findByText("Invalid email address");
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByText("Email is required.");
    cy.findByPlaceholderText(/password/i).type("123");
    cy.findByText("The password must be at least 8 digits.");
    cy.findByPlaceholderText(/password/i).clear();
    cy.findByText("Password is required.");
  });
  it("should be able to create account and login", () => {
    cy.intercept("http://localhost:4001/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "FrontCreateAccountMutation") {
        req.reply((res) => {
          res.send({
            fixture: "./signup.json",
          });
        });
      }
    });
    cy.visit("/signup");
    cy.findByPlaceholderText(/email/i).type("test@gmail.com");
    cy.findByPlaceholderText(/password/i).type("123456789");
    cy.findByRole("button").click();
    cy.wait(2000);
    cy.title().should("eq", "Login | Uber-Eats");
    cy.get('[name="email"]').should("have.value", "test@gmail.com");
    cy.findByRole("button").click();
    // @ts-ignore
    cy.assertLoggedIn();
    cy.wait(2000);
    cy.title().should("eq", "Home | Uber-Eats");
  });
});
