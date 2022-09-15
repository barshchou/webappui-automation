import testData from "../../../../fixtures/not_full_reports/property/summary/QA-6444-45.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("Edit Data button and redirects to Data Collection > Subject Property Data",
    { tags: [ "@property", "@market" ] }, () => {
    
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => cy.restoreLocalStorage());

        testData.sections.forEach(section => {
            it(`${section.specName}`, () => {
                cy.stepInfo("1. Navigate to Property -> Summary");
                _NavigationSection.navigateToPropertySummary();
    
                cy.stepInfo("2. Click on Edit Data button");
                Property._Summary.clickEditDataBySectionName(section.sectionName);
                _NavigationSection.submitSaveChangesModal();
    
                cy.stepInfo(`3. Verify user redirects to ${section.route}`);
                _NavigationSection.waitForUrl(section.route);
            });
        });
    });
