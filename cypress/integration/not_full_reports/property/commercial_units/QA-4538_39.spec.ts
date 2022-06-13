import { numberWithCommas } from './../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4538_39.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-4538] Verify the Commercial Unit # SF field validation",
    { tags:[ "@property", "@commercial_units" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
        cy.stepInfo(`2. Verify the Commercial Unit # SF field is editable by entering 
                    any value (text field, whole numbers, but numbers greater than 999 
                    are automatically separated by a comma).`);
        _NavigationSection.navigateToCommercialUnits();
        testData.sfValues.forEach((value, index) => {
            Property._CommercialUnits.Page.commercialUnitsSFInputs.eq(index)
                .type(`${value}`)
                .should('have.value', `${numberWithCommas(value)}`);
        });

        cy.stepInfo(`3. Try to enter text / special symbols  -it's not allowed.`);
        Property._CommercialUnits.Page.commercialUnitsSFInputs.first()
            .clear()
            .type(testData.specialSymbols)
            .should('not.have.value');
        
        cy.stepInfo(`4. Try to copy-paste into the Commercial Unit # SF field.`);
        Property._CommercialUnits.emulateCopyPaste(
            Property._CommercialUnits.Page.commercialUnitsSFInputs.first(), testData.copyPasteValue);
        Property._CommercialUnits.Page.commercialUnitsSFInputs.first().should('have.value', testData.copyPasteValue);

        cy.stepInfo(`5. Verify the long values and save - the page shouldn't crush.`);
        Property._CommercialUnits.Page.commercialUnitsSFInputs.first()
            .clear()
            .type(testData.longValue)
            .should('have.value', `${numberWithCommas(testData.longValue)}`);

        cy.stepInfo(`6. Try to leave an empty Commercial Unit # SF field - no validation, the page can be saved.`);
        Property._CommercialUnits.Page.commercialUnitsSFInputs.first()
            .clear()
            .should('not.have.value');
        Property._CommercialUnits.clickSaveButton()
            .verifyProgressBarNotExist();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});