import { Income, Property } from '../../../../../actions/index';
import { _NavigationSection } from '../../../../../actions/base/index';
import testData from "../../../../../fixtures/not_full_reports/income/residential/stabilized_rent_roll/QA-5918-19.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Default selection on Stabilized Rent Roll table is the same selection made on In-Place RR page",
    { tags:[ "@income", "@residential", "@stabilized_rent_roll" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it(`[QA-5918] Residential Unit Distribution Summary is generated according to selected 
        Basis for Square Foot Analysis if Per Unit Square Footage is unknown`, () => {
        
        testData.basisForSquareFootAnalysis.forEach((_, index) => {
            cy.stepInfo("Precondition: Fill all needed variables");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length)
            .selectBasisFootAnalysis(testData.basisForSquareFootAnalysis[index]);

            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyPerUnitSFRadioCheck(false, true);

           //wip 
        });
        

        deleteReport(testData.reportCreationData.reportNumber);
    });
});