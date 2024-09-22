const apiUrl = `${Cypress.env("apiUrl")}user/login`;

describe("test page de connexion", () => {
  it("Connecter un utilisateur avec succès", () => {
    cy.visit("/login");

    cy.get('[data-cy="email"]').type("test@test.com");
    cy.get('[data-cy="password"]').type("Test1234!");

    cy.intercept("POST", apiUrl).as("loginUser");

    cy.get('[data-cy="send-button"]').click();

    cy.wait("@loginUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const token = interception.response.body.token;
      expect(token).to.exist;
    });
  });

it("Erreur lors de la connexion (mauvais mot de passe)", () => {
    cy.visit("/login");

    cy.get('[data-cy="email"]').type("test@test.com");
    cy.get('[data-cy="password"]').type("Test1234!!");

    cy.intercept("POST", apiUrl).as("loginUser");

    cy.get('[data-cy="send-button"]').click();

    cy.wait("@loginUser").its("response.statusCode").should("eq", 401);
  });
});
