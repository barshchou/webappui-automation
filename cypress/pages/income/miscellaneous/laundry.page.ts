import BasePage from "../../base/base.page";

class LaundryPage extends BasePage{
    get laundryheaderSection() {return cy.get("*[data-qa='laundry']");}

    get noLaundryButton() {return cy.get("[data-qa=no-laundry-room-callout-btn]");}

    get laundryIncomeInput() {return cy.get("[name=laundryIncome]");}

    get laundryVCLossRadio() {return cy.get("[data-qa=laundryVCLossType-radio-group] input");}

    get laundryVCLossPercentage() {return cy.get("[name=laundryVCLossPercentage]");}
}

export default new LaundryPage();
