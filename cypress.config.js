const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fv65sr',
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.saucedemo.com",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      html: false,
      overwrite: false
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
