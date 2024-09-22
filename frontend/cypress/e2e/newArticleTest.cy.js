const apiUrl = `${Cypress.env("apiUrl")}`;
let token = "";

describe("Ajouter un nouvel article", () => {
  before(() => {
    cy.request({
      method: "POST",
      url: `${apiUrl}user/login`,
      body: {
        email: "test@test.com",
        password: "Test1234!",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
      expect(token).to.exist;
    });
  });

  it("Ajouter un nouvel article avec succès", () => {
    cy.visit("/addNewArticle");

    cy.get('[data-cy="title"]').type("test article");
    cy.get('[data-cy="description"]').type("test ajout d'un article");
    cy.get('[data-cy="image"]').attachFile("typetestImage.png");

    cy.intercept({
      method: "POST",
      url: `${apiUrl}article`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("addArticle");

    cy.get('[data-cy="send-button"]').click();

    cy.wait("@addArticle").its("response.statusCode").should("eq", 201);
  });

  it("Echec à l'ajout d'un nouvel article", () => {
    cy.visit("/addNewArticle");

    cy.get('[data-cy="description"]').type("test ajout d'un article");
    cy.get('[data-cy="image"]').attachFile("typetestImage.png");

    cy.intercept({
      method: "POST",
      url: `${apiUrl}article`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).as("addArticle");

    cy.get('[data-cy="send-button"]').click();

    cy.wait("@addArticle").its("response.statusCode").should("eq", 400);
  });
});
