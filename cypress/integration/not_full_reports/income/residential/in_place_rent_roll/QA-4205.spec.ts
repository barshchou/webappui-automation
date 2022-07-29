import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4205.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Enums from "../../../../../enums/enums";

describe("Verify the Rent Roll Options are present on the In-Place Rent Roll page", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Login, create report", () => {
            NavigationSection.navigateToResInPlaceRentRoll()
                .verifyProgressBarNotExist();
            cy.contains("Rent Roll Options").should("exist");
            Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.devForecast)
                .checkCheckboxByLabel(testData.perRoomAnalysis);
            if (testData.reportCreationData.conclusionValue === Enums.VALUE_CONCLUSION_TYPE.AS_IS) {
                Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.summarizeRentRoll);
            } else {
                Income.Residential.InPlaceRentRoll.verifyCheckboxNotExist(testData.summarizeRentRoll);
            }
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });
