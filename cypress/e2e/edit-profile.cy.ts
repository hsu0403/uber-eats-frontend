describe("Edit Profile", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login("test@gmail.com", "123456789");
    cy.get('a[href="/edit-profile"]').click();
  });
  it("can go to /edit-profile using the header", () => {
    cy.title().should("eq", "Edit Profile | Uber-Eats");
  });
  it("can change email", () => {
    cy.intercept("POST", "http://localhost:4001/graphql", (req) => {
      const { operationName, variables } = req.body;
      console.log(req.body);
      if (operationName === "FrontEditProfile") {
        //@ts-ignore
        variables?.editProfileInput?.email = "test@gmail.com";
      }
    });
    cy.get('[name="email"]')
      .should("have.value", "test@gmail.com")
      .clear()
      .type("newTest@gmail.com");
    cy.findByRole("button").click();
  });
});
