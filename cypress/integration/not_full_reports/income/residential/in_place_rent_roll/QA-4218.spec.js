import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4218.fixture";
import {createReport, deleteReport} from "../../../../baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Enums from "../../../../../enums/enums";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";

describe("Verify the grid is present", () => {
    const conclusionValues = [Enums.VALUE_CONCLUSION_TYPE.AS_IS, Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE];

    conclusionValues.forEach(type => {
        const reportCreationData = ReportDataCreator.getReportSpecificConclusionValue(type, "4218");

        it(`Test for ${type} type of report`, () => {
            createReport(reportCreationData);
            NavigationSection.navigateToResInPlaceRentRoll();
            if (reportCreationData.conclusionValue === Enums.VALUE_CONCLUSION_TYPE.AS_IS) {
                cy.contains(testData.asIsText).should("exist");
                Income.Residential.InPlaceRentRoll.clickCloseIcon();
                cy.contains(testData.asIsText).should("not.exist");
            } else {
                cy.contains(testData.notAsIsText).should("exist");
                Income.Residential.InPlaceRentRoll.clickCloseIcon();
                cy.contains(testData.notAsIsText).should("not.exist");
            }
            Income.Residential.InPlaceRentRoll.verifyColumnExist(testData.columnName)
                .verifyNumberOfUnitsNumberCells();
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.verifyNumberOfUnitsNumberCells(testData.numberOfUnits);
            deleteReport(reportCreationData.reportNumber);
        });
    });
});