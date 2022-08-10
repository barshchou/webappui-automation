import testData from "../../../../fixtures/not_full_reports/income/expense_history/QA-5950_51.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import Enums from "../../../../enums/enums";
import { Income, Property } from "../../../../actions";

describe(`Expense History Discussion for reports is generated correctly according to 
selected Basis for Square Foot Analysis`, { tags: [ "@income", "@expense_history" ] }, () => {

    Object.values(Enums.INCOME_TYPE).forEach(incomeType => {
        it(`Test with ${incomeType} income type report`, () => {
            createReport(testData.reportCreationData(incomeType));
            const isCommercial = incomeType === Enums.INCOME_TYPE.commercial;
            const basisTexts = Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS_TEXTS);
            Object.values(Enums.BASIS_SQUARE_FOOT_ANALYSIS).forEach((basis, index) => {
                _NavigationSection.navigateToPropertySummary();
                Property._Summary.selectBasisSquareFootAnalysis(basis);
                if (basis !== Enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                    Property._Summary.fillBasisSquareFootAnalysis(testData.basisArea);
                }
                _NavigationSection.navigateToExpenseHistory();
                Object.values(Enums.EXPENSE_DATA_PROVIDER).forEach(provider => {
                    Income._ExpenseHistory.checkDataProviderOption(provider);
                    const textToBe = provider !== Enums.EXPENSE_DATA_PROVIDER.notProvided ?
                        testData.getDataProvidedComm(provider, basisTexts[index], isCommercial) :
                        testData.getDataNotProvidedComm(basisTexts[index], isCommercial);
                    Income._ExpenseHistory.verifyExpenseHistoryDiscussionText(textToBe);
                });
            });
        });
    });
});