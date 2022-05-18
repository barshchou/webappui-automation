import BasePage from "../base/base.page";

export default class ResidentialRentRollSharedPage extends BasePage {

    get isInspectedInputs() {return cy.get("[data-qa^=isInspected][data-qa$=cell] input");}

    get isInspectedColumnCells() {return cy.get("*[data-qa^='isInspected']");}

    get unitNumberCells() {return cy.get("[data-qa^='number'][data-qa$=cell]");}

    get roomsCells() {return cy.get("[data-qa^=rooms][data-qa$=cell]");}

}