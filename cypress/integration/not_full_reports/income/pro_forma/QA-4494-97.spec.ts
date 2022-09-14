import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4494-97.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import Enums from "../../../../enums/income/incomeTypesCellNames.enum";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import { numberWithCommas } from '../../../../../utils/numbers.utils';

describe("[QA-4494] [QA-4495] [QA-4496] [QA-4497] [Income -> Pro Forma] Potential Residential Income ",
    { tags: [ '@income', '@pro_forma' ] }, () => {
        before("Preconditions", () => {
            cy.stepInfo(`1. Login, create report.`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Go to Property → Summary and add residential units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.resUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);

            cy.stepInfo(`3. Go to Income → Residential → In-Place Rent Roll 
            and fill in all necessary values to the table`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterMonthlyRents(testData.monthlyRent);

            cy.saveLocalStorage();
        });

        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
        });

        it("[QA-4494] Verify table with the following columns: Income, Total, PSF, Per Unit", () => {
            cy.stepInfo(`1. Go to Income -> Pro Forma page and verify that 
            the table contains Income, Total, PSF, Per Unit columns`);
            _NavigationSection.navigateToProForma();
            testData.columnName.forEach(columnName => {
                Income._ProFormaActions.Page.columnHeaderItem(columnName).should('exist');
            });
        });

        it(`[QA-4495] Potential Residential Income >Total [taken from Income>Potential Gross Income -> 
                calculated on Stabilized Rent Roll Summary page] (is rounded)`, () => {
            cy.stepInfo(`1. Go to Income → Pro Forma page. Verify that value in the Potential Residential Income ->
                Total is taken from Income → Potential Gross Income → table → Potential Residential Income → $`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(Enums.potentialResidentialIncome, 
                `$${numberWithCommas(testData.annualTotalRent.toFixed(2))}`);
        });

        it("[QA-4496] [Income -> Pro Forma] Potential Residential Income -> PSF", () => {
            cy.stepInfo(`1. Go to Income → Pro Forma page. 
            Verify that value in the Potential Residential Income → PSF is calculated by the formula: Total / GBA`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.totalPerSF.toFixed(2))}`,
                proFormaTypes.potentialResIncome);
        });

        it("[QA-4497] [Income -> Pro Forma] Potential Residential Income -> Per Unit", () => {
            cy.stepInfo(`1. Go to Income → Pro Forma page. Verify that value in the Potential Residential Income → 
            Per Unit is calculated by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(testData.totalPerUnit)}`,
                proFormaTypes.potentialResIncome);
        });
    });