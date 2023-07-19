describe("EA App Test", () => {
  beforeEach(() => {
    cy.visit("/").as("app");
    cy.contains("Product").click();
  });

  it("Create a Product", () => {
    cy.get("@app").url().should("include", "localhost");

    cy.contains("Create")
      .then(($createlink) => {
        cy.wrap($createlink).should("have.text", "Create");
      })
      .as("createlink");

    cy.get("@createlink").click();
    cy.get("#Name").clear().type("Test Product");
    cy.get("#Description").clear().type("Test Product Desc");
    cy.get("#Price").clear().type("2000");
    cy.get("#ProductType").select("0");
    cy.get("#Create").click;
  });

  it("Click Edit for a specific product", () => {
    cy.get(".table")
      .find("td")
      .contains("Mouse")
      .parent()
      .contains("Edit")
      .click();

    cy.url().should("include", "/Product/Edit");
    cy.get("#Name").should("have.value", "Mouse");

    cy.get("#Description").as("description");

    cy.get("@description").then(($description) => {
      cy.wrap($description).parent().should("have.class", "form-group");
      cy.wrap($description).invoke("val").should("contain", "Gaming Mouse");
    });
  });
});
