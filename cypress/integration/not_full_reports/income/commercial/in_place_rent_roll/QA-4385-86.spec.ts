import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4385-86.fixture";
import { getTodayDateString } from "../../../../../../utils/date.utils";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import { BoweryReports } from "../../../../../types/boweryReports.type";

describe("Verify the Dates columns in the grid",
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        const cellDatesNames: BoweryReports.LeaseDateName[] = [ "Start", "Expiry" ];

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        cellDatesNames.forEach(cellName => {
            it(`Verify ${cellName} date cell`, () => {
                _NavigationSection.navigateToCommercialInPlaceRentRoll();
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.occupiedLease)
                    .enterLeaseDateByRowNumber(cellName, getTodayDateString("/"))
                    .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, "in-place", getTodayDateString("/"))
                    .chooseLeaseStatusByRowNumber(testData.vacantLease)
                    .verifyLeaseDateByRowNumber(cellName, testData.vacantLease, "in-place",)
                    .chooseLeaseStatusByRowNumber(testData.occupiedLease)
                    .enterLeaseDateByRowNumber(cellName, testData.wrongFormatLeaseDate)
                    .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, "in-place", 
                        testData.wrongFormatLeaseDate);
            });
        });
    });