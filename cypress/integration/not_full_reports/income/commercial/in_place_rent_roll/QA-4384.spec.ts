import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4384.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Use column in the grid", 
    { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {

    const useRadios: BoweryReports.CommercialUnitGroupsValues[] = [ "retail", "office", "medical", "community", "undetermined" ];
    const useTexts = [ "Retail", "Office", "Medical Office", "Community Facility", "Undetermined" ];
    const groupName = "Use";
    const defaultUseValue = "Undetermined";

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    useTexts.forEach((useText, index) => {
        it(`Use column with ${useText} value`, () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll()
                .verifyProgressBarNotExist();
            Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .verifyUseCellTextByRowNumber(defaultUseValue);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.clickCommercialUnitTabByIndex()
                .clickRadioButtonByValueAndUnitIndex(groupName, useRadios[index]);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.verifyUseCellTextByRowNumber(useText);
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });
});