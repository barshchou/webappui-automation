import { createReport, deleteReport } from "../../actions/base/baseTest.actions";
import tesData from "../../fixtures/smoke/createReport.fixture";
import { Base, Report, Sales } from "../../actions";
import { _ReportTitles } from "../../enums/pages_titles";

describe("Create report test, open Find Comps, check if map is loaded", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
        const headerToContain = tesData.reportCreationData.address.split(",")[0];
        createReport(tesData.reportCreationData);
        Report._KeyInfo.Page.pageTitle.should("exist").and("have.text", _ReportTitles.KEY_INFO);
        Report._KeyInfo.Page.Header.should("contain.text", headerToContain);
        Base._NavigationSection.navigateToFindComps()
            .verifyProgressBarNotExist();
        Sales._FindComps.selectCompFromMapByAddress(tesData.comparableAddress);
        deleteReport(tesData.reportCreationData.reportNumber);
    });
});