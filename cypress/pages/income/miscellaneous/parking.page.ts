import BasePage from "../../base/base.page";

class ParkingPage extends BasePage {

    get isParkingFreeCheckbox() {return cy.get("[data-qa=isParkingFree] input");}

    vcLossTypeCheckbox(type: string) { return cy.get(`[data-qa=parkingVCLossType-radio-group] input[value='${type}']`); }

    get parkingCommentary() {return cy.get("[data-qa^='parkingIncomeDiscussion.commentary']");}

    parkingMonthlyRent(index = 0) {return cy.get(`[name='spaces[${index}].monthlyRent']`);}

    get parkingVCLossPercentage() { return cy.get("[name='parkingVCLossPercentage']"); }
}

export default new ParkingPage();
