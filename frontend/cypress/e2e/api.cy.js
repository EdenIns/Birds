const apiArticles = `${Cypress.env("apiUrl")}article`;

context("GET articles", () => {
  it("Récuperer tous les articles", () => {
    cy.request("GET", apiArticles).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).length.to.be.greaterThan(1)
    })
  })
})