import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4275.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import Property from "../../../../actions/property/property.manager";

describe("Gross Building Area value pulled from Property -> Summary -> As Is Building Description", 
    { tags: [ "@sales", "@value_conclusion" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.verifyGrossBuildingAreaAmount(testData.gbaToBe);
        NavigationSection.navigateToPropertySummary()
            .closeSatisfactionSurvey();
        Property.Summary.enterGrossBuildingArea(testData.newGba);
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.verifyGrossBuildingAreaAmount(testData.newGba);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});