import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4384.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager"; 
import Property from "../../../../../actions/property/property.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { BoweryReports } from "../../../../../types/boweryReports.type";

// TODO: remove  "@bug", "@save_changes_modal" from tags after verification of QA-4558 and QA-4384

describe("Verify the Use column in the grid", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll", "@bug", "@save_changes_modal" ] }, () => {

        const useRadios: BoweryReports.CommercialUnits.GroupsValues[] = [ 
            "retail", 
            "office", 
            "medical", 
            "community", 
            "undetermined" 
        ];
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
                    .verifyUseCellByRow(defaultUseValue);
                NavigationSection.navigateToCommercialUnits();
                Property.CommercialUnits.clickCommercialUnitTabByIndex()
                    .clickRadioButtonByValueAndUnitIndex(groupName, useRadios[index]);
                NavigationSection
                    .clickSaveButton()
                    .navigateToCommercialInPlaceRentRoll();
                Income.Commercial.InPlaceRentRoll.verifyUseCellByRow(useText);
            });
        });
    });