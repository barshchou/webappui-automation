/// <reference types="cypress-file-upload" />

import testData from "../../../../fixtures/not_full_reports/property/summary/QA-4556.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("Verify the functionality of the Frontage radio button", () => {
    before("Login, create report", () => {
        cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        _NavigationSection.navigateToCommercialUnits();
    });

    it("Test body", () => {
        cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
        _NavigationSection.navigateToCommercialUnits().verifyProgressBarNotExist();

        
        cy.stepInfo(`2. Verify the image can be uploaded by drag and drop.`);
        cy.contains('Interior Images').next().find('input[type="file"]')
        .attachFile("/full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos/exterior_entrance_1.png",
        {subjectType:"drag-n-drop"}
        );
        Property._CommercialUnits.Actions.verifyProgressBarNotExist();
        cy.contains('Interior Images').next().find('input[type="file"]')
        .attachFile("/full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos/exterior_entrance_2.png",
        {subjectType:"input"}
        );
        Property._CommercialUnits.Actions.verifyProgressBarNotExist();
        cy.pause();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});