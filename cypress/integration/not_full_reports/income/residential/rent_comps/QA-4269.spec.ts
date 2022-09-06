import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4269.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify Min SF and Max SF text fields", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll", "@fix" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4269]", () => {
            NavigationSection.navigateToResidentialRentComps()
                .verifyProgressBarNotExist();
            Income.Residential.RentComps.BaseActions.verifyUnitSelected()
                .enterValueToInput("minSF", testData.minSquareFeetOk)
                .enterValueToInput("minSF", testData.minSquareFeetMore2Digits)
                .enterValueToInput("maxSF", testData.maxSquareFeetOk)
                .enterValueToInput("maxSF", testData.maxSquareFeetMore2Digits);
        });
    });