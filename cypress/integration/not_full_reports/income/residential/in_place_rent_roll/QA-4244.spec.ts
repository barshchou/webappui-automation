import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4244.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe("Verify the Rent Forecast column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column)
                .checkCheckboxByLabelAndVerify(testData.label, testData.column)
                .enterForecastByRowNumber(testData.forecastOkay)
                .enterForecastByRowNumber(testData.forecastStringLetters)
                .enterForecastByRowNumber(testData.forecastStringOkay);
        });
    });