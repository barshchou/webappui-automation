export default class BasePage {
    open(url = "/") {
        cy.visit(url)
    }
}