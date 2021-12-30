import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/gridCommInPlaceRentRoll.fixtures";
import {commonData} from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/gridCommInPlaceRentRoll.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Final from "../../../../../actions/final/final.manager";
import Property from "../../../../../actions/property/property.manager";
import {getTodayDateString} from "../../../../../../utils/date.utils";
import {waitForTime} from "../../../../../../utils/waiters.utils";

describe("Commercial In-Place Rent Roll grid tests", () => {
    beforeEach("Login and navigate to commercial In-Place Rent Roll", () => {
        cy.login();
        waitForTime();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    // });

    it("ID238: Inspected col. (checkbox)", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .checkIsInspectedCheckboxByRowNumber();
        NavigationSection.clickCommercialStabRentRollButton()
            .clickYesButton()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyIsInspectedChecked();
        NavigationSection.navigateToUnitInspection();
        Final.UnitInspection.verifyNumberOfInspectedUnitsCommentary()
            .clickSaveButton();
        NavigationSection.navigateToCommercialInPlaceRentRoll(false);
        // Income.Commercial.InPlaceRentRoll.uncheckIsInspectedCheckboxByRowNumber();
    });

    it("ID239: # col. (auto)", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.verifyUnitNumberCells();
    });

    it("ID240: Lease Status col", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusesByRowNumber(commonData().existLeaseStatuses);
    });

    it("ID241: Tenant Name col", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterTenantNameByRowNumber(testData.id241.tenantName)
            .verifyTenantNameByRowNumber(commonData().existLeaseStatuses[0], testData.id241.tenantName)
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[1])
            .verifyTenantNameByRowNumber(commonData().existLeaseStatuses[1]);
    });

    it("ID242: Use col", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        const defaultUseValue = testData.id242.useTexts[testData.id242.useTexts.length - 1];
        Income.Commercial.InPlaceRentRoll.verifyUseCellTextByRowNumber(defaultUseValue);
        testData.id242.useRadios.forEach((useValue, i) => {
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.clickCommercialUnitTabByIndex()
                .clickRadioButtonByValueAndUnitIndex(useValue);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.verifyUseCellTextByRowNumber(testData.id242.useTexts[i]);
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
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterLeaseStartDateByRowNumber(cellName, getTodayDateString("/"))
            .verifyLeaseStartDateByRowNumber(cellName, commonData().existLeaseStatuses[0], getTodayDateString("/"))
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[1])
            .verifyLeaseStartDateByRowNumber(cellName, commonData().existLeaseStatuses[1])
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterLeaseStartDateByRowNumber(cellName, testData.leaseDates.wrongFormatLeaseDate)
            .verifyLeaseStartDateByRowNumber(cellName, commonData().existLeaseStatuses[0], testData.leaseDates.wrongFormatLeaseDate);
    }

    it("ID245: SF col", () => {
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(commonData().squareFeet);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifySquareFeetByRowNumber(commonData().squareFeet);
    });

    it("ID246: Annual Rent col", () => {
        prepareRentRollTableForBasisTest(commonData().squareFeet);
        Income.Commercial.InPlaceRentRoll.verifyAnnualRentCellSquareFootByRowNumber(commonData().rentPerSF, commonData().squareFeet)
            .clearRentPerSFByRowNumber()
            .clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(commonData().monthlyRent)
            .verifyAnnualRentMonthlyByRowNumber(commonData().monthlyRent)
            .clearMonthlyRentByRowNumber()
            .clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(commonData().annualRent);
            // .clearAnnualRentByRowNumber()
            // .clickPerSquareFootButton(false);
    });

    it("ID247: Monthly Rent col", () => {
        prepareRentRollTableForBasisTest(testData.id247.squareFeet);
        Income.Commercial.InPlaceRentRoll.verifyMonthlyRentPerSFByRowNumber(commonData().rentPerSF, testData.id247.squareFeet)
            .clearRentPerSFByRowNumber()
            .clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(commonData().monthlyRent)
            .clearMonthlyRentByRowNumber()
            .clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(commonData().annualRent)
            .verifyMonthlyRentAnnuallyByRowNumber(commonData().annualRent);
            // .clearAnnualRentByRowNumber()
            // .clickPerSquareFootButton(false);
    });

    it("ID248: Rent PerSF col", () => {
        prepareRentRollTableForBasisTest(testData.id248.squareFeet);
        Income.Commercial.InPlaceRentRoll.clearRentPerSFByRowNumber()
            .clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(commonData().monthlyRent)
            .verifyRentPerSFMonthlyByRowNumber(commonData().monthlyRent, testData.id248.squareFeet)
            .clearMonthlyRentByRowNumber()
            .clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(commonData().annualRent)
            .verifyRentPerSFAnnuallyByRowNumber(commonData().annualRent, testData.id248.squareFeet);
            // .clearAnnualRentByRowNumber()
            // .clickPerSquareFootButton(false);
    });

    function prepareRentRollTableForBasisTest(squareFeet) {
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.commonData.existLeaseStatuses[0]);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(squareFeet);
            // .clickSaveButton()
            // .verifyProgressBarNotExist()
            // .clickSaveButton()
            // .verifyProgressBarNotExist();
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.enterRentPerSFByRowNumber(testData.commonData.rentPerSF);
    }

    it("ID249: SF Total", () => {
        prepareRentRollTableForTotalCells();
        Income.Commercial.InPlaceRentRoll.verifySFTotal(commonData().squareFeetList);
        // changeToDefaultTable(false);
    });

    it("ID250: Annually Rent Total", () => {
        prepareRentRollTableForTotalCells();
        Income.Commercial.InPlaceRentRoll.clickAnnuallyBasisButton()
            .enterListAnnuallyRent(commonData().leaseStatusesList, testData.id250.annualRents)
            .verifyAnnuallyRentTotal(commonData().leaseStatusesList, testData.id250.annualRents)
            .clearRentCellsByName(commonData().leaseStatusesList, "annually");
        // changeToDefaultTable();
    });

    it("ID251: Monthly Rent Total", () => {
        prepareRentRollTableForTotalCells();
        Income.Commercial.InPlaceRentRoll.clickMonthlyBasisButton()
            .enterListMonthlyRent(commonData().leaseStatusesList, testData.id251.monthlyRents)
            .verifyMonthlyRentTotal(commonData().leaseStatusesList, testData.id251.monthlyRents)
            .clearRentCellsByName(commonData().leaseStatusesList, "monthly");
        // changeToDefaultTable();
    });

    it("ID252: PerSF Rent Total", () => {
        prepareRentRollTableForTotalCells();
        Income.Commercial.InPlaceRentRoll.enterListPerSF(commonData().leaseStatusesList, testData.id252.perSFList)
            .verifyPerSFTotal(commonData().leaseStatusesList, testData.id252.perSFList, commonData().squareFeetList)
            .clearRentCellsByName(commonData().leaseStatusesList, "perSF");
        // changeToDefaultTable(false);
    });

    function changeToDefaultTable(isWithPerSFClick = true) {
        if (isWithPerSFClick) {
            Income.Commercial.InPlaceRentRoll.clickPerSquareFootButton(false);
        }
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits();
        NavigationSection.navigateToCommercialInPlaceRentRoll();
    }

    function prepareRentRollTableForTotalCells() {
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(commonData().numberOfUnits);
        NavigationSection.clickCommercialUnits()
            .clickYesButton();
        Property.CommercialUnits.enterListOfCommercialUnits(commonData().squareFeetList, commonData().numberOfUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(commonData().leaseStatusesList, commonData().numberOfUnits);
    }

    afterEach("Delete report", () => {
        cy.restoreLocalStorage();
        Income.Commercial.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});
