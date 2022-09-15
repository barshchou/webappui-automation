import { createReport } from "../../actions/base/baseTest.actions";
import tesData from "../../fixtures/smoke/createReport.fixture";
import { Base, Report, Sales } from "../../actions";
import { _DataCollectionsTitles } from "../../enums/pages_titles";

Cypress.env("report", "ui");
Cypress.env("loginMethod", "ui");

describe("Create report test, open Find Comps, check if map is loaded", { tags: [ "@smoke" ] }, () => {

    before(() => {
        cy.task('dd:addTags', { 'before.each': 'certain.information' });
    });

    it("Test body", () => {
        cy.task('dd:addTags', { 'team.owner': 'ui' });
        cy.task('dd:addTags', { 'test.name': 'create report smoke test' });

        const headerToContain = tesData.reportCreationData.address.split(",")[0];
        createReport(tesData.reportCreationData);
        Report._KeyInfo.Page.pageTitle.should("exist").and("have.text", _DataCollectionsTitles.subjectPropertyData);
        Report._KeyInfo.Page.Header.should("contain.text", headerToContain);
        Base._NavigationSection.navigateToFindComps()
            .verifyProgressBarNotExist();
        Sales._FindComps.zoomInAndResetFilters(4)
            .selectCompFromMap();
    });
});