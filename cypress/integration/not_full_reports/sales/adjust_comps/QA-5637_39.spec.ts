import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-5637_39.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { BoweryReports } from "../../../../types/boweryReports.type";

describe("Calculation of Market Condition adjustment", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {
        testData.reportFixture.forEach(reportType => {
            it(`${reportType.testId} ${reportType.reportCreationData.incomeValue}`, () => {
                cy.stepInfo(`Precondition: Create a report`);
                createReport(reportType.reportCreationData);
    
                cy.stepInfo("1. Open Adjust comps page");
                NavigationSection.navigateToAdjustComps();
    
                cy.stepInfo("2. Verify Calculation Units options in the Sale Comparables Setup");
                reportType.calculationUnits.forEach(
                    (calculationUnit: BoweryReports.SalesAdjustmentGrid.CalculationUnits) => {
                        Sales.AdjustComps.checkCalculationUnitsRadio(calculationUnit);
                    });
            });
        });
    });