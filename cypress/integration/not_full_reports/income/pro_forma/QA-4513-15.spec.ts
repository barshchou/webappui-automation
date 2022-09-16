import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4513-15.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";

describe("Potential Other Income", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo("2. Go to Income → Miscellaneous → Other and fill in all necessary values"); 
            _NavigationSection.navigateToOther();
            Income._MiscellaneousManager.Other.addOtherIncome(testData.otherIncomeItem);
        
            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4513]", () => {
            cy.stepInfo(`5 Verify that Pro Forma table contains Other Income Total value`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.otherIncomeItem.annualAmount))}`, 
                testData.otherIncomeItem.incomeCategory);

            cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income → 
                    table → Other Income`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(
                testData.otherIncomeItem.incomeCategory.toLocaleLowerCase(), 
                `$${numberWithCommas(testData.otherIncomeItem.annualAmount.toFixed(2))}`);
        });

        it("[QA-4514]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Other Income PSF value`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.annualIncomePerSf.toFixed(2))}`, 
                testData.otherIncomeItem.incomeCategory);
        });

        it("[QA-4515]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Other Income Per Unit value`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.annualIncomePerUnit))}`, 
                testData.otherIncomeItem.incomeCategory);
        });
    });