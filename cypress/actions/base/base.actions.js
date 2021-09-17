class BaseActions {
    open(url = "/") {
        cy.visit(url)
    }
}

export default BaseActions