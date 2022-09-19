import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4379-80.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager"; 
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { DataCollections } from "../../../../../actions";

describe("Verify the Unit column in the grid and grid presence", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.verifyUnitNumberCells()
                .chooseLeaseStatusByRowNumber(testData.leaseStatus);
            NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.newUnitsNumber);
            NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income.Commercial.InPlaceRentRoll.verifyUnitNumberCells(testData.newUnitsNumber);
        });
    });