import { Sales } from './../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4053.fixture";
import { _NavigationSection } from "../../../../actions/base/index";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _Summary } from "../../../../actions/property";


describe("The Concluded Value Per Unit is calculated correctly and includes both commercial and residential units.", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo('Navigate to report summary and specify amount of residential and commercial units');
        _NavigationSection.navigateToPropertySummary();
        _Summary.enterNumberOfResUnits(testData.general.residentialUnits).
            enterNumberOfCommercialUnits(testData.general.commercialUnits);
        
        cy.stepInfo('Set comparison units to "Per Units"');
        _NavigationSection.navigateToSalesValueConclusion().clickAdjustCompsButton();
        Sales._AdjustComps.clickComparisonPerUnitRadioButton();

        cy.stepInfo('Navigate to Sales page, set conclusion value and verify that total amount is calcualted correctly');
        _NavigationSection.navigateToSalesValueConclusion();
        Sales._ValueConclusion.enterSaleValueConclusion(testData.general.valueConclusion)
            .verifySaleValueConclusion(testData.general.valueConclusion)
            .verifyAsStabilizedAmount(testData.general.totalValue);
        
        cy.stepInfo('Delete report');
        deleteReport(testData.reportCreationData.reportNumber);
    });
});