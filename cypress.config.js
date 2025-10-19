import { allureCypress } from "allure-cypress/reporter";
import { defineConfig } from "cypress";


module.exports = defineConfig({
  video: false,
  videoCompression: true,
  e2e: {
    baseUrl: "https://demoqa.com/",
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
    specPattern: ["cypress/e2e/api/**/*.cy.js", "cypress/e2e/ui/**/*.cy.js"],
  },
});
