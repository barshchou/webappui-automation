import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4413&14.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Current Commercial Income Discussion > Modified label and Save button functionality", 
    { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.editDiscussion(testData.editedCommentary);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});