import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4610.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

// TODO: Return this test to test run after https://bowery.atlassian.net/browse/WEB-4428 bug fixing
describe.skip("Less [USE (Property>Commercial Units)] Commercial V/C Loss @ X% -> Per Unit", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterListOfCommercialUnits(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);
        testData.rentsPsf.forEach((rent, index) => {
            Income.Commercial.InPlaceRentRoll.enterAnnualRentPerSFByRowNumber(rent, index);
        });
        NavigationSection.navigateToPotentialGrossIncome();
        Income.PotentialGrossIncome.enterCommercialVCLossPercentage(testData.undeterminedCommercialVCLossPercentage, testData.useValue);
        NavigationSection.navigateToProForma();
        Income.ProForma.verifyCommercialUseVCLossPerUnit(testData.useText, testData.numberOfResidentialUnits);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});