import { Income, Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import testData from '../../../../fixtures/not_full_reports/property/amenities/QA-4662_64-65_67-71_73.fixture';

describe("Verify the display of the Amenities page", { tags:[ "@property", "@amenities" ] }, () => {

    beforeEach("Restore local storage", () => {
        cy.stepInfo("Login, create report");
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Proceed to the Property > Amenities page.");
        _NavigationSection.navigateToPropertyAmenities();
    });

    it("[QA-4662-64]", () => {
        cy.stepInfo("2. Verify the following elements are displayed on the page by default");
        testData.withoutAdditionalCheckboxes.forEach(name => {
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
        Property._Amenities.uploadImageByName(testData.laundryRoom, testData.imagePath);

        cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
        Property._Amenities.rotateImageByName(testData.laundryRoom);

        cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
        Property._Amenities.removeImageByName(testData.laundryRoom);
    });

    it("[QA-4667]", () => {
        cy.stepInfo("2. Check Storage Units checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasStorageUnits);

        cy.stepInfo("3. Verify not valid of Storage Units field");
        Property._Amenities.enterAmenitiesInput("storageUnitCount", 1000, testData.storageValueMore)
            .enterAmenitiesInput("storageUnitCount", 1000, testData.testValue);

        cy.stepInfo("4. Verify valid value entered in the Number of Storage Units field");
        Property._Amenities.enterAmenitiesInput("storageUnitCount", 1000, testData.storageValue)
            .verifyProgressBarNotExist();

        cy.stepInfo("5. Proceed to the Property > Amenities page and verify generated comment");
        _NavigationSection.navigateToStorage();
        Income._MiscellaneousManager.Storage.Page.generatedCommentaryText(
            testData.generatedCommentName.storageIncomeDiscussion)
            .should("include.text", `${testData.storageValue} storage units`);
    });

    it("[QA-4668]", () => {
        cy.stepInfo("2. Check Storage Units checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasParking);

        cy.stepInfo("3. Upload photo");
        Property._Amenities.uploadImageByName(testData.parking, testData.imagePath);

        cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
        Property._Amenities.rotateImageByName(testData.parking);

        cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
        Property._Amenities.removeImageByName(testData.parking);
        
        cy.stepInfo("6. Verify not valid of Parking Spaces field");
        Property._Amenities.enterAmenitiesInput("parkingSpaceCount", 2500, testData.parkingValueMore)
            .enterAmenitiesInput("parkingSpaceCount", 2500, testData.testValue);

        cy.stepInfo("7. Verify valid value entered in the Number of Storage Units field");
        Property._Amenities.enterAmenitiesInput("parkingSpaceCount", 2500, testData.parkingValue)
            .verifyProgressBarNotExist();

        cy.stepInfo("8. Proceed to the Property > Parking page and verify that the value entered");
        _NavigationSection.navigateToParking();
        Income._MiscellaneousManager.Parking.Page.parkingTable.children().then(elems => {
            expect(elems.length).to.eq( testData.parkingValue);
        });
        Income._MiscellaneousManager.Parking.Page.generatedCommentaryText(
            testData.generatedCommentName.parkingIncomeDiscussion)
            .should("include.text", `${testData.parkingValue} parking spaces`);
    });

    it("[QA-4669]", () => {
        cy.stepInfo("2. Check Shared Outdoor Space checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasOutdoorSpace);

        cy.stepInfo("3. Upload photo");
        Property._Amenities.uploadImageByName(testData.outdoorSpace, testData.imagePath);

        cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
        Property._Amenities.rotateImageByName(testData.outdoorSpace);

        cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
        Property._Amenities.removeImageByName(testData.outdoorSpace);

        cy.stepInfo(`6. Check the Tennis Courts, Shared Garden, 
                    Shared Roof Deck, Shared Terrace, Shared Backyard checkboxes`);
        testData.sharedOutdoorSpaceCheckboxes.forEach(name => {
            Property._Amenities.checkCheckboxByName(name);
        });

        cy.stepInfo("7. Verify not valid of Shared Outdoor Space field");
        Property._Amenities.Page.getAmenitiesInput(testData.otherOutdoorSpace).clear().blur();
        cy.contains("Required").should("exist");
    });

    it("[QA-4670]", () => {
        cy.stepInfo("2. Check Doorman checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasDoorman);

        cy.stepInfo("3. Check the Virtual, Part-Time, 24/7, Other radio buttons");
        testData.doormanRadios.forEach(radio => {
            Property._Amenities.Page.getDoormanRadio(radio).click().should("be.checked");
        });

        cy.stepInfo("4. Verify not valid of Shared Outdoor Space field");
        Property._Amenities.Page.getAmenitiesInput(testData.otherDoorman).clear().blur();
        cy.contains("Required").should("exist");
        Property._Amenities.Page.getAmenitiesInput(testData.otherDoorman).type(testData.testValue)
            .should("have.value", testData.testValue);
    });

    it("[QA-4671]", () => {
        cy.stepInfo("2. Check Bike Room checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasBikeRoom);

        cy.stepInfo("3. Upload photo");
        Property._Amenities.uploadImageByName(testData.bikeRoom, testData.imagePath);

        cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
        Property._Amenities.rotateImageByName(testData.bikeRoom);

        cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
        Property._Amenities.removeImageByName(testData.bikeRoom);
    });

    it("[QA-4673]", () => {
        cy.stepInfo("2. Check Fitness Center checkbox");
        Property._Amenities.checkCheckboxByName(Enums.AMENITIES_CHECKBOXES.hasGym);

        cy.stepInfo("3. Upload photo");
        Property._Amenities.uploadImageByName(testData.gym, testData.imagePath);

        cy.stepInfo("4. Verify functionality of the Rotate button on the uploaded photo");
        Property._Amenities.rotateImageByName(testData.gym);

        cy.stepInfo("5. Verify functionality of the Delete button on the uploaded photo");
        Property._Amenities.removeImageByName(testData.gym);
    });
});