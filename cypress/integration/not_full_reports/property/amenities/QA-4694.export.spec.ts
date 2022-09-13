import { Property, ReviewExport } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from "../../../../fixtures/not_full_reports/property/amenities/QA-4694.fixture";

describe("Verify the fields of the Amenities page", { tags:[ "@property", "@amenities", "@check_export" ] }, () => {
    it("[QA-4694]", () => {
        cy.stepInfo("1. Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("2. Proceed to the Property > Amenities page.");
        _NavigationSection.navigateToPropertyAmenities();

        cy.stepInfo("3. Check all checkboxes");
        testData.withoutAdditionalCheckboxes.forEach(name => {
            Property._Amenities.checkCheckboxByName(name);
        });

        cy.stepInfo("4. Upload photo in all section");
        testData.allUploadInputs.forEach(name => {
            Property._Amenities.uploadImageByName(name, testData.imagePath);
        });

        cy.stepInfo("5. Fill all inputs");
        testData.unitInputs.forEach(name => {
            Property._Amenities.enterAmenitiesInput(name, testData.enterValue);
        });

        testData.buildingInputs.forEach(name => {
            Property._Amenities.enterAmenitiesValidationInput(name, 2500, testData.numberValue);
        });

        cy.stepInfo("6. Check additional checkboxes and enter other input");
        testData.sharedOutdoorSpaceCheckboxes.forEach(name => {
            Property._Amenities.checkCheckboxByName(name);
        });

        Property._Amenities.enterAmenitiesInput(testData.otherOutdoorSpace, testData.enterValue)
            .Page.getDoormanRadio(testData.doormanRadio).click().should("be.checked");

        cy.stepInfo("7. Export report");
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
    });

    it(`Check export`, () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);
                cy.stepInfo("8. Verify filled values in report");
                cy.contains("Building Amenities").next().scrollIntoView().should("include.text", testData.enterValue)
                    .and("include.text", `There are ${testData.numberValue}`);
                cy.contains("Unit Amenities").next().scrollIntoView().should("include.text", testData.enterValue);
                cy.contains("Subject Property Photos").next().next().scrollIntoView().find("img").then(el => {
                    cy.contains("Subject Property Photos").next().next().next().find("img").then(elems => {
                        expect(el.length + elems.length).to.eq(testData.allUploadInputs.length);
                    });
                });
            });
    });
});