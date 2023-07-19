/// <reference types="cypress" />

describe("Products API Testing", () => {
  it("GET operation", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8001/Product/GetProductById/1",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "text/plain",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.contain("application/json");
      expect(response.body).to.be.an("object");
      expect(response.body).to.deep.include({ name: "Keyboard" });

      cy.fixture("API/GETresult").then((result) => {
        expect(response.body).to.contain(result);
      });
    });
  });

  it("POST operation", () => {
    cy.fixture("API/POSTBody")
      .then(($body) => {
        cy.request({
          method: "POST",
          url: "http://localhost:8001/Product/Create",
          failOnStatusCode: false,
          headers: {
            accept: "text/plain",
          },
          body: $body,
        });
      })
      .then((response) => {
        expect(response.status).to.equal(200);
      });
  });

  // it("Delete Operation", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: "http://localhost:8001/Product/Delete?id=38",
  //     failOnStatusCode: false,
  //     headers: {
  //       accept: "*/*",
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.equal(200);
  //   });
  // });
});
