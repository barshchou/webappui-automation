import { Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from 
    "../../../../fixtures/not_full_reports/property/amenities/QA-4665_71_73_76_81_82_6740-41_47.fixture";

describe("Verify the display of the Amenities page", { tags:[ "@property", "@amenities" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });

    beforeEach("Login, create report", () => {
        cy.restoreLocalStorage();
        cy.stepInfo("1. Proceed to the Property > Amenities page");
        _NavigationSection.navigateToPropertyAmenities();
    });

    testData.uploadValues.forEach(val => {
        it(`${val.specName}`, () => {
            cy.stepInfo(`2. Check ${val.checkboxName} checkbox`);
            Property._Amenities.checkCheckboxByName(val.checkboxName);
    
            cy.stepInfo("3. Upload photo");
            Property._Amenities.uploadImageByName(val.uploadName, testData.imagePath);
    
            cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
            Property._Amenities.rotateImageByName(val.uploadName);
    
            cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
            Property._Amenities.removeImageByName(val.uploadName);

            cy.stepInfo(`6. Uncheck ${val.checkboxName} checkbox`);
            Property._Amenities.checkCheckboxByName(val.checkboxName, false);
        });
    });
});