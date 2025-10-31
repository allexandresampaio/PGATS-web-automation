const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retires:{
    openMode: 0,
    runMOde: 2
  },

  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    supportFile: 'cypress/support/e2e.js', // confirme este caminho
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
