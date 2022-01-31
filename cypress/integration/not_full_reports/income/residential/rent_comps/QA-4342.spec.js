import tesData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4342.fixtures";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("[Income -  Residential - Rent Comps] Verify the display of the Unit grid with the added comparable unit " +
    "on the '$ Rent Comps' page ", () => {
    beforeEach("Login action", () => {
        createReport(tesData.reportCreationData);
    });

    it("Uncategorized table with default columns" , () => {
        NavigationSection.navigateToRentComps();
        Income.Residential.RentComps.BaseActions.clickUnitSwitchButton()
            .verifyUnitSelected()
            .selectComparableByAddress(tesData.uncategorizedData.compData.address)
            .checkDisplaySquareFootageForCompsCheckbox()
            .verifyUncategorizedHeader()
            .verifyComparableUncategorizedDefaultCellsByRow(0, tesData.uncategorizedData.compData)
            .verifyUncategorizedMinCell(tesData.uncategorizedData.minValue)
            .verifyUncategorizedAverageCell(tesData.uncategorizedData.averageValue)
            .verifyUncategorizedMaxCell(tesData.uncategorizedData.maxValue)
            .verifyRentRollSummaryExist()
            .verifyUncategorizedSubjectMinExist()
            .verifyUncategorizedSubjectAverageExist()
            .verifyUncategorizedSubjectMaxExist()
            .verifyUncategorizedSubjectColumnText(tesData.uncategorizedData.subjectColumnText)
            .verifyUncategorizedSquareFootageCells(0, tesData.uncategorizedData.compData);
        deleteReport(tesData.reportCreationData.reportNumber);
    });

    it("Developers forecast test" , () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(tesData.uncategorizedData.devForecastLabel);
        NavigationSection.openRentCompsInResidential();
        Income.Residential.RentComps.BaseActions.clickUnitSwitchButton()
            .verifyUnitSelected()
            .selectComparableByAddress(tesData.uncategorizedData.compData.address)
            .verifyUncategorizedSubjectDevForecast(tesData.uncategorizedData.devForecastText);
        deleteReport(tesData.reportCreationData.reportNumber);
    });

    it("Bathrooms column test", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(tesData.uncategorizedData.bathroomsLabel);
        NavigationSection.openRentCompsInResidential();
        Income.Residential.RentComps.BaseActions.clickUnitSwitchButton()
            .verifyUnitSelected()
            .selectComparableByAddress(tesData.uncategorizedData.compData.address)
            .verifyUncategorizedBathroomsRowCell(0, tesData.uncategorizedData.compData.bathrooms);
        deleteReport(tesData.reportCreationData.reportNumber);
    });

    it("Bedrooms category, subject market rate test", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.goToPropSummaryWithSaveSaveClickFirst();
        Property.Summary.enterNumberOfResUnits(tesData.bedroomCategory.numberOfUnits)
            .goBackWithSave();
        Income.Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(tesData.bedroomCategory.bedroomsNumber)
            .enterRentTypeCellByRowNumber(tesData.bedroomCategory.rentType);
        NavigationSection.openRentCompsInResidential();
        Income.Residential.RentComps.BaseActions.clickUnitSwitchButton()
            .verifyUnitSelected()
            .selectComparableByAddress(tesData.bedroomCategory.compData.address)
            .verifyBedroomTableHeader(tesData.bedroomCategory.bedroomsNumber)
            .verifyBedroomMarketRateSummaryExist(tesData.bedroomCategory.bedroomsNumber)
            .verifyBedroomSubjectColumnText(tesData.bedroomCategory.bedroomsNumber, tesData.bedroomCategory.subjectColumnText)
            .verifyComparableBedroomTableByNumber(0, tesData.bedroomCategory.compData);
        deleteReport(tesData.reportCreationData.reportNumber);
    });
});