import testData from "../../../../../fixtures/not_full_reports/sf_integration/property/summary/QA-5212_15_19.fixture";
import { _HomePage, _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Property } from "../../../../../actions";
import { loginAction } from "../../../../../actions/base/baseTest.actions";

describe("[QA-5212] Verify validation of the Residential Units and Commercial Units fields",
    { tags: [ "@property", "@summary", "@salesforce", "@data_collections", "@subject_property_data", 
        "@property_description" ] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo("1. Create a new report NOT in NYC on the WebApp");
            loginAction();
            _HomePage.createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("2. Verify what is displayed in the Building Name field");
            DataCollections._SubjectPropertyData.Page.buildingNameInput.should("have.value", testData.buildingName);

            cy.stepInfo("3. Verify what is displayed in the Year Built field");
            DataCollections._SubjectPropertyData.Page.yearBuilt.should("have.value", testData.yearBuilt);

            cy.stepInfo("4. Verify what is displayed in the GBA field");
            DataCollections._SubjectPropertyData.Page.grossBuildingArea.should("have.value", testData.gba);

            cy.stepInfo("5. Verify all previous data is displayed on Property -> Summary");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.verifyBuildingName(testData.buildingName)
                .verifyYearBuilt(testData.yearBuilt)
                .verifyGrossBuildingArea(testData.gba);
        });
    });
