import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4212&43.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection} from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe("[QA-4212] [QA-4243] Verify the Do you know per unit square footage? section", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo('1. Navigate to Income -> Summary and specify amount of units');
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.numberOfUnits);

        cy.stepInfo('2. Navigate to Residential -> In-Place Rent Roll and verify Rent/SF value with filled monthly rent and'+
        'square footage values by formula: [Monthly Rent] * 12 / [Square Footage]');
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.verifyCheckPerUnitSquareFootageColumns(testData.columns)
            .enterSquareFootageByRow(testData.footage)
            .enterMonthlyRentByRowNumber(testData.monthlyRent)
            .verifyRentSFValue();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});