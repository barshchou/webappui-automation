import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4237.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe("Verify the Outdoor Space column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabelAndVerify(testData.labelAndColumn,
                testData.labelAndColumn);
            testData.spaceOptions.forEach(option => {
                Income._Residential.InPlaceRentRoll.enterOutdoorSpaceByOptionByRow(option);
            });
            Income._Residential.InPlaceRentRoll.Page.outdoorSpaceCells.eq(0).trigger("keydown", { keyCode: 46 })
                .should("have.text", "▼");
        });
    });