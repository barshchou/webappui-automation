import { Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/property/amenities/QA-4686-93.fixture';

describe("Verify the fields of the Amenities page", { tags:[ "@property", "@amenities" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.saveLocalStorage();
    });

    beforeEach("Login, create report", () => {
        cy.restoreLocalStorage();
        cy.stepInfo("1. Proceed to the Property > Amenities page");
        _NavigationSection.navigateToPropertyAmenities();
    });

    testData.inputs.forEach(val => {
        it(`${val.specName}`, () => {
            cy.stepInfo(`2. Check ${val.checkboxName} checkbox`);
            Property._Amenities.checkCheckboxByName(val.checkboxName);
    
            cy.stepInfo("3. Verify enter value in input");
            Property._Amenities.enterAmenitiesInput(val.inputName, testData.enterValue);

            cy.stepInfo(`4. Uncheck ${val.checkboxName} checkbox`);
            Property._Amenities.checkCheckboxByName(val.checkboxName, false);
        });
    });
});