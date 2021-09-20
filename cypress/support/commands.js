Cypress.Commands.add("loginByApi", () => {
    cy.log("Loggin in by api")
    cy.request({
        method: "POST",
        url: "https://bowery-staging.herokuapp.com/user/login",
        body: {
            username: Cypress.env("USERNAME"),
            password: Cypress.env("PASSWORD")
        },
    }).then((response) => {
        const token = response.body.token
        window.localStorage.setItem("jwToken", token)
        cy.visit("/")
    })
})

Cypress.Commands.add("loginByUI", () => {
    cy.log("Loggin in by UI")
    cy.visit("/")
    const username = Cypress.env("USERNAME")
    const password = Cypress.env("PASSWORD")
    cy.get("*[name='username']").should("be.visible").type(username).should("have.value", username)
    cy.get("*[name='password']").should("be.visible").type(password).type("{enter}")
})

