import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-5998-99_6012.fixture";
import { conditionalDescribe } from "../../../checkIsProd.utils";

conditionalDescribe("Add Appraiser / Inspector button functionality", 
    { tags:[ "@report_status", "@report", "@appraiser" ] }, () => {

        before("Create a report", () => {
            cy.stepInfo("Precondition: Create report");
            createReport(testData.reportCreationData);
        });

        it("[QA-5998-99_6012]", () => {
            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo("2. Add Appraiser and External Inspector");
            Report._Appraiser.searchAndAddAppraiser(testData.appraiserName)
                .searchAndAddExternalInspector(testData.inspectorName);
            
            cy.stepInfo(`3. Verify that Bowery Appraiser/Inspector and External Inspector were added to 
                        Appraisers table`);
            Report._Appraiser.verifySignCheckbox(testData.appraiserName, true)
                .verifySignCheckbox(testData.inspectorName, false);

            cy.stepInfo("4. Try to add wrong Bowery Appraiser / Inspector");
            Report._Appraiser.Page.btnAddAppraiserInspector.click();
            Report._Appraiser.Page.searchAppraiserTextField.clear()
                .type(testData.inspectorName).should('have.value', testData.inspectorName);
            cy.xpath("//*[@data-qa='addAppraiserInspectorModal']/following::*[@role='presentation'][1]")
                .should("have.text", testData.validationText);
        });
    
    });