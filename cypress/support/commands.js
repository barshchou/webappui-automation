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
