import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4035.fixture';

describe(`Verify that the Client field is pre-filled on the WebApp with the date corresponding to the 
        Client Contact for that job in SalesForce.`, { tags:[ "@report", "@client" ] }, () => {
    beforeEach("Login, create report", () => {
        cy.stepInfo(`1. Create a new report on the WebApp (Note: the JOB # of that report corresponds
                    with the JOB # of an open job on SalesForce)`);
        createReport(testData.reportCreationData);
    });

    it("[QA-4035]", () => {
        cy.stepInfo("2. Navigate to the Report > Client page.");
        _NavigationSection.navigateToClientPage();
    });
});