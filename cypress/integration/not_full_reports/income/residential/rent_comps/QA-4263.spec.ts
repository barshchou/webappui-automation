import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

const reportDatas = [ ReportDataCreator.getReportData("4263"),
    ReportDataCreator.getReportData("4263", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }) ];

describe("Verify the wording of Generated Commentary section on Rent Comps page for different report types", () => {
    reportDatas.forEach(data => {
        it(`Test for ${data.conclusionValue} report type`, () => {
            createReport(data);
            NavigationSection.navigateToRentComps()
                .verifyProgressBarNotExist();
            Income.Residential.RentComps.BaseActions.verifyGCText(data.conclusionValue);
        });
    });
});