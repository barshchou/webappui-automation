import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4343&46.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { Final } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Save and Save & Continue buttons tests", () => {
    beforeEach("Login, open sales value conclusion and make changes", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.checkMatchIncomeApproachDeductionsCheckbox()
            .enterSaleValueConclusion(testData.saleValueConclusion);
    });

    it("QA-4343: Save button test", () => {
        Sales.ValueConclusion.clickSaveButton();
        cy.reload();
        Sales.ValueConclusion.verifyMatchIncomeApproachDeductionsChecked()
            .verifySaleValueConclusion(testData.saleValueConclusion);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4346 Save & Continue button test", () => {
        Sales.ValueConclusion.clickSaveContinueButton();
        Final._FinalValuesReconciliation.closeSatisfactionSurvey()
            .goBackWithSave();
        Sales.ValueConclusion.verifyMatchIncomeApproachDeductionsChecked()
            .verifySaleValueConclusion(testData.saleValueConclusion);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});