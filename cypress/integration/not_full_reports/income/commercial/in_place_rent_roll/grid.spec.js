import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/gridCommInPlaceRentRoll.fixtures";
import {commonData} from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/gridCommInPlaceRentRoll.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Final from "../../../../../actions/final/final.manager";

describe("Commercial In-Place Rent Roll grid tests", () => {
    beforeEach("Login and navigate to commercial In-Place Rent Roll", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
    });

    it("ID238: Inspected col. (checkbox)", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .checkIsInspectedCheckboxByRowNumber();
        NavigationSection.clickCommercialStabRentRollButton()
            .clickYesButton()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyIsInspectedChecked();
        NavigationSection.navigateToUnitInspection();
        Final.UnitInspection.verifyNumberOfInspectedUnitsCommentary();
        deleteReport();
    });

    function deleteReport() {
        Income.Commercial.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    }
});
