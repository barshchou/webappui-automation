import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4403.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Unsaved changes modal functionality", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.forecastLabel)
                .goToPropSummaryWithSaveSaveClickFirst();
            Property.Summary.verifyThatPageIsOpened()
                .goBackWithSave();
            Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.forecastLabel)
                .uncheckCheckboxByLabel(testData.forecastLabel)
                .goToPropSummaryWithoutSave();
            Property.Summary.verifyThatPageIsOpened()
                .goBackWithSave();
            Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.forecastLabel);
        });
    });