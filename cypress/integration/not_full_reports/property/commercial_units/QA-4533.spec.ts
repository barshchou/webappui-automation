import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4533.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Property } from "../../../../actions";

describe("[QA-4533] Verify the display of the Commercial Units page",
    { tags:[ "@property", "@commercial_units" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo("Preconditions: The mixed report is created and several commercial units are added.");
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
            _NavigationSection.navigateToCommercialUnits();
        
            cy.stepInfo(`2. Verify the following elements on the page: 
                    - Property Commercial Unit Description title of the page
                    - Commercial Unit SF section 
                    - Commercial Unit SF Discussion section
                    - Commercial Unit Description section `);
            Property._CommercialUnits.Page.pageTitle
                .should('have.text', testData.title)
                .should('be.visible');
            Property._CommercialUnits.Page.commercialUnitsNumberInput
                .should('be.disabled')
                .should('have.value', testData.numberOfCommercialUnits);
            Property._CommercialUnits.Page.commercialUnitsDiscussionTitle
                .should('be.visible');
            for (let i = 1; i <= testData.numberOfCommercialUnits; i++) {
                Property._CommercialUnits.clickCommercialUnitTab(i);
                Property._CommercialUnits.Page.commercialUnitDescriptionTitle(i)
                    .should('be.visible');
            }
        });
    });