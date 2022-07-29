import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";

const reportCreationData = ReportDataCreator.getReportData("4332");

describe(`Verify that display of results in the Map section on Rent Comps page 
                when the Unit type of search is selected`, 
{ tags:[ "@income", "@rent_comps", "@residential", "@flaky" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.verifyLoadingDoesNotExist()
            .verifyPhotosExistAndNavigateByPhotos(1);
        RentCompsPage.comparableAddressesTexts.each($address => {
            expect($address).not.to.be.empty;
        });
        RentCompsPage.rentElementsTexts.each($rentEl => {
            cy.wrap($rentEl).should("exist").should("contain.text", "/month")
                .should("contain.text", "/SF");
        });
        RentCompsPage.comparablesAmenitiesTexts.each($amenityEl => {
            cy.wrap($amenityEl).should("exist").should("contain.text", "bed")
                .should("contain.text", "bath");
        });
        RentCompsPage.comparablePropertyTexts.each($propertyEl => {
            cy.wrap($propertyEl).should("exist").should("contain.text", "mi. away")
                .should("contain.text", "SF").should("contain.text", "Valued:");
        });
    });
});