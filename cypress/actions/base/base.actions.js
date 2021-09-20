import homepagePage from "../../pages/base/homepage.page"

export default class BaseActions {

    open(url = "/") {
        cy.visit(url)
    }

    clickYesButton() {
        homepagePage.yesButton.should("be.visible").click()
    }

    clickNoButton() {
        homepagePage.noButton.should("be.visible").click()
    }

    clickReturnToHomePageButton() {
        homepagePage.returnToHomePageButton.should("be.visible").click()
    }

    returnToHomePageAndSave() {
        this.clickReturnToHomePageButton()
        this.clickYesButton()
    }

    goBackWithSave() {
        cy.go('back')
        this.clickYesButton()
    }
}