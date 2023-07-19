describe(
  "EA application test",
  {
    retries: {
      runMode: 3,
      openMode: 3,
    },
  },
  () => {
    const login = () => {
      cy.session("login", () => {
        cy.visit("http://eaapp.somee.com");
        cy.get('a[href*="Login"]').click();

        cy.fixture("login").then((login) => {
          cy.get("#UserName").type(login.name);
          cy.get("#Password").type(login.password);
        });

        cy.get(".btn").click();
      });
    };

    beforeEach(() => {
      login();
      cy.visit("http://eaapp.somee.com");
    });

    it("Select Employee List", () => {
      cy.contains("Employee List").click();
    });

    it("Select Manage Users", () => {
      cy.get("a[href='/Role']").click();
    });
  }
);
