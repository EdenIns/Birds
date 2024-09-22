const apiUrl = `${Cypress.env("apiUrl")}user/signup`;

describe("test page d'inscription", () => {
  it("ajoute un nouvel utilisateur avec succès", () => {
    cy.visit("/signup");

    cy.get('[data-cy="email"]').type("test@test.com");
    cy.get('[data-cy="pseudo"]').type("TestTest");
    cy.get('[data-cy="password"]').type("Test1234!");

    cy.intercept("POST", apiUrl).as("createUser");

    cy.get('[data-cy="send-button"]').click();

    cy.wait("@createUser").its("response.statusCode").should("eq", 201);
  });

  it("Erreur dans l'ajout d'un nouvel utilisateur (Deja existant)", () => {
    cy.visit("/signup");

    cy.get('[data-cy="email"]').type("test@test.com");
    cy.get('[data-cy="pseudo"]').type("pseudo");
    cy.get('[data-cy="password"]').type("Test1234!");

    cy.intercept("POST", apiUrl).as("createUser");

    cy.get('[data-cy="send-button"]').click();

    cy.wait("@createUser").its("response.statusCode").should("eq", 400);
  });
});
