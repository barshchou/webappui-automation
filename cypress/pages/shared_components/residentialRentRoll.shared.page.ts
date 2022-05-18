import BasePage from "../base/base.page";

export default class ResidentialRentRollSharedPage extends BasePage {

    get isInspectedInputs() {return cy.get("[data-qa^=isInspected][data-qa$=cell] input");}

    get isInspectedColumnCells() {return cy.get("*[data-qa^='isInspected']");}

}