/// <reference types="cypress" />

describe("Network Interception", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("/Product/List").as("ProductList");

    cy.intercept({
      method: "POST",
      url: "/Product/Edit/*",
    }).as("ProductEdit");

    cy.contains("Product").click();
  });

  it("Intercepting EA local Application", () => {
    cy.wait("@ProductList").then((req) => {
      expect(req.response.body.length).to.be.greaterThan(1);
      expect(req.response.statusCode).to.equal(200);
      expect(req.response.body).to.contain("Monitor");
    });
  });

  it("Intercepting Edit Operation", () => {
    cy.get('[href="/Product/Edit/2"]').click();

    cy.get("#Name").clear().type("Test Product");
    cy.get("#Description").clear().type("Test Description");
    cy.get(".btn").click();

    cy.wait("@ProductEdit").then((req) => {
      expect(req.response.statusCode).to.equal(302);
      expect(req.request.body).to.contain("Test+Product");
    });
  });
});
