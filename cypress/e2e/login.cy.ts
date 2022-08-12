describe("Log In", () => {
  it("should go to home", () => {
    cy.visit("/").title().should("eq", "Login | Uber-Eats");
  });
  it("cna see email / password validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("test@test");
    cy.findByText("Invalid email address").should(
      "have.text",
      "Invalid email address"
    );
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByText("Email is required.").should(
      "have.text",
      "Email is required."
    );
    cy.findByPlaceholderText(/password/i).type("12");
    cy.findByText("The password must be at least 8 digits.");
    cy.findByPlaceholderText(/password/i).clear();
    cy.findByText("Password is required.");
  });
  it("can fill out the form", () => {
    // @ts-ignore
    cy.login("test@gmail.com", "123456789");
  });
});
