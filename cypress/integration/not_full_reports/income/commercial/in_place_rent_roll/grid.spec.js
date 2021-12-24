import testData from "../../../../../fixtures/gridCommInPlaceRentRoll.fixtures";
import {commonData} from "../../../../../fixtures/gridCommInPlaceRentRoll.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../../actions/income/commercial/rentRoll.actions";
import stabRentRollActions from "../../../../../actions/income/commercial/stabilizedRentRoll.actions";
import unitInspectionActions from "../../../../../actions/final/unitInspection.actions";
import commercialUnitsActions from "../../../../../actions/property/commercialUnits.actions";
import {getTodayDateString} from "../../../../../../utils/date.utils";
import propertySummaryActions from "../../../../../actions/property/summary.actions";

describe("Commercial In-Place Rent Roll grid tests", () => {
    before("Login and navigate to commercial In-Place Rent Roll", () => {
        cy.login();
        homepageActions.createReport(testData.reportCreationData);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID238: Inspected col. (checkbox)", () => {
        navSectionActions.verifyProgressBarNotExist();
        rentRollActions.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .checkIsInspectedCheckboxByRowNumber();
        navSectionActions.clickCommercialStabRentRollButton()
            .clickYesButton()
            .verifyProgressBarNotExist();
        stabRentRollActions.verifyIsInspectedChecked();
        navSectionActions.navigateToUnitInspection();
        unitInspectionActions.verifyNumberOfInspectedUnitsCommentary()
            .clickSaveButton();
        navSectionActions.navigateToCommercialInPlaceRentRoll(false);
        rentRollActions.uncheckIsInspectedCheckboxByRowNumber();
    });

    it("ID239: # col. (auto)", () => {
        rentRollActions.verifyUnitNumberCells();
    });

    it("ID240: Lease Status col", () => {
        rentRollActions.chooseLeaseStatusesByRowNumber(commonData().existLeaseStatuses);
    });

    it("ID241: Tenant Name col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterTenantNameByRowNumber(testData.id241.tenantName)
            .verifyTenantNameByRowNumber(commonData().existLeaseStatuses[0], testData.id241.tenantName)
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[1])
            .verifyTenantNameByRowNumber(commonData().existLeaseStatuses[1]);
    });

    it("ID242: Use col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        const defaultUseValue = testData.id242.useTexts[testData.id242.useTexts.length - 1];
        rentRollActions.verifyUseCellTextByRowNumber(defaultUseValue);
        testData.id242.useRadios.forEach((useValue, i) => {
            navSectionActions.navigateToCommercialUnits();
            commercialUnitsActions.clickCommercialUnitTabByIndex()
                .clickRadioButtonByValueAndUnitIndex(useValue);
            navSectionActions.navigateToCommercialInPlaceRentRoll();
            rentRollActions.verifyUseCellTextByRowNumber(testData.id242.useTexts[i]);
        });
    });

    it("ID243: Lease Start Date col", () => {
        const cellName = "Start";
        checkDateColumnByCellName(cellName);
    });

    it.skip("ID244: Lease Expiration Date col", () => {
        const cellName = "Expiry";
        checkDateColumnByCellName(cellName);
    });

    function checkDateColumnByCellName(cellName) {
        rentRollActions.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterLeaseStartDateByRowNumber(cellName, getTodayDateString("/"))
            .verifyLeaseStartDateByRowNumber(cellName, commonData().existLeaseStatuses[0], getTodayDateString("/"))
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[1])
            .verifyLeaseStartDateByRowNumber(cellName, commonData().existLeaseStatuses[1])
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterLeaseStartDateByRowNumber(cellName, testData.leaseDates.wrongFormatLeaseDate)
            .verifyLeaseStartDateByRowNumber(cellName, commonData().existLeaseStatuses[0], testData.leaseDates.wrongFormatLeaseDate);
    }

    it("ID245: SF col", () => {
        rentRollActions.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.enterUnitSFByUnitIndex(commonData().squareFeet);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.verifySquareFeetByRowNumber(commonData().squareFeet);
    });

    it("ID246: Annual Rent col", () => {
        prepareRentRollTableForBasisTest(commonData().squareFeet);
        rentRollActions.verifyAnnualRentCellSquareFootByRowNumber(commonData().rentPerSF, commonData().squareFeet)
            .clearRentPerSFByRowNumber()
            .clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(commonData().monthlyRent)
            .verifyAnnualRentMonthlyByRowNumber(commonData().monthlyRent)
            .clearMonthlyRentByRowNumber()
            .clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(commonData().annualRent)
            .clearAnnualRentByRowNumber()
            .clickPerSquareFootButton(false);
    });

    it("ID247: Monthly Rent col", () => {
        prepareRentRollTableForBasisTest(testData.id247.squareFeet);
        rentRollActions.verifyMonthlyRentPerSFByRowNumber(commonData().rentPerSF, testData.id247.squareFeet)
            .clearRentPerSFByRowNumber()
            .clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(commonData().monthlyRent)
            .clearMonthlyRentByRowNumber()
            .clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(commonData().annualRent)
            .verifyMonthlyRentAnnuallyByRowNumber(commonData().annualRent)
            .clearAnnualRentByRowNumber()
            .clickPerSquareFootButton(false);
    });

    it("ID248: Rent PerSF col", () => {
        prepareRentRollTableForBasisTest(testData.id248.squareFeet);
        rentRollActions.clearRentPerSFByRowNumber()
            .clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(commonData().monthlyRent)
            .verifyRentPerSFMonthlyByRowNumber(commonData().monthlyRent, testData.id248.squareFeet)
            .clearMonthlyRentByRowNumber()
            .clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(commonData().annualRent)
            .verifyRentPerSFAnnuallyByRowNumber(commonData().annualRent, testData.id248.squareFeet)
            .clearAnnualRentByRowNumber()
            .clickPerSquareFootButton(false);
    });

    function prepareRentRollTableForBasisTest(squareFeet) {
        rentRollActions.chooseLeaseStatusByRowNumber(testData.commonData.existLeaseStatuses[0]);
        navSectionActions.navigateToCommercialUnits();
        commercialUnitsActions.enterUnitSFByUnitIndex(squareFeet)
            .clickSaveButton()
            .verifyProgressBarNotExist()
            .clickSaveButton()
            .verifyProgressBarNotExist();
        navSectionActions.navigateToCommercialInPlaceRentRoll(false);
        rentRollActions.enterRentPerSFByRowNumber(testData.commonData.rentPerSF);
    }

    it("ID249: SF Total", () => {
        prepareRentRollTableForTotalCells();
        rentRollActions.verifySFTotal(commonData().squareFeetList);
        changeToDefaultTable(false);
    });

    it("ID250: Annually Rent Total", () => {
        prepareRentRollTableForTotalCells();
        rentRollActions.clickAnnuallyBasisButton()
            .enterListAnnuallyRent(commonData().leaseStatusesList, testData.id250.annualRents)
            .verifyAnnuallyRentTotal(commonData().leaseStatusesList, testData.id250.annualRents)
            .clearRentCellsByName(commonData().leaseStatusesList, "annually");
        changeToDefaultTable();
    });

    it("ID251: Monthly Rent Total", () => {
        prepareRentRollTableForTotalCells();
        rentRollActions.clickMonthlyBasisButton()
            .enterListMonthlyRent(commonData().leaseStatusesList, testData.id251.monthlyRents)
            .verifyMonthlyRentTotal(commonData().leaseStatusesList, testData.id251.monthlyRents)
            .clearRentCellsByName(commonData().leaseStatusesList, "monthly");
        changeToDefaultTable();
    });

    it("ID252: PerSF Rent Total", () => {
        prepareRentRollTableForTotalCells();
        rentRollActions.enterListPerSF(commonData().leaseStatusesList, testData.id252.perSFList)
            .verifyPerSFTotal(commonData().leaseStatusesList, testData.id252.perSFList, commonData().squareFeetList)
            .clearRentCellsByName(commonData().leaseStatusesList, "perSF");
        changeToDefaultTable(false);
    });

    function changeToDefaultTable(isWithPerSFClick = true) {
        if (isWithPerSFClick) {
            rentRollActions.clickPerSquareFootButton(false);
        }
        navSectionActions.navigateToPropertySummary();
        propertySummaryActions.enterNumberOfCommercialUnits();
        navSectionActions.navigateToCommercialInPlaceRentRoll();
    }

    function prepareRentRollTableForTotalCells() {
        rentRollActions.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        navSectionActions.navigateToPropertySummary();
        propertySummaryActions.enterNumberOfCommercialUnits(commonData().numberOfUnits);
        navSectionActions.clickCommercialUnits()
            .clickYesButton();
        commercialUnitsActions.enterListOfCommercialUnits(commonData().squareFeetList, commonData().numberOfUnits);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        rentRollActions.chooseListLeaseStatuses(commonData().leaseStatusesList, commonData().numberOfUnits);
    }

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePage();
        homepageActions.deleteReport(testData.reportCreationData.reportNumber);
    });
});
