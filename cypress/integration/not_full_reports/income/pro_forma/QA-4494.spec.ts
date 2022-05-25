import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4494.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
//import enums from "../../../../enums/enums";
import { Tag } from "../../../../utils/tags.utils";

describe("", 
    { tags:[ Tag.income, Tag.pro_forma ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4494] Verify table with the following columns: Income, Total, PSF, Per Unit", () => {

        cy.stepInfo("1. Go to Income -> Pro Forma page and verify that the table contains Income, Total, PSF, Per Unit columns");
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.Page.columnHeaderIncome.should('exist');
        Income._ProFormaActions.Page.columnHeaderTotal.should('exist');
        Income._ProFormaActions.Page.columnHeaderPSF.should('exist');
        Income._ProFormaActions.Page.columnHeaderPerUnit.should('exist');
         
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("[QA-4495]", () => {

        cy.stepInfo("1. Go to Income -> Pro Forma page and verify that the table contains Income, Total, PSF, Per Unit columns");
        _NavigationSection.navigateToProForma();
     
         
        deleteReport(testData.reportCreationData.reportNumber);
    });


});