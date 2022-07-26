import { _NavigationSection } from './../../../../actions/base/index';
import { createReport } from './../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4465.fixture";

describe('[QA-4291] Check the Introduction page', 
    { tags:[ "@preview_edit", "@introduction" ] }, () => {
        
        before("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`2. Proceed to the Introduction page`);
            _NavigationSection.navigateToIntroduction()
                .Page.introduction.should("exist");
        });
    });
