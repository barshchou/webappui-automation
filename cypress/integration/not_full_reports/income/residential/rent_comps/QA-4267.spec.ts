import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4267.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import RentCompsPage from "../../../../../pages/income/residential/rent_comps/rentComps.page";
import { uppercaseFirstLetterEachWord } from "../../../../../../utils/string.utils";

describe("Verify the Unit Type drop-down field", () => {
    beforeEach("login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToRentComps()
            .verifyProgressBarNotExist();
        RentCompsPage.unitTypesWrapper.should("have.text", "Select Unit Types");
        Income.Residential.RentComps.BaseActions.verifyUnitSelected()
            .clickUnitTypesArrowButton()
            .checkListOfCheckboxesByQa(testData.unitTypesQaAttrs);
        RentCompsPage.minRentInput.click();
        Income.Residential.RentComps.BaseActions.clickUnitTypesArrowButton();
        testData.unitTypesQaAttrs.forEach(attr => {
            RentCompsPage.unitTypesWrapper.should("contain.text", `${uppercaseFirstLetterEachWord(attr)}`);
        });
        Income.Residential.RentComps.BaseActions.uncheckListOfCheckboxesByQa(testData.unitTypesQaAttrs);
        RentCompsPage.minRentInput.click();
        Income.Residential.RentComps.BaseActions.clickUnitTypesArrowButton();
        testData.unitTypesQaAttrs.forEach(attr => {
            RentCompsPage.unitTypesWrapper.should("not.contain.text", `${uppercaseFirstLetterEachWord(attr)}`);
        });
    });
});