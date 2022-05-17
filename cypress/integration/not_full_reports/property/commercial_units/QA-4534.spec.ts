import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4534.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-4534] Verify the functionality of the link to the Property > Summary page",
    { tags:[ Tag.property, Tag.commercial_units ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
        
        cy.stepInfo("2. Hover the arrows near No. of Commercial Units label.");
        Property._CommercialUnits.Page.iconExchangeComUnits.trigger("mouseover");

        cy.stepInfo("3. Verify the following text is displayed: \"Go To Property Summary\".");
        Property._CommercialUnits.Page.iconExchangeTooltip.should("be.visible");

        cy.stepInfo("4. Click on the arrows.");
        Property._CommercialUnits.Page.iconExchangeComUnits.click();
        Property._CommercialUnits.clickYesButton();

        cy.stepInfo("5. Verify that the Property > Summary page is displayed.");
        Property._Summary.Page.headerSection.should("be.visible");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});