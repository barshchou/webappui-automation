import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4556-57.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions"; 

/*
 *  [QA-6587] Add data-qa to Property -> Commercial Units -> Upload Image section
 *  Skipped until data-qa attributes will be added
 */
describe.skip("Verify the functionality of the Image upload to the Interior and Exterior Images sections",
    { tags:[ "@property", "@commercial_units" ] },  () => {
        
        beforeEach("Login, create report", () => {
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
            testData.imagesType.forEach((images, index) => {
                cy.stepInfo(`# Verify that several images can be uploaded to the ${images}.`);
                testData.inputType.forEach(inputMethod => {
                    cy.stepInfo(`2. Verify the image can be uploaded by ${inputMethod} in ${images}.`);
                    Property._CommercialUnits.Actions
                        .uploadImages(images, testData.imageFile, inputMethod)
                        .verifyProgressBarNotExist();

                    cy.stepInfo(`# Verify the uploaded image can be rotated.`);
                    testData.imageRotations.forEach(rotateIndex => {
                        Property._CommercialUnits
                            .Actions.rotateImage()
                            .verifyProgressBarNotExist()
                            .verifyImageHasRotated(rotateIndex);
                    });
                });
                Property._CommercialUnits
                    .Page.iconDeleteImage.last().click({ force:true });
                Property._CommercialUnits
                    .Page.commercialUnitImage.should("have.length", index + 1);
            });
        });
    });