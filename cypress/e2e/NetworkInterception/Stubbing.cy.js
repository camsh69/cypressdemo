/// <reference types="cypress" />

describe("Network Stubbing", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept("POST", "/Product/Edit/*", (req) => {
      req.body =
        "Name=Test+hijacked+Product&Description=Test+hijacked+Description";
      req.continue();
    }).as("EditProduct");

    cy.intercept("GET", "/Product/Create", (req) => {
      req.reply((res) => {
        res.setThrottle(0.5);
      });
    });

    cy.contains("Product").click();
  });

  it("Create a Product", () => {
    cy.contains("Create").click();

    cy.get("#Name").clear().type("Test Product", { waitForAnimations: true });
  });

  it("Edit product", () => {
    cy.get('[href="/Product/Edit/2"]').click();
    cy.get("#Name").clear().type("Test Product");
    cy.get("#Description").clear().type("Test Description");
    cy.get(".btn").click();

    cy.wait("@EditProduct");
    cy.url().should("include", "Product/List");
  });
});
