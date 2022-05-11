import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4341.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe(`Verify on checking the 'Display square footage for comps?' checkbox 2 columns appears in the grids 
                of comparable unit groups on 'Rent Comps' page (Unit type of search is selected)`, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .selectComparableByIndex()
            .verifyColumnNotExist(testData.sfColumn)
            .verifyColumnNotExist(testData.perSFColumn)
            .checkDisplaySquareFootageForCompsCheckbox()
            .verifyColumnExist(testData.sfColumn)
            .verifyColumnExist(testData.perSFColumn);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});