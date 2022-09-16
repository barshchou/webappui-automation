import testData from "../../../../fixtures/not_full_reports/property/summary/QA-4087.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Property } from "../../../../actions";
import Enums from "../../../../enums/enums";
import subjectPropertyDataRouts from "../../../../utils/subject_property_data_routs.utils";

describe.skip("[QA-4087] Verify validation of the Residential Units and Commercial Units fields.",
    { tags: [ "@property", "@summary", "@data_collections", "@subject_property_data", "@property_description" ] },
    () => {

        beforeEach("Login, create report", () => {
            // TODO: Check this spec later, maybe we can remove this timeout here
            Cypress.config().defaultCommandTimeout = 60000;
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Property > Summary`);
            _NavigationSection.navigateToPropertySummary();

            cy.stepInfo("2. Click edit Edit Data button for Building Description, apply changes");
            Property._Summary
                .clickEditDataBySectionName(Enums.EDIT_ON_SUBJECT_PROPERTY_SECTIONS.asCompleteBuildingDescription)
                .submitSaveChangesModal()
                .waitForUrl(subjectPropertyDataRouts.propertyDescription);

            cy.stepInfo(`3. Verify validation of the Residential Units and Commercial Units fields. 
            The Numbers in these fields should be limited to 5000 units. 
            Check with:
                - empty fields
                - 0 (users can enter 0 as a valid number)
                - any value. from 1 to 4998
                - 4999
                - 5000
                - 5001
                - 1000000
                - copy-paste`);
            testData.verifyValues.forEach(value => {
                DataCollections._SubjectPropertyData.enterNumberOfResUnits(value, testData.notInclude)
                    .enterNumberOfCommercialUnits(value, testData.notInclude);
                if (value > 5000) {
                    DataCollections._SubjectPropertyData.Page
                        .resUnitsInputValidationText("Max value is 5000").should("be.visible");
                    DataCollections._SubjectPropertyData.Page
                        .commercialUnitsInputValidationText("Max value is 5000").should("be.visible");
                } else {
                    _NavigationSection.navigateToPropertySummary();
                    Property._Summary.verifyNumberOfResidentialUnits(value)
                        .verifyNumberOfCommercialUnits(value);
                    _NavigationSection.navigateToSubjectPropertyData(
                        Enums.SUBJECT_PROPERTY_DATA_SECTIONS.propertyDescription);
                }
            });

            DataCollections._SubjectPropertyData.Page.numberOfResUnitsInput.clear().invoke('val', '');
            DataCollections._SubjectPropertyData.Page.numberOfCommercialUnitsInput.clear().invoke('val', '');
            DataCollections._SubjectPropertyData.Page.resUnitsInputValidationText("Required").should("be.visible");
            DataCollections._SubjectPropertyData.Page
                .commercialUnitsInputValidationText("Required").should("be.visible");
        });
    });
