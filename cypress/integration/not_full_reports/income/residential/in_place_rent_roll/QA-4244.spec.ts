import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4244.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Rent Forecast column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column)
                .checkCheckboxByLabelAndVerify(testData.label, testData.column)
                .enterForecastByRowNumber(testData.forecastOkay)
                .enterForecastByRowNumber(testData.forecastStringLetters)
                .enterForecastByRowNumber(testData.forecastStringOkay);
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });