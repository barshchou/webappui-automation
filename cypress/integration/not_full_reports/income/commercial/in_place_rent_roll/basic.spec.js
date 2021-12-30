import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/basicCommInPlaceRentRoll.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {waitForTime} from "../../../../../../utils/waiters.utils";

describe("Basic commercial In-Place Rent Roll tests", () => {
    before("Create report and navigate to Commercial In-Place Rent Roll", () => {
        cy.login();
        waitForTime();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID236: Basis of Rent tooltip", () => {
        Income.Commercial.InPlaceRentRoll.verifyBasisOfRentTooltip();
    });

    it("ID237: Rent Basis buttons", () => {
        Income.Commercial.InPlaceRentRoll.verifyAllBasisButtons();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        Income.Commercial.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});
