import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/gridCommInPlaceRentRoll.fixtures";
import {commonData} from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/gridCommInPlaceRentRoll.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Final from "../../../../../actions/final/final.manager";
import Property from "../../../../../actions/property/property.manager";
import {getTodayDateString} from "../../../../../../utils/date.utils";

describe("Commercial In-Place Rent Roll grid tests", () => {
    beforeEach("Login and navigate to commercial In-Place Rent Roll", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
    });

    it("ID238: Inspected col. (checkbox)", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .checkIsInspectedCheckboxByRowNumber();
        NavigationSection.clickCommercialStabRentRollButton()
            .clickYesButton()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyIsInspectedChecked();
        NavigationSection.navigateToUnitInspection();
        Final.UnitInspection.verifyNumberOfInspectedUnitsCommentary();
        deleteReport();
    });

    it("ID239: # col. (auto)", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.verifyUnitNumberCells();
        deleteReport();
    });

    it("ID240: Lease Status col", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusesByRowNumber(commonData().existLeaseStatuses);
        deleteReport();
    });

    it("ID241: Tenant Name col", () => {
        NavigationSection.verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterTenantNameByRowNumber(testData.id241.tenantName)
            .verifyTenantNameByRowNumber(commonData().existLeaseStatuses[0], testData.id241.tenantName)
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[1])
            .verifyTenantNameByRowNumber(commonData().existLeaseStatuses[1]);
        deleteReport();
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
        deleteReport();
    });

    it("ID243: Lease Start Date col", () => {
        const cellName = "Start";
        checkDateColumnByCellName(cellName);
        deleteReport();
    });

    it("ID244: Lease Expiration Date col", () => {
        const cellName = "Expiry";
        checkDateColumnByCellName(cellName);
        deleteReport();
    });

    function checkDateColumnByCellName(cellName) {
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterLeaseDateByRowNumber(cellName, getTodayDateString("/"))
            .verifyLeaseDateByRowNumber(cellName, commonData().existLeaseStatuses[0], getTodayDateString("/"))
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[1])
            .verifyLeaseDateByRowNumber(cellName, commonData().existLeaseStatuses[1])
            .chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0])
            .enterLeaseDateByRowNumber(cellName, testData.leaseDates.wrongFormatLeaseDate)
            .verifyLeaseDateByRowNumber(cellName, commonData().existLeaseStatuses[0], testData.leaseDates.wrongFormatLeaseDate);
    }

    it("ID245: SF col", () => {
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(commonData().existLeaseStatuses[0]);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(commonData().squareFeet);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifySquareFeetByRowNumber(commonData().squareFeet);
        deleteReport();
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
        deleteReport();
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
        deleteReport();
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
        deleteReport();
    });

    function prepareRentRollTableForBasisTest(squareFeet) {
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.commonData.existLeaseStatuses[0]);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(squareFeet);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.enterRentPerSFByRowNumber(testData.commonData.rentPerSF);
    }

    function deleteReport() {
        Income.Commercial.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    }
});
