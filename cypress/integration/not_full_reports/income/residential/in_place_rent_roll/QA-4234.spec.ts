import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4234.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe("Verify the Unit Type column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyColumnNotExist(testData.labelAndColumn)
                .checkCheckboxByLabelAndVerify(testData.labelAndColumn, testData.labelAndColumn);
            testData.types.forEach(type => {
                Income._Residential.InPlaceRentRoll.chooseUnitTypeByRow(type);
            });
            Income._Residential.InPlaceRentRoll.Page.unitTypeCells.eq(0).trigger("keydown", { keyCode: 46 })
                .should("have.text", "▼");
        });
    });