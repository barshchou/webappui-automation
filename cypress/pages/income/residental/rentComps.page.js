import BasePage from "../../base/base.page";

class RentCompsPage extends BasePage{
    get generatedCommentary() {return cy.get("*[data-qa='rentCompsIntroduction.commentary-generated-text']");}
    get unitSwitchButton() {return cy.get("*[data-qa='unit-switch-button']");}
    get buildingSwitchButton() {return cy.get("*[data-qa='building-switch-button']");}
    get switchSearchConfirmButton() {return cy.get("*[data-qa='switch-search-confirm']");}
    get unitTypesArrowButton() {return cy.xpath("//*[text()='Unit Type']//following-sibling::button");}
    getCheckboxByDataQaAttr(attribute) {return cy.get(`*[data-qa='${attribute}'] input`);}
    get changeCompTypePopUpMessage() {return cy.xpath("//*[text()='Changing your comp type will cause you " +
        "to lose all currently selected comparables.']");}
}

export default new RentCompsPage();