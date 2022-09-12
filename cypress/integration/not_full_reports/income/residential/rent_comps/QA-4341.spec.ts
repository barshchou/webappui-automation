import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4341.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe(`Verify on checking the 'Display square footage for comps?' checkbox 2 columns appears in the grids 
of comparable unit groups on 'Rent Comps' page (Unit type of search is selected)`, 
{ tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4341]", () => {
        NavigationSection.navigateToResidentialRentComps();
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .selectComparableByIndex()
            .verifyColumnNotExist(testData.sfColumn)
            .verifyColumnNotExist(testData.perSFColumn)
            .checkDisplaySquareFootageForCompsCheckbox()
            .verifyColumnExist(testData.sfColumn)
            .verifyColumnExist(testData.perSFColumn);
    });
});