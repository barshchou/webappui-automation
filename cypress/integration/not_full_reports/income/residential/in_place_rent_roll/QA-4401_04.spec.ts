import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4401_04.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Save and Save&Continue buttons functionality", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report, check checkbox", () => {
            createReport(testData.reportCreationData);
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.forecastLabel);
        });

        it("QA-4401 Save button", () => {
            Income.Residential.InPlaceRentRoll.clickSaveButton();
            cy.reload();
            Income.Residential.InPlaceRentRoll.verifyProgressBarNotExist()
                .verifyCheckboxIsChecked(testData.forecastLabel);
        });

        it("QA-4404 Save&Continue button", () => {
            Income.Residential.InPlaceRentRoll.clickSaveContinueButton();
            Income.Residential.UnitGroups.verifyThatPageIsOpened()
                .goBackWithSave();
            Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.forecastLabel);
        });
    });