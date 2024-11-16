import { frontEndUrl } from "../utils/constant";
import { getRandomName, getRandomNumber } from "../utils/generator";

function loginAndRedirect() {
  cy.visit(`${frontEndUrl}/login`);
  cy.get('input[id="email"]').type("chainza@gmail.com");
  cy.get('input[id="password"]').type("123456");
  cy.get('button[type="submit"]').click();
  cy.wait(1000);
  cy.visit(`${frontEndUrl}/company`);
}

describe("Company Management", () => {
  it("should create a new company successfully", () => {
    const companyName = getRandomName();
    loginAndRedirect();
    cy.contains("Create New Company").click();
    cy.get('input[name="name"]').type(companyName);
    cy.get('input[name="business"]').type("Software Development");
    cy.get('input[name="address"]').type("123 Test Street");
    cy.get('input[name="province"]').type("Bangkok");
    cy.get('input[name="postalcode"]').type("10200");
    cy.get('input[name="tel"]').type("0123456789");
    cy.get('input[name="picture"]').type(`https://picsum.photos/200/300?random=${getRandomNumber(10000)}`);
    cy.contains("Save").click();

    cy.contains("Company created successfully.").should("be.visible");
    cy.contains("Close").click();
    cy.contains(companyName).should("be.visible");
  });

  it("should validate required fields", () => {
    loginAndRedirect();
    cy.contains("Create New Company").click();
    cy.contains("Save").click();
    cy.contains("Name is required.").should("be.visible");
    cy.contains("Business description is required.").should("be.visible");
    cy.contains("Address is required.").should("be.visible");
    cy.contains("Province is required.").should("be.visible");
    cy.contains("Postal code is required.").should("be.visible");
    cy.contains("Picture URL is required.").should("be.visible");
  });

  it("should update a company successfully", () => {
    loginAndRedirect();
    cy.contains("Edit").first().click();
    cy.get('input[name="name"]').clear().type(getRandomName());
    cy.contains("Save").click();
    cy.contains("Company updated successfully.").should("be.visible");
  });

  it("should delete a company successfully", () => {
    loginAndRedirect();
    cy.contains("Delete").first().click();
    cy.get("#confirm-delete-button").click();
    cy.contains("Company deleted successfully.").should("be.visible");
  });
});
