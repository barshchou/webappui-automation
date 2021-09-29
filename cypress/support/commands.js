import "cypress-file-upload";

Cypress.Commands.add("loginByApi", (url = "/") => {
    cy.log("Logging in by api");
    cy.request({
        method: "POST",
        url: "https://bowery-staging.herokuapp.com/user/login",
        body: {
            username: Cypress.env("USERNAME"),
            password: Cypress.env("PASSWORD")
        },
    }).then((response) => {
        const token = response.body.token;
        window.localStorage.setItem("jwToken", token);
        cy.visit(url);
    });
});

Cypress.Commands.add("loginByUI", () => {
    cy.log("Logging in by UI");
    cy.visit("/");
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");
    cy.get("*[name='username']").should("be.visible").type(username).should("have.value", username);
    cy.get("*[name='password']").should("be.visible").type(password).type("{enter}");
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

