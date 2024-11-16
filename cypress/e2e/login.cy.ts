import { frontEndUrl } from "../utils/constant";

describe("Login functionality", () => {
  beforeEach(() => {
    cy.visit(`${frontEndUrl}/login`);
  });

  it("should display error for invalid credentials", () => {
    cy.get('input[id="email"]').type("wronguser@example.com");
    cy.get('input[id="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Invalid email or password").should("be.visible");
  });

  it("should login successfully with valid credentials", () => {
    cy.get('input[id="email"]').type("chainza@gmail.com");
    cy.get('input[id="password"]').type("123456");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("Welcome to JobFair").should("be.visible");
  });

  it("should navigate to the register page", () => {
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.contains("Register").should("be.visible");
  });
});
