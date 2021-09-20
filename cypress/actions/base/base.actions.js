import BasePage from "../../pages/base/base.page"

class BaseActions {
    basePage = new BasePage()

    open(url = "/") {
        cy.visit(url)
    }

    clickYesButton() {
        this.basePage.yesButton.should("be.visible").click()
    }

    clickNoButton() {
        this.basePage.noButton.should("be.visible").click()
    }

    clickReturnToHomePageButton() {
        this.basePage.returnToHomePageButton.should("be.visible").click()
    }

    returnToHomePageAndSave() {
        this.clickReturnToHomePageButton()
        this.clickYesButton()
    }
}

export default BaseActions