import BasePage from "../base/base.page";

class IntroductionPage extends BasePage {
    get SwitchEditBtn() {
        return cy.get('[data-qa="Edit-switch-button"]');
    }

    get TextPropertyRightsAppraised() {
        return cy.xpath('//*[@id="previewAndEdit.introduction-final-form"]//h6')
            .contains("Property Rights Appraised").next();
    }

    get ChipModified() {
        return cy.get('[ui="indicator"]');
    }
    
    getBackLink(whereTo: string) {
        return cy.xpath(`//div[.="${whereTo}"]//a`);
    }

}
export default new IntroductionPage();