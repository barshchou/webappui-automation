import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4384.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";

describe("Verify the Use column in the grid", () => {

    const useRadios = ["retail", "office", "medical", "community", "undetermined"];
    const useTexts = ["Retail", "Office", "Medical Office", "Community Facility", "Undetermined"];
    const defaultUseValue = "Undetermined";

    beforeEach("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    useTexts.forEach((useText, index) => {
        it(`Use column with ${useText} value`, () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .verifyUseCellTextByRowNumber(defaultUseValue);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.clickCommercialUnitTabByIndex()
                .clickRadioButtonByValueAndUnitIndex(useRadios[index]);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.verifyUseCellTextByRowNumber(useText);
        });
    });
});