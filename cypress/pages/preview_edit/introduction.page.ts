import BasePage from "../base/base.page";

class IntroductionPage extends BasePage {
    get SwitchEditBtn() {
        return cy.get('[data-qa="Edit-switch-button"]');
    }

    getTextFromTextArea(name: string) {
        return cy.xpath('//*[@id="previewAndEdit.introduction-final-form"]//h6')
            .contains(`${name}`).next();
    }

    getChipModified(name: string) {
        return cy.xpath(`//*[contains(text(), '${name}')]//following::*[@ui='indicator'][1]`);
    }
    
    getBackLink(whereTo: string) {
        return cy.xpath(`//div[.="${whereTo}"]//a`);
    }

}
export default new IntroductionPage();