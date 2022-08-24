import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4534_35_36.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[Verify the functionality of the link to the Property > Summary page",
    { tags:[ "@property", "@commercial_units" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-4534] Test body", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits.first);
            _NavigationSection.navigateToCommercialUnits();
        
            cy.stepInfo(`2. Hover the arrows near No. of Commercial Units label.`);
            Property._CommercialUnits.Page.iconExchangeComUnits.trigger("mouseover");

            cy.stepInfo(`3. Verify the following text is displayed: 'Go To Property Summary'.`);
            Property._CommercialUnits.Page.iconExchangeTooltip.should("be.visible");

            cy.stepInfo(`4. Click on the arrows.`);
            Property._CommercialUnits.Page.iconExchangeComUnits.click();

            cy.stepInfo(`5. Verify that the Property > Summary page is displayed.`);
            Property._Summary.Page.headerSection.should("be.visible");
        });

        it("[QA-4535] Test body", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits.first);
            _NavigationSection.navigateToCommercialUnits();
        
            cy.stepInfo(`2. Verify that the No. of Commercial Units field is disabled and the number of Commercial Units
            (from Property > Summary page) is displayed inside the field.`);
            Property._CommercialUnits.Page.numberCommercialUnitsField.should("be.disabled");
            Property._CommercialUnits.Page.numberCommercialUnitsField
                .should("have.value", testData.numberOfCommercialUnits.first);

            cy.stepInfo(`3. Proceed to the Property > Summary page, change the Number of 
            Commercial Units and save the changes.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits.second);

            cy.stepInfo(`4. Proceed back to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();

            cy.stepInfo(`5.Verify that the correct Number of Commercial Units 
            is displayed inside the No. of Commercial Units field.`);
            Property._CommercialUnits.Page.numberCommercialUnitsField
                .should("have.value", testData.numberOfCommercialUnits.second);
        });

        it("[QA-4536] Test body", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();
        
            cy.stepInfo(`2. Verify that the Commercial Unit # field is enabled.`);
            Property._CommercialUnits.Page.commercialUnitsSFInputs.should("be.visible");

            cy.stepInfo(`3. Proceed to the Property > Summary page and enter any value 
            in the Commercial Units field (e.g. 3), save the changes.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits.first);

            cy.stepInfo(`4. Move back to the Property > Commercial Units page and verify that the Commercial Unit 1 SF, 
            Commercial Unit 2 SF, Commercial Unit 3 SF fields are displayed.`);
            _NavigationSection.navigateToCommercialUnits();
            for (let i = 0; i < testData.numberOfCommercialUnits.first; i++) {
                Property._CommercialUnits.Page.commercialUnitsSFInputs.eq(i).should("be.visible");
            }

            cy.stepInfo(`5. Proceed to the Property > Summary page again and enter “0“ 
            in the Commercial Units field, save the changes.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits.third);

            cy.stepInfo(`6. Move back to the Property > Commercial Units and verify that 
            the Commercial Unit # SF field is NOT displayed.`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.Page.commercialUnitsSFInputs.should("not.exist");
        });
    });