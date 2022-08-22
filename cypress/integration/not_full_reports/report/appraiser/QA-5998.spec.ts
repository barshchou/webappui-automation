import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-5998.fixture";
import { conditionalDescribe } from "../../../checkIsProd.utils";

conditionalDescribe("Verify that 'Sign Report' checkbox for different user roles", 
    { tags:[ "@report_status", "@report", "@appraiser" ] }, () => {

        before("Create a report", () => {
            cy.stepInfo("Precondition: Create report with Admin user");
            createReport(testData.reportCreationData);
        });

        it("[QA-5998]", () => {
            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo("2. Add External Inspector");
            Report._Appraiser.searchAndAddExternalInspector(testData.inspectorName);
            
            cy.stepInfo("3. Verify that Bowery Appraiser/Inspector was added to Appraisers table");
            Report._Appraiser.verifySignCheckbox(testData.inspectorName, false);
        });
    
    });