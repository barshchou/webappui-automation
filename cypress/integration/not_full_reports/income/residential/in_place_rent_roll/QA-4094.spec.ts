import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4094.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";
import { Tag } from "../../../../../utils/tags.utils";

describe(`[QA-4094] Verify if "Per Month" time period PSF Rent based on is selected - > the calculation 
    of "Rent PSF/month" should be Monthly Rent/Square Footage`, 
    { tags:[ Tag.income, Tag.residential, Tag.in_place_rent_roll ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Income > Residential > In-Place Rent Roll");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.resUnit);
        _NavigationSection.navigateToResInPlaceRentRoll();

        cy.stepInfo(`2. Verify if "Per Month" time period PSF Rent based on is selected - > the calculation 
        of "Rent PSF/month" should be Monthly Rent/Square Footage
            Also verify if calculationif correct if:
                -Square Footage is 0
                -Square Footage is not filled
                -Monthly rent is 0
                -Monthly rent is not filled`);
        testData.rentRollResidentialUnits.forEach(el => {
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage()
            .Page.getPSFRadio(testData.psfRadioValue).click();
            Income._Residential.InPlaceRentRoll.enterSquareFootageByRow(el.footage)
            .enterMonthlyRentByRowNumber(el.monthlyRent)
            .verifyRentPSFMounthValue("perMonth");
            cy.reload();
        });
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});