import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4093-96.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, DataCollections } from "../../../../../actions";

describe(`[QA-4093-95] Verify if "Per Month" time period PSF Rent based on is selected - > the calculation 
    of "Rent PSF/month" should be Monthly Rent/Square Footage`, 
{ tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Property > Summary and add residential unit");
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.resUnit);
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        _NavigationSection.navigateToResInPlaceRentRoll();
        // necessary to have clear UI state on page for test
        cy.reload();
    });

    it("[QA-4093-94]", () => {
        cy.stepInfo(`1. Verify if "Per Month" time period PSF Rent based on is selected - > the calculation 
        of "Rent PSF/month" should be Monthly Rent/Square Footage
            Also verify if calculation is correct if:
                -Square Footage is 0
                -Square Footage is not filled
                -Monthly rent is 0
                -Monthly rent is not filled`);
        testData.rentRollResidentialUnits.forEach(unit => {
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage()
                .clickPSFRadio(testData.psfRadioValuePerMonthly)
                .verifyColumnExist(testData.columnName)
                .enterSquareFootageByRow(unit.footage)
                .enterMonthlyRentByRowNumber(unit.monthlyRent)
                .verifyRentPSFValueByRow();
            
            // Restore page to default state
            _NavigationSection.navigateToResidentialUnitGroups(false)
                .navigateToResInPlaceRentRoll();
        });
    });

    it("[QA-4095-96]", () => {
        cy.stepInfo(`1. Verify if selected time period PSF rent based on is changed -> Calculation of 
        "Rent/SF"and "Rent PSF/month" column is dynamically recalculated according to newly selected time period`);
        Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage()
            .clickPSFRadio(testData.psfRadioValuePerMonthly)
            .verifyColumnExist(testData.columnName)
            .enterSquareFootageByRow(testData.rentRollResidentialUnits[0].footage)
            .enterMonthlyRentByRowNumber(testData.rentRollResidentialUnits[0].monthlyRent)
            .verifyRentPSFValueByRow()
            .clickPSFRadio(testData.psfRadioValuePerAnnually)
            .verifyRentPSFValueByRow(false);
        
        cy.stepInfo(`2. Verify there is no change to Generated Commentary regardless 
        user select "Yes" in "Do you know per unit square footage/" and selected time period`);
        Income._Residential.InPlaceRentRoll.verifyRentRollCommentary(testData.commentaryToBe)
            .checkPerUnitSquareFootage(false)
            .verifyRentRollCommentary(testData.commentaryToBe);
    });
});