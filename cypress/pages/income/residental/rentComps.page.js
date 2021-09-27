import BasePage from "../../base/base.page";

class RentCompsPage extends BasePage{
    get generatedCommentary() {return cy.get("*[data-qa='rentCompsIntroduction.commentary-generated-text']");}
    get unitSwitchButton() {return cy.get("*[data-qa='unit-switch-button']");}
    get buildingSwitchButton() {return cy.get("*[data-qa='building-switch-button']");}
    get switchSearchConfirmButton() {return cy.get("*[data-qa='switch-search-confirm']");}
}

export default new RentCompsPage();