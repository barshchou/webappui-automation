import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-4421.fixture";

describe(`Verify that the Lead Appraisers are sorted alphabetically by the Last name in the Full Name dropdown 
        of the Lead Appraiser`, { tags: [ "@report", "@appraiser" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportData);
    });
            
    it("[QA-4421]", () => {
        cy.stepInfo("1. Navigate to Report -> Appraiser page");
        _NavigationSection.navigateToReportAppraiser();

        cy.stepInfo("2. Get appraisers list and verify Lead Appraisers are sorted alphabetically");
        Report._Appraiser.Page.leadAppraiser.click();
        Report._Appraiser.Page.appraisersList.then(elems => {
            const lastNamesAppraisers = [];
            elems.each((index, elem) => {
                lastNamesAppraisers.push(elem.innerText.split(" ")[1]);
            });
            expect(lastNamesAppraisers).to.deep.eq(lastNamesAppraisers.sort());
        });
    });
});