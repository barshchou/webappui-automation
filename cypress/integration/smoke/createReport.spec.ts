import { _DataCollectionsTitles } from './../../enums/pages_titles/index';
import { createReport } from "../../actions/base/baseTest.actions";
import tesData from "../../fixtures/smoke/createReport.fixture";
import { Base, DataCollections, Sales } from "../../actions";
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
        DataCollections._SubjectPropertyData
            .Page.pageTitle.should("exist").and("have.text", _DataCollectionsTitles.subjectPropertyData);
        DataCollections._SubjectPropertyData.Page.Header.should("contain.text", headerToContain);
        Base._NavigationSection.navigateToFindComps()
            .verifyProgressBarNotExist();
        Sales._FindComps.zoomInAndResetFilters(4)
            .selectCompFromMap();
    });
});