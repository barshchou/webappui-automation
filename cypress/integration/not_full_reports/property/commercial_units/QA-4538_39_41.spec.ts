import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4538_39_41.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[Property > Commercial Units > Commercial Unit SF] Commercial Units page validation tests",
    { tags:[ "@property", "@commercial_units" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();

            cy.saveLocalStorage();
        });

        beforeEach('Restore local storage', () => {
            cy.restoreLocalStorage();
        });

        it("[QA-4538] Verify the Commercial Unit # SF field validation", () => {
            cy.stepInfo(`2. Verify the Commercial Unit # SF field is editable by entering 
                    any value (text field, whole numbers, but numbers greater than 999 
                    are automatically separated by a comma).`);
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
            Property._CommercialUnits.Page.commercialUnitsSFInputs.first()
                .should('have.value', testData.copyPasteValue);

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
        });

        it('[QA-4539] Verify the Commercial Gross Leasable Area tooltip', () => {
            cy.stepInfo(`2. Hover the Commercial Gross Leasable Area tooltip.`);
            Property._CommercialUnits.Page.commercialGrossLeasableAreaTooltip
                .trigger('mouseover');

            cy.stepInfo(`3. Verify the following text is displayed: 
                    "This value will be deducted from the GBA to determine the Residential Gross Leasable Area."`);
            Property._CommercialUnits.Page.tooltip
                .invoke("text").then(text => {
                    expect(text).to.be.equal(testData.grossLeasableAreaTooltipText);
                });

            cy.stepInfo(`4. Move hover from the icon and verify that tooltip isn't shown`);
            Property._CommercialUnits.Page.commercialGrossLeasableAreaTooltip
                .trigger('mouseout');
            Property._CommercialUnits.Page.tooltip.should('not.exist');
        });

        it('[QA-4541] Verify the Commercial Unit SF Discussion tooltip', () => {
            cy.stepInfo(`2. Hover the Commercial Unit SF Discussion tooltip.`);
            Property._CommercialUnits.Page.commercialUnitSfDiscussionTooltip
                .trigger('mouseover');
        
            cy.stepInfo(`3. Verify the following text is displayed: 
                    "The following generated text will appear in the Description of Improvements of your report.`);
            Property._CommercialUnits.Page.tooltip
                .invoke("text").then(text => {
                    expect(text).to.be.equal(testData.commercialUnitSFDiscussionTooltipText);
                });
        });
    });