import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4602_04_05_10.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../actions";

describe("Less [USE (Property>Commercial Units)] Commercial V/C Loss @ X% row", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses,
                testData.numberOfCommercialUnits);
            testData.rentsPsf.forEach((rent, index) => {
                Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
            });
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.enterCommercialVCLossPercentage(testData.comUseVCLossPercentage,
                testData.useValue);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("QA-4602: Commercial V/C Loss @ X%", () => {
            Income._ProFormaActions.Page.commercialVCLossLabelCell(testData.useText)
                .should("contain.text", `${testData.comUseVCLossPercentage.toFixed(2)}%`);
        });

        it("QA-4604: Total cell", () => {
            Income._ProFormaActions.verifyCommercialUseVCLossTotal(testData.useText, testData.totalCommercialUseVCLoss);
        });

        it("QA-4605: PSF cell", () => {
            Income._ProFormaActions.verifyCommercialUseVCPerSF(testData.useText, testData.grossBuildingArea);
        });

        it("QA-4610: Per Unit cell", () => {
            Income._ProFormaActions
                .verifyCommercialUseVCLossPerUnit(testData.useText, testData.numberOfResidentialUnits);
        });
    });