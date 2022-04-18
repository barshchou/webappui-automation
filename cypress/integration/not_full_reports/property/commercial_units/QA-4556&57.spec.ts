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
        testData.imagesType.forEach((images,index) => {
            cy.stepInfo(`# Verify that several images can be uploaded to the ${images}.`);
            testData.inputType.forEach(inputMethod => {
                Property._CommercialUnits.Actions
                .uploadImages(<any>images,testData.imageFile,<any>inputMethod);

                cy.stepInfo(`2. Verify the image can be uploaded by ${inputMethod} in ${images}.`);
                Property._CommercialUnits
                .Actions.verifyProgressBarNotExist();

                cy.stepInfo(`# Verify the uploaded image can be rotated.`);
                testData.imageRotations.forEach(rotateIndex => {
                    Property._CommercialUnits
                    .Actions.rotateImage().verifyImageHasRotated(rotateIndex);
                });
                
            });
            Property._CommercialUnits
            .Page.iconDeleteImage.last().click({force:true});
            Property._CommercialUnits
            .Page.commercialUnitImage.should("have.length",index+1);
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});