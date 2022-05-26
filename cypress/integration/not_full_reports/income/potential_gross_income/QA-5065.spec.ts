import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/potential_gross_income/QA-5065.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property, Income } from "../../../../actions";

describe("[Income > Potential Gross Income]Support combined utility expense reimbursements", 
    { tags:[ "@income", "@potential_gross_income" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Navigate to Property -> Summary and Property -> Commercial Units 
                    and verify that all needed info about commercial units is filled`);
        
        _NavigationSection.navigateToPropertySummary();
        Property._Summary
            .enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfCommercialUnits(testData.buildingDescription.numberOfUnits);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterUnitSFByUnitIndex(testData.squareFeet);

        cy.stepInfo(`2. Navigate to Income -> Expence History and verify that Combined Electricity, 
                    Fuel, Water & Sewer is chosen for Utility Expenses`);
        _NavigationSection.navigateToExpenseHistory();
        Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.utiliesExpenseOption);

        cy.stepInfo(`3. Navigate to Income -> Commercial -> Reimbursement Summary, create new expense 
                    reimburcement for Utilities and verify that all needed info is filled`);
        _NavigationSection.navigateToCommercialReimbursementSummary();
        Income._CommercialManager.ReimbursementSummary
            .addNewCommercialReimbursement(
                testData.expenseType,
                testData.expenseCellName,
                testData.reimbursementType,
                testData.knownInformation)
            .fillReimbursementsByRow(
                testData.reimbursementValue,
                0,
                testData.knownInformation.toLowerCase())
            .fillVCLossByRow(testData.vcLossPercentage);

        cy.stepInfo(`4. Navigate to Income -> Potential Gross Income and 
                    verify Combined Utilities expense reimburcement info`);
        
        const lessVCLossValue = testData.reimbursementValue * (testData.vcLossPercentage / 100);

        _NavigationSection.navigateToPotentialGrossIncome();
        Income._PotentialGrossIncome
            .verifyCommercialVCLossCommentaryContain(testData.vcLossDiscussionCommentary)
            .verifyPotentialReimbursementValue(testData.expenseType, `$${numberWithCommas(testData.reimbursementValue.toFixed(2))}`)
            .verifyPotentialGrossIncomeValue(`$${numberWithCommas(testData.reimbursementValue.toFixed(2))}`)
            .verifyLessReimbursementVCLossValue(testData.expenseType, `-$${numberWithCommas(lessVCLossValue.toFixed(2))}`);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});