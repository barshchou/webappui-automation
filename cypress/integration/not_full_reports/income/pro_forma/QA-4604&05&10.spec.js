import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4604&05&10.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

// TODO: Return those tests to test run after https://bowery.atlassian.net/browse/WEB-4428 bug fixing
describe.skip("Less [USE (Property>Commercial Units)] Commercial V/C Loss @ X% row", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
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
    });

    it("QA-4604: Total cell", () => {
        Income.ProForma.verifyCommercialUseVCLossTotal(testData.useText, testData.totalCommercialUseVCLoss);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4605: PSF cell", () => {
        Income.ProForma.verifyCommercialUseVCPerSF(testData.useText, testData.grossBuildingArea);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4610: Per Unit cell", () => {
        Income.ProForma.verifyCommercialUseVCLossPerUnit(testData.useText, testData.numberOfResidentialUnits);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});