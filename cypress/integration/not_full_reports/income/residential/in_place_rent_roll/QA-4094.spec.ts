import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4094.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe(`Verify if "Per Month" time period PSF Rent based on is selected - > the calculation 
    of "Rent PSF/month" should be Monthly Rent/Square Footage`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.resUnit);
        _NavigationSection.navigateToResInPlaceRentRoll();

        testData.cases.forEach(el => {
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage()
            .Page.getPSFRadio(testData.psfRadioValue).click();
            Income._Residential.InPlaceRentRoll.enterSquareFootageByRow(el.squareFootage)
            .enterMonthlyRentByRowNumber(el.monthlyRent)
            .verifyRentPSFMonthValue();
            cy.reload();
        });
        deleteReport(testData.reportCreationData.reportNumber);
    });
});