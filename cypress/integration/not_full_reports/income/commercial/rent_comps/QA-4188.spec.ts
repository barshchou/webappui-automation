import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4188.fixture";
import { Income } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Dropdown 'Filters'- 'Lease terms' section", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        const address = "462 1st Avenue, New York, USA";

        cy.stepInfo("1. Navigate to Income -> Commercial -> In-Place Rent Roll and choose 'Per Square Foot Per Month' as Basis of Rent");
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
        Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber("Occupied");

        cy.stepInfo("2. Navigate to Income -> Commercial -> Rent Comps and add new comp manually");
        _NavigationSection.navigateToCommercialRentComps();
        cy.get("[data-qa=manually-add-a-new-comp-btn]").click();
        cy.get("[data-qa='google-autocomplete-search.location-input'] input").type(`${address}{enter}`).should("have.value", address);
        cy.get("[data-qa=submit-button]").should("not.be.disabled").click({ force: true });
        cy.get("tr[data-qa^='search-results']").should("be.visible").click();
        cy.get("[data-qa=submit-button]").should("not.be.disabled").click({ force: true });

        cy.stepInfo("3. Add neccessary info for new rent comp and choose 'Per Square Foot Per Month' as Unit of Measure");
        // cy.xpath("//table[@data-qa='unsorted_group']//button[.='Edit']").click();   // Edit button for rent comp
        cy.get("input[name=baseRent]").clear().type(`150`);
        cy.get("input[name=squareFeet]").clear().type(`1000`);
        cy.get("input[name=tenantName]").clear().type(`Test`);
        cy.get("[data-qa=use-select-list]").click().get("li[data-value=office]").click();
        cy.get("[data-qa=dateSigned-date-picker] div input").type("01012022");
        cy.get("[data-qa=sourceOfInformation-select-list]").click().get("li[data-value=bowerySubject]").click();
        cy.get("div[data-qa=rentType-radio-group] [role=radiogroup]").eq(1).find("input[value='per square foot per month']").click();
        cy.get("[data-qa=submit-button]").click();
        cy.get("[data-qa=rentPerSF-cell]").should("have.text", "$" + 150*12*1000/12/1000 +".00");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});