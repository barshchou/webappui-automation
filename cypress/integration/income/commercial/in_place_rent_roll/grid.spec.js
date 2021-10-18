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
        navSectionActions.verifyProgressBarNotExist();
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
    });

    it("ID242: Use col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
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
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
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
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        const cellName = "Expiry";
        rentRollActions.enterLeaseStartDateByRowNumber(cellName, getTodayDateString("/"));
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[0], getTodayDateString("/"));
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[1]);
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[1]);
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        rentRollActions.enterLeaseStartDateByRowNumber(cellName, testData.wrongFormatLeaseDate);
        rentRollActions.verifyLeaseStartDateByRowNumber(cellName, testData.leaseStatuses[0], testData.wrongFormatLeaseDate);
    });

    it("ID245: SF col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.enterUnitSFByUnitIndex(testData.squareFeet);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.verifySquareFeetByRowNumber(testData.squareFeet);
    });

    it("ID246: Annual Rent col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.enterUnitSFByUnitIndex(testData.squareFeet);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.enterRentPerSFByRowNumber(testData.rentPerSF);
        rentRollActions.verifyAnnualRentCellSquareFootByRowNumber(testData.rentPerSF, testData.squareFeet);
        rentRollActions.clearRentPerSFByRowNumber();
        rentRollActions.clickMonthlyBasisButton();
        rentRollActions.enterMonthlyRentByRowNumber(testData.monthlyRent);
        rentRollActions.verifyAnnualRentMonthlyByRowNumber(testData.monthlyRent);
        rentRollActions.clearMonthlyRentByRowNumber();
        rentRollActions.clickAnnuallyBasisButton();
        rentRollActions.enterAnnualRentByRowNumber(testData.annualRent);
        rentRollActions.clearAnnualRentByRowNumber();
        rentRollActions.clickPerSquareFootButton(false);
    });

    it("ID247: Monthly Rent col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.enterUnitSFByUnitIndex(testData.monthlyTestSquareFoot);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.enterRentPerSFByRowNumber(testData.rentPerSF);
        rentRollActions.verifyMonthlyRentPerSFByRowNumber(testData.rentPerSF, testData.monthlyTestSquareFoot);
        rentRollActions.clearRentPerSFByRowNumber();
        rentRollActions.clickMonthlyBasisButton();
        rentRollActions.enterMonthlyRentByRowNumber(testData.monthlyRent);
        rentRollActions.clearMonthlyRentByRowNumber();
        rentRollActions.clickAnnuallyBasisButton();
        rentRollActions.enterAnnualRentByRowNumber(testData.annualRent);
        rentRollActions.verifyMonthlyRentAnnuallyByRowNumber(testData.annualRent);
        rentRollActions.clearAnnualRentByRowNumber();
        rentRollActions.clickPerSquareFootButton(false);
    });

    it("ID248: Rent PerSF col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.leaseStatuses[0]);
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.enterUnitSFByUnitIndex(testData.perSfTestSquareFoot);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.enterRentPerSFByRowNumber(testData.rentPerSF);
        rentRollActions.clearRentPerSFByRowNumber();
        rentRollActions.clickMonthlyBasisButton();
        rentRollActions.enterMonthlyRentByRowNumber(testData.monthlyRent);
        rentRollActions.verifyRentPerSFMonthlyByRowNumber(testData.monthlyRent, testData.perSfTestSquareFoot);
        rentRollActions.clearMonthlyRentByRowNumber();
        rentRollActions.clickAnnuallyBasisButton();
        rentRollActions.enterAnnualRentByRowNumber(testData.annualRent);
        rentRollActions.verifyRentPerSFAnnuallyByRowNumber(testData.annualRent, testData.perSfTestSquareFoot);
        rentRollActions.clearAnnualRentByRowNumber();
        rentRollActions.clickPerSquareFootButton(false);
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePage();
        homepageActions.deleteReport(testData.reportNumber);
    });
});