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

        cy.stepInfo(`
            # Verify the image can be uploaded by drag and drop.
            # Verify the image can be uploaded by clicking on the Exterior Images and selecting it.
            # Verify that several images can be uploaded to the Exterior Images.
            # Verify the uploaded image can be rotated.
        `);

        ["Interior Images", "Exterior Images"].forEach((images,index) => {
            cy.stepInfo(`# Verify that several images can be uploaded to the ${images}.`);
            ["drag-n-drop","input"].forEach(inputMethod => {
                cy.stepInfo(`2. Verify the image can be uploaded by ${inputMethod} in ${images}.`);
                cy.contains(images).next().find('input[type="file"]')
                .attachFile(
                "/full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos/exterior_entrance_1.png",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                {subjectType:inputMethod});
                Property._CommercialUnits.Actions.verifyProgressBarNotExist();

                cy.stepInfo(`# Verify the uploaded image can be rotated.`);
                cy.get('[data-icon="retweet"]').last().click({force:true});
                cy.get('h6 + div > [role="img"]').last().invoke("attr","style").then(style => {
                    expect(style).includes("w_256,a_90");
                });
            });
            cy.get('[data-icon="trash-alt"]').last().click({force:true});
            cy.get('h6 + div > [role="img"]').should("have.length",index+1);
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});