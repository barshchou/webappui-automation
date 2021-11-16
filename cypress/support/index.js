import "./commands";

require("cypress-xpath");
require("cypress-iframe");
import "cypress-promise/register";

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
