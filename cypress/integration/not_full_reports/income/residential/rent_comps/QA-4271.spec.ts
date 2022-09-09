import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4271.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Source of Information drop-down field in the when Unit type of search is selected", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4271]", () => {
            NavigationSection.navigateToResidentialRentComps()
                .verifyProgressBarNotExist();
            Income.Residential.RentComps.BaseActions.clickSourceOfInfoButton()
                .checkListOfCheckboxesByQa(testData.sourceOfInfoQaAttr)
                .clickUnitTypesArrowButton()
                .clickSourceOfInfoButton()
                .uncheckListOfCheckboxesByQa(testData.sourceOfInfoQaAttr);
        });
    });