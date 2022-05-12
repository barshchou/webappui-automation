import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4602&04&05&10.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import ProFormaPage from "../../../../pages/income/proForma.page";

describe("Less [USE (Property>Commercial Units)] Commercial V/C Loss @ X% row", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);
        testData.rentsPsf.forEach((rent, index) => {
            Income.Commercial.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
        });
        NavigationSection.navigateToPotentialGrossIncome();
        Income.PotentialGrossIncome.enterCommercialVCLossPercentage(testData.comUseVCLossPercentage, testData.useValue);
        NavigationSection.navigateToProForma()
            .verifyProgressBarNotExist();
    });

    it("QA-4602: Commercial V/C Loss @ X%", () => {
        ProFormaPage.getCommercialUseVCLossRow(testData.useText)
            .should("contain.text", `${testData.comUseVCLossPercentage.toFixed(2)}%`);
        deleteReport(testData.reportCreationData.reportNumber);
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