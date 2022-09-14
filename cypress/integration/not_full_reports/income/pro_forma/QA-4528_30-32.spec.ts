import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4528_30-32.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";

describe("Residential V/C Loss @ X% row", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Add residential units and enter GBA");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);

            cy.stepInfo(`2. Go to Income → Residential → In-Place Rent Roll and fill 
            in all necessary values to the table`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
                .enterAllEqualLeaseStatuses(testData.leaseStatus)
                .enterAllEqualMonthlyRents(testData.monthlyRent);

            cy.stepInfo(`3. Go to Income → Potential Gross Income → Residential Vacancy and Collection Loss table 
            and fill in the value into the Residential Vacancy and Collection Loss cell`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.enterResVacancyCollLoss(testData.resVacancyCollectionLoss);

            cy.stepInfo(`4. Go to Income → Pro Forma page.
            Verify that label has format Less Residential V/C Loss @ X%.
            Verify that Total value is taken from Potential Gross Income → table → Less Residential V/C Loss @ X% → $
            Verify that PSF value is calculated by the formula: Total / GBA
            Verify that Per Unit value is calculated by the formula: Total / # of Residential Units`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions
                .verifyResidentialVCLossLabel(testData.residential, testData.resVacancyCollectionLoss)
                .verifyResidentialVCLossTotal(testData.residential, testData.resVCLossTotal)
                .verifyResidentialVCLossPerSF(testData.residential, testData.grossBuildingArea)
                .verifyResidentialVCLossPerUnit(testData.residential, testData.numberOfUnits);
        });
    });