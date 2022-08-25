import { Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import testData from '../../../../fixtures/not_full_reports/property/amenities/QA-4662_64-65_67.fixture';

describe("Verify the display of the Amenities page", { tags:[ "@property", "@amenities" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });

    beforeEach("Restore local storage", () => {
        cy.restoreLocalStorage();

        cy.stepInfo("1. Proceed to the Property > Amenities page.");
        _NavigationSection.navigateToPropertyAmenities();
    });

    it("[QA-4662-64]", () => {
        cy.stepInfo("2. Verify the following elements are displayed on the page by default");
        testData.allCheckboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("exist");
        });

        cy.stepInfo("3. Check The subject property has no building amenities and verify not exist checkboxes");
        Property._Amenities.checkHasNoBuildingAmenities();
        testData.buildingCheckboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("not.exist");
        });
        Property._Amenities.checkHasNoBuildingAmenities(false);

        cy.stepInfo("4. Check The subject property has no unit amenities and verify not exist checkboxes");
        Property._Amenities.checkHasNoUnitAmenities();
        testData.unitCheckboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("not.exist");
        });
        Property._Amenities.checkHasNoUnitAmenities(false);
    });

    it("[QA-4665]", () => {
        cy.stepInfo("2. Check Laundry Room checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasLaundryRoom);

        cy.stepInfo("3. Upload photo");
        Property._Amenities.uploadLaundryRoomImage(testData.imagePath);

        cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
        Property._Amenities.rotateLaundryRoomImage();

        cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
        Property._Amenities.deleteLaundryRoomImage()
            .checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasLaundryRoom, false);
    });

    it("[QA-4667]", () => {
        cy.stepInfo("2. Check Storage Units checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasStorageUnits)
            .verifyProgressBarNotExist();

        cy.stepInfo("3. Verify that only numeric values can be entered in the Number of Storage Units field");
        Property._Amenities.enterStoreInput(testData.storageValue)
            .enterStoreInput(testData.testValue);

        cy.stepInfo("4. Verify that only numeric values can be entered in the Number of Storage Units field");
        Property._Amenities.enterStoreInput(testData.storageValueMore)
            .checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasStorageUnits, false);
    });
});