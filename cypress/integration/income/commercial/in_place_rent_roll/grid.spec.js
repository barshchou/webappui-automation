import {uppercaseFirstLetter} from "../../../../../utils/string.utils";

const testData = require("../../../../fixtures/gridCommInPlaceRentRoll.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../actions/income/commercial/rentRoll.actions";
import stabRentRollActions from "../../../../actions/income/commercial/stabilizedRentRoll.actions";
import unitInspectionActions from "../../../../actions/final/unitInspection.actions";
import commercialUnitsActions from "../../../../actions/property/commercialUnits.actions";
import {getTodayDateString} from "../../../../../utils/date.utils";

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
        rentRollActions.clickSaveButton();
        navSectionActions.verifyProgressBarNotExist();
        navSectionActions.clickCommercialStabRentRollButton();
        navSectionActions.verifyProgressBarNotExist();
        stabRentRollActions.verifyIsInspectedChecked();
        navSectionActions.navigateToUnitInspection();
        unitInspectionActions.verifyNumberOfInspectedUnits();
        unitInspectionActions.clickSaveButton();
        navSectionActions.navigateToCommercialInPlaceRentRoll(false);
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
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
    });

    it("ID242: Use col", () => {
        const defaultUseValue = uppercaseFirstLetter(testData.useRadios[testData.useRadios.length - 1]);
        rentRollActions.verifyUseCellTextByRowNumber(defaultUseValue);
        testData.useRadios.forEach(useValue => {
            navSectionActions.navigateToCommercialUnits();
            commercialUnitsActions.clickCommercialUnitTabByIndex();
            commercialUnitsActions.clickRadioButtonByValueAndUnitIndex(useValue);
            navSectionActions.navigateToCommercialInPlaceRentRoll();
            rentRollActions.verifyUseCellTextByRowNumber(uppercaseFirstLetter(useValue));
        });
    });

    it("ID243: Lease Start Date col", () => {
        const cellName = "Start";
        rentRollActions.enterLeaseStartDateByRowNumber(cellName, getTodayDateString("/"));
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[0], getTodayDateString("/"));
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[1]);
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[1]);
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        rentRollActions.enterLeaseStartDateByRowNumber(cellName, testData.wrongFormatLeaseDate);
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[0], testData.wrongFormatLeaseDate);
    });

    it.skip("ID244: Lease Expiration Date col", () => {
        const cellName = "Expiry";
        rentRollActions.enterLeaseStartDateByRowNumber(cellName, getTodayDateString("/"));
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[0], getTodayDateString("/"));
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[1]);
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[1]);
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        rentRollActions.enterLeaseStartDateByRowNumber(cellName, testData.wrongFormatLeaseDate);
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[0], testData.wrongFormatLeaseDate);
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePageAndSave();
        homepageActions.deleteReport(testData.reportNumber);
    });
});