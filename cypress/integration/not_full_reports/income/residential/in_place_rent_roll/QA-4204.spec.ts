import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4204.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../../actions";

describe(" Verify the Number of Residential Units section on the In-Place Rent Roll page", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
                .verifyNumberOfResidentialUnits(testData.numberOfUnits)
                .goToPropSummaryWithSaveLeavingFirst();
            Property._Summary.verifyThatPageIsOpened();
        });
    });