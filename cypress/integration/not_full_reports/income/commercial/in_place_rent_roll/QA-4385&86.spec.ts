import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4385&86.fixture";
import Income from "../../../../../actions/income/income.manager";
import { getTodayDateString } from "../../../../../../utils/date.utils";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Dates columns in the grid", 
    { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {
    const cellDatesNames: BoweryReports.LeaseDateName[] = [ "Start", "Expiry" ];

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    cellDatesNames.forEach(cellName => {
       it(`Verify ${cellName} date cell`, () => {
           NavigationSection.navigateToCommercialInPlaceRentRoll();
           Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.occupiedLease)
               .enterLeaseDateByRowNumber(cellName, getTodayDateString("/"))
               .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, getTodayDateString("/"))
               .chooseLeaseStatusByRowNumber(testData.vacantLease)
               .verifyLeaseDateByRowNumber(cellName, testData.vacantLease)
               .chooseLeaseStatusByRowNumber(testData.occupiedLease)
               .enterLeaseDateByRowNumber(cellName, testData.wrongFormatLeaseDate)
               .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, testData.wrongFormatLeaseDate);
           deleteReport(testData.reportCreationData.reportNumber);
       });
    });
});