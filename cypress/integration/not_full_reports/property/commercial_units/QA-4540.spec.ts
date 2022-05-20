/// <reference types="cypress-grep" />

import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4540.fixture";
import { Base, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Tag } from "../../../../utils/tags.utils";


describe("Verify the functionality of the Ceiling Height radio button", 
    { tags:[ Tag.property, Tag.commercial_units ] }, () => {

    before("Login, create report", () => {

        cy.stepInfo(` 1. Report creation and several commercial units addition`);
        createReport(testData.reportCreationData);
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
    });

    it("Test body", () => {

        cy.stepInfo("2.  Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("3.  Verify that the Commercial Gross Leasable Area field is disabled.");
        Property._CommercialUnits.verifyCommercialGrossLeasableAreaFieldIsDisabled();

        cy.stepInfo("4.  Verify that the Commercial Gross Leasable Area field is the calculated sum of the Commercial Unit SF above it.");
        Property._CommercialUnits.enterListUnitSF(testData.squareFeetList, testData.numberOfCommercialUnits)
            .verifyCommercialGrossLeasableAreaEqualSumUnitSF(testData.squareFeetList);

        deleteReport(testData.reportCreationData.reportNumber);

    });
});