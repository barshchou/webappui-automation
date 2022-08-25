import CommercialRentRollSharedComponentPage from "../../shared_components/commercialRentRoll.shared.page";

class CommercialRentRollPage extends CommercialRentRollSharedComponentPage {

    get pageHeader() { return cy.xpath("//h5[text()='In-Place Rent Roll']"); }

    get basisOfRentField() { return cy.contains("Basis of Rent"); }

    get basisOfRentTooltip() { return cy.get("[aria-label='Select the unit of the provided rent roll.']"); }

    get perSquareBasisButton() { return cy.get("button[value='per square foot per year']"); }

    get monthlyBasisButton() { return cy.get("button[value='monthly']"); }

    get annuallyBasisButton() { return cy.get("button[value='annually']"); }

    get perSquareFootPerMonthButton() { return cy.get("button[value='per square foot per month']"); }

    get leaseStatusArrows() { return cy.get("[data-qa*='leaseStatus']:not([class*='readOnly']) > div[class*=Arrow]"); }

    get isInspectedCheckboxes() { return cy.get("[data-qa*='isInspected']:not([class*='readOnly']) input"); }

    getLeaseStatusToChooseByValue(status: string) { return cy.xpath(`//li[.='${status}']`); }

    get commercialInPlaceRentRollForm() {
        return cy.get('[id="incomeApproach.commercialIncome.commercialRentRoll-final-form"]');
    }

}

export default new CommercialRentRollPage();
