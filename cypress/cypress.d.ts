// cypress.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Saves the current state of localStorage.
     */
    saveLocalStorage(): Chainable<void>;

    /**
     * Restores the previously saved state of localStorage.
     */
    restoreLocalStorage(): Chainable<void>;
  }
}
