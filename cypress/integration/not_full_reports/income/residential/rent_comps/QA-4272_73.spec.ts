import testData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4272-73.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { getTodayDateString, getTodayDay } from "../../../../../../utils/date.utils";

const todayDate = getTodayDateString();
const todayDay = Number(getTodayDay());

describe("Verify Date of Value Range text fields when Unit type of search is selected", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResidentialRentComps()
            .verifyProgressBarNotExist();
        Income.Residential.RentComps.BaseActions.enterDateInput(todayDate, "min")
            .enterDateInput(todayDate, "max")
            .clearDateInput("min")
            .clearDateInput("max")
            .enterDateInput(testData.wrongFormatDate, "min")
            .enterDateInput(testData.wrongFormatDate, "max")
            .clearDateInput("min")
            .clearDateInput("max")
            .selectDayFromPicker("min", todayDay)
            .verifyEnteredDate("min", todayDate)
            .selectDayFromPicker("max", todayDay)
            .verifyEnteredDate("max", todayDate)
            .clearDateInput("min")
            .clearDateInput("max");
    });
});