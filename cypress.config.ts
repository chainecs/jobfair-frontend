import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Uncomment and set your base URL for the application if needed
    // baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      FRONT_URL: "http://localhost:3000",
      API_URL: "http://localhost:5001/api/v1",
    },
    defaultCommandTimeout: 10000,
    viewportWidth: 1440,
    viewportHeight: 1000,
  },
});
