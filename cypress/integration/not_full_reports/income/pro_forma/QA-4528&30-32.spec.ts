import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4528&30-32.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Residential V/C Loss @ X% row", {tags:"@fix"},() => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Add residential units and enter GBA");
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits)
            .enterGrossBuildingArea(testData.grossBuildingArea);

        cy.stepInfo("2. Go to Income → Residential → In-Place Rent Role and fill in all necessary values to the table");
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
            .enterAllEqualLeaseStatuses(testData.leaseStatus)
            .enterAllEqualMonthlyRents(testData.monthlyRent);

        cy.stepInfo(`3. Go to Income → Potential Gross Income → Residential Vacancy and Collection Loss table 
        and fill in the value into the Residential Vacancy and Collection Loss cell`)
        NavigationSection.navigateToPotentialGrossIncome();
        Income.PotentialGrossIncome.enterResVacancyCollLoss(testData.resVacancyCollectionLoss)
            .clickSaveButton()
            .verifyProgressBarNotExist();

        // TODO: Change to navigation with saving, after https://bowery.atlassian.net/browse/WEB-4956 bug fix
        cy.stepInfo(`4. Go to Income → Pro Forma page.
        Verify that label has format Less Residential V/C Loss @ X%.
        Verify that Total value is taken from Potential Gross Income → table → Less Residential V/C Loss @ X% → $
        Verify that PSF value is calculated by the formula: Total / GBA
        Verify that Per Unit value is calculated by the formula: Total / # of Residential Units`)
        NavigationSection.navigateToProForma(false);
        Income.ProForma.verifyResidentialVCLossLabel(testData.resVacancyCollectionLoss)
            .verifyResidentialVCLossTotal(testData.resVCLossTotal)
            .verifyResidentialVCLossPerSF(testData.grossBuildingArea)
            .verifyResidentialVCLossPerUnit(testData.numberOfUnits);
        deleteReport(testData.reportCreationData.reportNumber);
    });
})