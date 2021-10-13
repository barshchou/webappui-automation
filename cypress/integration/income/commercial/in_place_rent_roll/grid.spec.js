const testData = require("../../../../fixtures/gridCommInPlaceRentRoll.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../actions/income/commercial/rentRoll.actions";
import stabRentRollActions from "../../../../actions/income/commercial/stabilizedRentRoll.actions";
import unitInspectionActions from "../../../../actions/final/unitInspection.actions";
import commercialUnitsActions from "../../../../actions/property/commercialUnits.actions";

describe("Commercial In-Place Rent Roll grid tests", () => {
    before("Login and navigate to commercial In-Place Rent Roll", () => {
        cy.loginByApi();
        homepageActions.createReport(testData.incomeType, testData.address, testData.reportNumber,
            testData.templateType, testData.conclusionType);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID238: Inspected col. (checkbox)", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        rentRollActions.checkIsInspectedCheckboxByRowNumber();
        navSectionActions.clickCommercialStabRentRollButton();
        navSectionActions.clickYesButton();
        stabRentRollActions.verifyIsInspectedChecked();
        navSectionActions.navigateToUnitInspection(false);
        unitInspectionActions.verifyNumberOfInspectedUnits();
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.uncheckIsInspectedCheckboxByRowNumber();
    });

    it("ID239: # col. (auto)", () => {
        rentRollActions.verifyUnitNumberCells();
    });

    it("ID240: Lease Status col", () => {
        rentRollActions.chooseLeaseStatusesByRowNumber(testData.leaseStatuses);
    });

    it("ID241: Tenant Name col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        rentRollActions.enterTenantNameByRowNumber(testData.tenantName);
        rentRollActions.verifyTenantNameByRowNumber(testData.leaseStatuses[0], testData.tenantName);
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[1]);
        rentRollActions.verifyTenantNameByRowNumber(testData.leaseStatuses[1]);
    });

    it("ID242: Use col", () => {
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.clickCommercialUnitTabByIndex();
        commercialUnitsActions.clickRadioButtonByValueAndUnitIndex();

    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePageAndSave();
        homepageActions.deleteReport(testData.reportNumber);
    });
});