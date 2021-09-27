import "./commands";

require("cypress-xpath");
require("cypress-iframe");

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
