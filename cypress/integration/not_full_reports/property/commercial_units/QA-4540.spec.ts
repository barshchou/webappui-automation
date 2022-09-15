import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4540.fixture";
import { DataCollections, Property } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the functionality of the Ceiling Height radio button", 
    { tags:[ "@property", "@commercial_units" ] }, () => {

        beforeEach("Login, create report", () => {

            cy.stepInfo(`1. Report creation and several commercial units addition`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {

            cy.stepInfo(`2. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();

            cy.stepInfo(`3. Verify that the Commercial Gross Leasable Area field is disabled.`);
            Property._CommercialUnits.verifyCommercialGrossLeasableAreaFieldIsDisabled();

            cy.stepInfo(`4. Verify that the Commercial Gross Leasable Area field is 
            the calculated sum of the Commercial Unit SF above it.`);
            Property._CommercialUnits.enterListUnitSF(testData.squareFeetList, testData.numberOfCommercialUnits)
                .verifyCommercialGrossLeasableAreaEqualSumUnitSF(testData.squareFeetList);
        });
    });