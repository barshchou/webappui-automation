import tesData from "../../../../../fixtures/not_full_reports/income/residential/rent_comps/QA-4342.fixtures";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../../actions";

describe("Verify the display of the Unit grid with the added comparable unit on the '$ Rent Comps' page", 
    { tags:[ "@income", "@residential", "@rent_comps" ] }, () => {

        beforeEach("Login action", () => {
            createReport(tesData.reportCreationData);
        });

        it("[QA-4342] Uncategorized table with default columns", () => {
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(tesData.includePerRoomCheckbox);
            _NavigationSection.navigateToResidentialRentComps();
            Income._Residential.RentComps.BaseActions.verifyUnitSelected()
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
        });

        it("[QA-4342] Developers forecast test", () => {
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(tesData.uncategorizedData.devForecastLabel);
            _NavigationSection.navigateToResidentialRentComps();
            Income._Residential.RentComps.BaseActions.verifyUnitSelected()
                .selectComparableByAddress(tesData.uncategorizedData.compData.address)
                .verifyUncategorizedSubjectDevForecast(tesData.uncategorizedData.devForecastText);
        });

        it("[QA-4342] Bathrooms column test", () => {
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(tesData.uncategorizedData.bathroomsLabel);
            _NavigationSection.navigateToResidentialRentComps();
            Income._Residential.RentComps.BaseActions.verifyUnitSelected()
                .selectComparableByAddress(tesData.uncategorizedData.compData.address)
                .verifyUncategorizedBathroomsRowCell(0, tesData.uncategorizedData.compData.bathrooms);
        });

        it("[QA-4342] Bedrooms category, subject market rate test", () => {
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.goToPropSummaryWithSaveSaveClickFirst();
            Property._Summary.goToEditBuildingDescriptionSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(tesData.bedroomCategory.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(tesData.bedroomCategory.bedroomsNumber)
                .enterRentTypeCellByRowNumber(tesData.bedroomCategory.rentType)
                .checkCheckboxByLabel(tesData.includePerRoomCheckbox);
            _NavigationSection.navigateToResidentialRentComps();
            Income._Residential.RentComps.BaseActions.verifyUnitSelected()
                .verifyProgressBarNotExist()
                .selectComparableByAddress(tesData.bedroomCategory.compData.address)
                .verifyBedroomTableHeader(tesData.bedroomCategory.bedroomsNumber)
                .verifyBedroomMarketRateSummaryExist(tesData.bedroomCategory.bedroomsNumber)
                .verifyBedroomSubjectColumnText(tesData.bedroomCategory.bedroomsNumber, 
                    tesData.bedroomCategory.subjectColumnText)
                .verifyComparableBedroomTableByNumber(0, tesData.bedroomCategory.compData);
        });
    });
