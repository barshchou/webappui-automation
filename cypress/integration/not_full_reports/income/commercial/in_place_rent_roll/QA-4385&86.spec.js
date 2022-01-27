import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4385&86.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import Income from "../../../../../actions/income/income.manager";
import {getTodayDateString} from "../../../../../../utils/date.utils";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";

describe("Verify the Dates columns in the grid", () => {
    const cellDatesNames = ["Start", "Expiry"];

    beforeEach("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
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
               .verifyLeaseDateByRowNumber(cellName, testData.occupiedLease, testData.wrongFormatLeaseDate)
               .returnToHomePage();
           Homepage.deleteReport(testData.reportCreationData.reportNumber);
       });
    });
});