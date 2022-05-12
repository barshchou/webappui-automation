import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4385&86.fixture";
import { getTodayDateString } from "../../../../../../utils/date.utils";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("Verify the Dates columns in the grid", () => {
    const cellDatesNames: BoweryReports.LeaseDateName[] = [ "Start", "Expiry" ];

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    cellDatesNames.forEach(cellName => {
       it(`Verify ${cellName} date cell`, () => {
           _NavigationSection.navigateToCommercialInPlaceRentRoll();
           Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.occupiedLease)
               .enterLeaseDateByRowNumber(cellName, getTodayDateString("/")).Shared
               .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, "in-place", getTodayDateString("/"));
           Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.vacantLease).Shared
               .verifyLeaseDateByRowNumber(cellName, testData.vacantLease, "in-place",);
           Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.occupiedLease)
               .enterLeaseDateByRowNumber(cellName, testData.wrongFormatLeaseDate).Shared
               .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, "in-place", testData.wrongFormatLeaseDate);
           deleteReport(testData.reportCreationData.reportNumber);
       });
    });
});