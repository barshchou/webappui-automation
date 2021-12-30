import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4343&46.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import Final from "../../../../actions/final/final.manager";

describe("Save and Save & Continue buttons tests", () => {
    beforeEach("Login, open sales value conclusion and make changes", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.checkMatchIncomeApproachDeductionsCheckbox()
            .enterSaleValueConclusion(testData.saleValueConclusion);
    });

    it("QA-4343: Save button test", () => {
        Sales.ValueConclusion.clickSaveButton();
        cy.reload();
        Sales.ValueConclusion.verifyMatchIncomeApproachDeductionsChecked()
            .verifySaleValueConclusion(testData.saleValueConclusion);
        deleteReport();
    });

    it("QA-4346 Save & Continue button test", () => {
        Sales.ValueConclusion.clickSaveContinueButton();
        Final.FinalValuesReconciliation.closeSatisfactionSurvey()
            .goBackWithSave();
        Sales.ValueConclusion.verifyMatchIncomeApproachDeductionsChecked()
            .verifySaleValueConclusion(testData.saleValueConclusion);
        deleteReport();
    });

    const deleteReport = () => {
        Sales.ValueConclusion.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    };
});