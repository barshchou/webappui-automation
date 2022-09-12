import rentCompsPage from "../../../../pages/income/residential/rent_comps/rentComps.page";
import { getTodayDateString, getTodayDay, isDateHasCorrectFormat } from "../../../../../utils/date.utils";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../../../utils/numbers.utils";
import BaseActionsExt from "../../../base/base.actions.ext";

class RentCompsActions extends BaseActionsExt<typeof rentCompsPage> {

    verifyGCText(conclusionType: string): RentCompsActions {
        rentCompsPage.generatedCommentary.should("exist")
            .should("contain.text", RentCompsActions.getCommentary(conclusionType));
        return this;
    }

    private static getCommentary(conclusionType: string): string {
        if (conclusionType === "AS_IS") {
            return "In order to gauge the reasonableness of the contract rents, " +
                "we have examined the following rental activity in the submarket:";
        } else {
            return "In order to forecast the market rents, " +
                "we have examined the following rental activity in the submarket:";
        }
    }

    verifyUnitSwitchBackground(isChosen = true): RentCompsActions {
        if (isChosen) {
            rentCompsPage.unitSwitchButton.should("have.css", "background-color", "rgb(66, 96, 211)");
        } else {
            rentCompsPage.unitSwitchButton.should("have.css", "background-color", "rgb(255, 255, 255)");
        }
        return this;
    }

    verifyBuildingSwitchBackground(isChosen = true): RentCompsActions {
        if (isChosen) {
            rentCompsPage.buildingSwitchButton.should("have.css", "background-color", "rgb(66, 96, 211)");
        } else {
            rentCompsPage.buildingSwitchButton.should("have.css", "background-color", "rgb(255, 255, 255)");
        }
        return this;
    }

    clickUnitSwitchButton(): RentCompsActions {
        this.verifyUnitSwitchBackground(false);
        rentCompsPage.unitSwitchButton.should("be.enabled").click();
        return this;
    }

    clickBuildingSwitchButton(): RentCompsActions {
        this.verifyBuildingSwitchBackground(false);
        rentCompsPage.buildingSwitchButton.should("be.enabled").click();
        return this;
    }

    verifyBuildingSelected(): RentCompsActions {
        rentCompsPage.buildingSwitchButton.should("have.attr", "aria-pressed", "true");
        this.verifyBuildingSwitchBackground();
        return this;
    }

    verifyUnitSelected(): RentCompsActions {
        rentCompsPage.unitSwitchButton.should("have.attr", "aria-pressed", "true");
        this.verifyUnitSwitchBackground();
        return this;
    }

    clickSwitchConfirmButton(basis: string): RentCompsActions {
        rentCompsPage.switchSearchConfirmButton.should("contain.text", "Search")
            .and("contain.text", `Per ${basis}`);
        rentCompsPage.switchSearchConfirmButton.click();
        return this;
    }

    clickUnitTypesArrowButton(): RentCompsActions {
        rentCompsPage.unitTypesArrowButton.scrollIntoView().should("be.visible").click();
        return this;
    }

    changeStateOfCheckboxByQaAttr(attribute: string | number, isToCheck = true): RentCompsActions {
        if (isToCheck) {
            rentCompsPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "false").check({ force: true }).should("have.value", "true");
        } else {
            rentCompsPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "true").uncheck({ force: true }).should("have.value", "false");
        }
        
        return this;
    }

    verifyCheckboxByQaAttr(attribute: string | number, isChecked = true): RentCompsActions {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", `${isChecked}`);
        return this;
    }

    checkListOfCheckboxesByQa(attributes: Array<string | number>): RentCompsActions {
        attributes.forEach(attr => {
            this.changeStateOfCheckboxByQaAttr(attr);
        });
        return this;
    }

    uncheckListOfCheckboxesByQa(attributes: Array<string | number>): RentCompsActions {
        attributes.forEach(attr => {
            this.changeStateOfCheckboxByQaAttr(attr, false);
        });
        return this;
    }

    verifyPopUpTextExist(basis: string): RentCompsActions {
        rentCompsPage.changeCompTypePopUpMessage.should("exist");
        rentCompsPage.getAreYouSurePopUp(basis).should("exist");
        return this;
    }

    verifySearchCancelExists(): RentCompsActions {
        rentCompsPage.searchCancelButton.should("exist");
        return this;
    }

    changeToBuildingSearch(): RentCompsActions {
        this.clickBuildingSwitchButton()
            .verifyPopUpTextExist("Building")
            .verifySearchCancelExists()
            .clickSwitchConfirmButton("Building")
            .verifyBuildingSelected();
        return this;
    }

    changeToUnitSearch(): RentCompsActions {
        this.clickUnitSwitchButton()
            .verifyPopUpTextExist("Unit")
            .verifySearchCancelExists()
            .clickSwitchConfirmButton("Unit")
            .verifyUnitSelected();
        return this;
    }

    enterValueToInput(fieldName: string, value: string | number): RentCompsActions {
        this.clearInput(fieldName);
        let inputField;
        let placeholder;
        switch (fieldName) {
            case "minRent":
                inputField = rentCompsPage.minRentInput;
                placeholder = "$0";
                break;
            case "maxRent":
                inputField = rentCompsPage.maxRentInput;
                placeholder = "$5,000";
                break;
            case "minSF":
                inputField = rentCompsPage.minSquareFeet;
                placeholder = "0";
                break;
            case "maxSF":
                inputField = rentCompsPage.maxSquareFeet;
                placeholder = "5,000";
                break;
            default:
                cy.log('Incorrect field name was provided');
                break;
        }
        inputField.scrollIntoView().should("be.visible").should("have.attr", "placeholder", placeholder)
            .type(value);
        this.verifyEnteredValueToInput(fieldName, value);
        return this;
    }

    verifyEnteredValueToInput(fieldName: string, value: string| number = ""): RentCompsActions {
        let inputField;
        let valueToBe;
        if (typeof value === "number") {
            if (isHasDecimalPartMoreNumberOfDigits(value)) {
                valueToBe = numberWithCommas(cutDecimalPartToNumberOfDigits(value));
            } else {
                valueToBe = numberWithCommas(value);
            }
        } else {
            valueToBe = value;
        }
        switch (fieldName) {
            case "minRent":
                inputField = rentCompsPage.minRentInput;
                break;
            case "maxRent":
                inputField = rentCompsPage.maxRentInput;
                break;
            case "minSF":
                inputField = rentCompsPage.minSquareFeet;
                break;
            case "maxSF":
                inputField = rentCompsPage.maxSquareFeet;
                break;
            default:
                cy.log('Incorrect field name was provided');
                break;
        }
        inputField.should("have.value", valueToBe);
        return this;
    }

    clearInput(fieldName: string): RentCompsActions {
        switch (fieldName) {
            case "minRent":
                rentCompsPage.minRentInput.clear();
                break;
            case "maxRent":
                rentCompsPage.maxRentInput.clear();
                break;
            case "minSF":
                rentCompsPage.minSquareFeet.clear();
                break;
            case "maxSF":
                rentCompsPage.maxSquareFeet.clear();
                break;
            default:
                cy.log('Incorrect field name was provided');
                break;
        }
        return this;
    }

    clickNumberOfBedroomsArrow(): RentCompsActions {
        rentCompsPage.numberOfBedroomsArrowButton.should("be.enabled").click();
        return this;
    }

    clickSourceOfInfoButton(): RentCompsActions {
        rentCompsPage.sourceOfInfoArrow.should("be.enabled").click();
        return this;
    }

    clearDateInput(type = "min"): this {
        switch (type) {
            case "max":
                rentCompsPage.maxDateValueInput.clear();
                break;
            default:
                rentCompsPage.minDateValueInput.clear();
        }
        return this;
    }

    enterDateInput(date: string | number, type = "min"): RentCompsActions {
        this.clearDateInput(type);
        const isDateCorrect = isDateHasCorrectFormat(date);
        switch (type) {
            case "max":
                rentCompsPage.maxDateValueInput.scrollIntoView().should("be.visible").type(`${date}`);
                if (isDateCorrect) {
                    this.verifyEnteredDate("max", `${date}`);
                } else {
                    rentCompsPage.errorMessage.should("exist");
                }
                break;
            default:
                rentCompsPage.minDateValueInput.scrollIntoView().should("be.visible").type(`${date}`);
                if (isDateCorrect) {
                    this.verifyEnteredDate("min", `${date}`);
                } else {
                    rentCompsPage.errorMessage.should("exist");
                }
        }
        return this;
    }

    clickPickerButton(type = "min"): RentCompsActions {
        switch (type) {
            case "max":
                rentCompsPage.dateMaxPickerButton.should("be.enabled").click();
                break;
            default:
                rentCompsPage.dateMinPickerButton.should("be.enabled").click();
        }
        return this;
    }

    clickDayInPicker(day: string | number): RentCompsActions {
        day = day ?? Number(getTodayDay());
        rentCompsPage.getDayInCurrentMonthPicker(day).scrollIntoView().should("be.visible").click();
        return this;
    }

    verifyEnteredDate(type: string, date: string | number): RentCompsActions {
        date = date ?? getTodayDateString();
        if (type === "min") {
            rentCompsPage.dateMinInputToCheckValue.should("have.value", date);
        } else {
            rentCompsPage.dateMaxInputToCheckValue.should("have.value", date);
        }
        return this;
    }

    selectDayFromPicker(type: string, day: string | number): RentCompsActions {
        this.clickPickerButton(type);
        rentCompsPage.pickerCalendar.should("be.visible");
        this.clickDayInPicker(day);
        return this;
    }

    clickAmenitiesArrow(): RentCompsActions {
        rentCompsPage.amenitiesArrowButton.should("be.enabled").click();
        return this;
    }

    clickResetFiltersButton(): RentCompsActions {
        rentCompsPage.resetFiltersButton.click();
        return this;
    }

    selectSortByOptionByValue(value: string): RentCompsActions {
        this.verifyLoadingDoesNotExist();
        rentCompsPage.sortByDropdown.should("be.visible").click({ force: true });
        rentCompsPage.getSortDropdownOptionByValue(value).click();
        rentCompsPage.sortByDropdown.should("have.text", value);
        return this;
    }

    verifyLoadingDoesNotExist(): RentCompsActions {
        rentCompsPage.loadingModal.should("not.exist");
        return this;
    }

    verifyPhotosExistAndNavigateByPhotos(comparableIndex: number): RentCompsActions {
        this.verifyLoadingDoesNotExist();
        rentCompsPage.comparableItems.eq(comparableIndex).then($item => {
            cy.wrap($item).find(rentCompsPage.photoElementLocator).then($photos => {
                this.navigateThroughAllPhotosInComparable($photos, comparableIndex)
                    .navigateThroughAllPhotosInComparable($photos, comparableIndex, "back");
            });
        });
        return this;
    }

    navigateThroughAllPhotosInComparable(jQueryPhotoElements: JQuery<HTMLElement>, comparableIndex: number,
        direction = "forward"): RentCompsActions {
        let numberOfPhotos = jQueryPhotoElements.length;
        let style = "";
        for (let i = 0; i < numberOfPhotos; i++) {
            let currentPhoto = cy.wrap(jQueryPhotoElements).eq(i);
            currentPhoto.should("exist");
            let currentStyle = jQueryPhotoElements.eq(i).attr("style");
            currentPhoto.invoke("attr", "style").should("not.equal", style);
            if (direction === "forward") {
                rentCompsPage.nextPhotoButtons.eq(comparableIndex).realClick();
            } else {
                rentCompsPage.prevPhotoButtons.eq(comparableIndex).realClick();
            }
            this.verifyLoadingDoesNotExist();
            style = currentStyle;
        }
        return this;
    }

    verifyLoadingModalExist(): RentCompsActions {
        rentCompsPage.loadingModal.should("exist");
        return this;
    }

    clickZoomInButton(): RentCompsActions {
        rentCompsPage.zoomInButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesNotExist();
        return this;
    }

    clickZoomOutButton(): RentCompsActions {
        rentCompsPage.zoomOutButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesNotExist();
        return this;
    }

    clickAllSelectComparableButtons(): RentCompsActions {
        rentCompsPage.selectComparableButtons.then(buttons => {
            const buttonsLength = buttons.length;
            for (let i = 0; i < buttonsLength; i++) {
                if (i !== 0) {
                    rentCompsPage.selectedMapComparableRemoveButtons.eq(i).should("not.exist");
                }
                cy.wrap(buttons.eq(i)).should("be.enabled").click({ force: true });
                this.verifyComparableSelectedByIndex(i);
            }
        });
        return this;
    }

    selectComparableByIndex(index = 0): RentCompsActions {
        rentCompsPage.selectComparableButtons.eq(index).click( { force: true } );
        return this;
    }

    verifyComparableSelectedByIndex(index = 0): RentCompsActions {
        rentCompsPage.selectedMapComparableRemoveButtons.eq(index).should("exist");
        return this;
    }

    selectComparableByAddress(address: string): RentCompsActions {
        rentCompsPage.getSelectButtonByAddress(address).click({ force: true });
        this.verifyComparableSelectedByAddress(address);
        return this;
    }

    verifyComparableSelectedByAddress(address: string): RentCompsActions {
        rentCompsPage.getRemoveButtonByAddress(address).should("exist");
        return this;
    }

    verifyUncategorizedCompsNumberAsSelected(): RentCompsActions {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.indexColumnCellsSelector).then(indexCells => {
            rentCompsPage.selectedMapComparableRemoveButtons.should("have.length", indexCells.length);
        });
        return this;
    }

    verifySearchResultIsShown(searchResultIndex = 0): RentCompsActions {
        rentCompsPage.searchResultsRows.eq(searchResultIndex).should("be.visible");
        return this;
    }

    openAddNewComparableForm(address: string, searchResIndex = 0): RentCompsActions {
        this.verifyLoadingDoesNotExist();
        rentCompsPage.addNewRentCompButton.scrollIntoView().should("be.enabled").click();
        rentCompsPage.findRentCompSection.should("be.visible");
        rentCompsPage.submitButton.should("be.disabled");
        rentCompsPage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        rentCompsPage.findRentCompSection.click();
        rentCompsPage.advancedSearchButton.should("be.visible");
        rentCompsPage.submitButton.should("not.be.disabled").click();
        rentCompsPage.searchResultsRows.eq(searchResIndex).click();
        rentCompsPage.submitButton.should("not.be.disabled").click();
        rentCompsPage.newUnitForm.should("be.visible");
        return this;
    }

    openAddNewComparableFormAdvanced(comparableData: Readonly<{ state: string, address: string, 
        id: string | number }>): RentCompsActions {
        this.verifyLoadingDoesNotExist();
        rentCompsPage.addNewRentCompButton.scrollIntoView().click();
        rentCompsPage.advancedSearchButton.click();
        rentCompsPage.selectStateButton.click();
        rentCompsPage.getStateByName(comparableData.state).click();
        rentCompsPage.searchAddressField.type(`${comparableData.address}{enter}`)
            .should("have.value", comparableData.address);
        rentCompsPage.findRentCompSection.click();
        rentCompsPage.propertyIdentifierInput.type(`${comparableData.id}`).should("have.value", comparableData.id);
        rentCompsPage.submitButton.click();
        return this;
    }

    private verifyCellText(rowJQueryEl: JQuery<HTMLElement>, cellLocator: string, 
        textToBe: string | number): RentCompsActions {
        cy.wrap(rowJQueryEl).find(cellLocator).should("have.text", textToBe);
        return this;
    }

    private verifyCellExist(rowJQueryEl: JQuery<HTMLElement>, cellLocator: string): RentCompsActions {
        cy.wrap(rowJQueryEl).find(cellLocator).should("exist");
        return this;
    }

    verifyComparableBedroomTableByNumber(index: number, rentCompData: Readonly<{ bedrooms: number | string, 
        rooms: number | string, monthly: string | number, sourceInfoCheck: string, 
        address: string }>): RentCompsActions {
        rentCompsPage.getBedroomTableByNumber(rentCompData.bedrooms)
            .find(rentCompsPage.getCategoryRowByIndexLocator(index))
            .then(row => {
                this.verifyCompRowDefaultCells(row, rentCompData, index);
            });
        return this;
    }

    verifyComparableUncategorizedDefaultCellsByRow(rowIndex: number, rentCompData: Readonly<{bedrooms: number | string,
    rooms: number | string, monthly: string | number, sourceInfoCheck: string, address: string}>): RentCompsActions {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(rowIndex)).then(row => {
            this.verifyCompRowDefaultCells(row, rentCompData, rowIndex);
        });
        return this;
    }

    verifyUncategorizedMinCell(minValue: number | string): RentCompsActions {
        const textToBe = typeof minValue === "string" ? minValue : `$${numberWithCommas(minValue)}`;
        rentCompsPage.uncategorizedMinCell.should("have.text", textToBe);
        return this;
    }

    verifyUncategorizedAverageCell(averageValue: number | string): RentCompsActions {
        const textToBe = typeof averageValue === "string" ? averageValue : `$${numberWithCommas(averageValue)}`;
        rentCompsPage.uncategorizedAverageCell.should("have.text", textToBe);
        return this;
    }

    verifyUncategorizedMaxCell(maxValue: number | string): RentCompsActions {
        const textToBe = typeof maxValue === "string" ? maxValue : `$${numberWithCommas(maxValue)}`;
        rentCompsPage.uncategorizedMaxCell.should("have.text", textToBe);
        return this;
    }

    verifyRentRollSummaryExist(): RentCompsActions {
        rentCompsPage.rentRollSummary.should("exist");
        return this;
    }

    verifyUncategorizedSubjectMinExist(): RentCompsActions {
        rentCompsPage.uncategorizedSubjectMin.should("exist");
        return this;
    }

    verifyUncategorizedSubjectAverageExist(): RentCompsActions {
        rentCompsPage.uncategorizedSubjectAverage.should("exist");
        return this;
    }

    verifyUncategorizedSubjectMaxExist(): RentCompsActions {
        rentCompsPage.uncategorizedSubjectMax.should("exist");
        return this;
    }

    verifyUncategorizedSubjectColumnText(textToBe: string): RentCompsActions {
        rentCompsPage.uncategorizedSubjectColumn.should("have.text", textToBe);
        return this;
    }

    checkDisplaySquareFootageForCompsCheckbox(): RentCompsActions {
        rentCompsPage.displaySquareFootageForCompsCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyUncategorizedSquareFootageCells(index: number, rentCompData: Readonly<{squareFootage: number | string,
                                            rentPSF: number | string}>): RentCompsActions {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(index)).then(row => {
            this.verifyRentPsfSfCompRowCells(row, rentCompData);
        });
        return this;
    }

    private verifyRentPsfSfCompRowCells(JQueryRowElement: JQuery<HTMLElement>,
        rentCompData: Readonly<{squareFootage: number | string, rentPSF: number | string}>): RentCompsActions {
        const sfText = typeof rentCompData.squareFootage === "string" ? rentCompData.squareFootage :
            numberWithCommas(rentCompData.squareFootage);
        this.verifyCellText(JQueryRowElement, rentCompsPage.squareFootageCellsLocator, sfText);
        const rentPerSFText = typeof rentCompData.squareFootage === "string" ? rentCompData.rentPSF :
            `$${numberWithCommas(rentCompData.rentPSF)}`;
        this.verifyCellText(JQueryRowElement, rentCompsPage.rentPerSfCellsLocator, rentPerSFText);
        return this;
    }

    private verifyCompRowDefaultCells(JQueryRowElement: JQuery<HTMLElement>, 
        rentCompData: Readonly<{bedrooms: number | string, rooms: number | string, monthly: string | number, 
        sourceInfoCheck: string, address: string}>, rowIndex: number): RentCompsActions {
        this.verifyCellExist(JQueryRowElement, rentCompsPage.moveCellLocator);
        this.verifyCellText(JQueryRowElement, rentCompsPage.indexCellLocator, `${rowIndex + 1}`);
        this.verifyCellText(JQueryRowElement, rentCompsPage.unitAddressLocator, rentCompData.address);
        this.verifyCellText(JQueryRowElement, rentCompsPage.categoryRoomsCellsLocator, rentCompData.rooms)
            .verifyCellText(JQueryRowElement, rentCompsPage.categoryBedroomsCellsLocator, rentCompData.bedrooms);
        const monthlyRentText = typeof rentCompData.monthly === "string" ? `$${rentCompData.monthly}` :
            `$${numberWithCommas(rentCompData.monthly)}`;
        this.verifyCellText(JQueryRowElement, rentCompsPage.categoryRentsCellsLocator, monthlyRentText);
        const rentForCalc = typeof rentCompData.monthly === "string" ?
            rentCompData.monthly.replaceAll(",", "") : rentCompData.monthly;
        const perRoom = numberWithCommas(Math.round(<number>rentForCalc / <number>rentCompData.rooms));
        this.verifyCellText(JQueryRowElement, rentCompsPage.categoryRentPerRoomLocator, `$${perRoom}`)
            .verifyCellText(JQueryRowElement, rentCompsPage.categorySourceOfInfoLocator, rentCompData.sourceInfoCheck);
        cy.wrap(JQueryRowElement).find(rentCompsPage.editButtonLocator).should("exist");
        cy.wrap(JQueryRowElement).find(rentCompsPage.removeButtonLocator).should("exist");
        return this;
    }

    verifyUncategorizedSubjectDevForecast(textToBe: string): RentCompsActions {
        rentCompsPage.uncategorizedDevForecast.should("have.text", textToBe);
        return this;
    }

    private verifyBathroomsCompRowCell(JQueryRowElement: JQuery<HTMLElement>, 
        bathroomsNumber: string | number): RentCompsActions {
        this.verifyCellText(JQueryRowElement, rentCompsPage.bathroomsCellsLocator, bathroomsNumber);
        return this;
    }

    verifyUncategorizedBathroomsRowCell(rowNumber: number, bathroomsNumber: number | string): RentCompsActions {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(rowNumber)).then(row => {
            this.verifyBathroomsCompRowCell(row, bathroomsNumber);
        });
        return this;
    }

    verifyUncategorizedHeader(): RentCompsActions {
        rentCompsPage.uncategorizedTableHeader.should("exist").and("have.text", "Uncategorized");
        return this;
    }

    verifyBedroomTableHeader(bedroomsNumber: number): RentCompsActions {
        rentCompsPage.getBedroomsTableHeader(bedroomsNumber).should("exist")
            .and("have.text", `${bedroomsNumber} Bedroom`);
        return this;
    }

    verifyBedroomSubjectColumnText(bedroomsNumber: number, textToBe: string): RentCompsActions {
        rentCompsPage.getBedroomSubjectColumn(bedroomsNumber).should("have.text", textToBe);
        return this;
    }

    verifyBedroomMarketRateSummaryExist(bedroomsNumber: number): RentCompsActions {
        rentCompsPage.getBedroomMarketRateSummary(bedroomsNumber).should("exist");
        return this;
    }

    verifyColumnNotExist(columnName: string): RentCompsActions {
        rentCompsPage.tablesColumns.contains(columnName).should("not.exist");
        return this;
    }

    verifyColumnExist(columnName: string): RentCompsActions {
        rentCompsPage.tablesColumns.contains(columnName).should("exist");
        return this;
    }

    changeStateOfFilter(filterName: string, filterValue: string | number, isToCheck = true): RentCompsActions {
        rentCompsPage.getFilterArrowButton(filterName).click();
        this.changeStateOfCheckboxByQaAttr(filterValue, isToCheck);
        rentCompsPage.getFilterArrowButton(filterName).click();
        return this;
    }

    verifyFilterValue(filterName: string, filterValue: string | number, isChecked = true): RentCompsActions {
        rentCompsPage.getFilterArrowButton(filterName).click();
        this.verifyCheckboxByQaAttr(filterValue, isChecked);
        rentCompsPage.getFilterArrowButton(filterName).click();
        return this;
    }

    clickAddComparableFromSearchByIndex(searchIndex = 0): RentCompsActions {
        rentCompsPage.getAddComparableFromSearchButtonByIndex(searchIndex).click();
        return this;
    }

    clickRemoveCompButtonByIndex(index = 0): RentCompsActions {
        rentCompsPage.getRemoveCompButtonByIndex(index).click();
        return this;
    }

    verifyRemovedBuildingCompsTableHeader(headerName: string): RentCompsActions {
        rentCompsPage.getRemovedBuildingCompsTableHeader(headerName).should("have.text", headerName);
        return this;
    }

    verifyRemovedBuildingCompsTableColumnText(columnName: string, textToBe: string): RentCompsActions {
        rentCompsPage.getRemovedBuildingCompsTableColumnText(columnName).should("have.text", textToBe);
        return this;
    }

    verifyRemovedBuildingCompsTableButton(buttonName: string): RentCompsActions {
        rentCompsPage.getRemovedBuildingCompsTableButton(buttonName).should("exist");
        return this;
    }

    clickShowDetailsButtonByIndex(index = 0): RentCompsActions {
        rentCompsPage.getShowDetailsButtonByIndex(index).click();
        return this;
    }

    verifyShowDetailsHeader(headerName: string): RentCompsActions {
        rentCompsPage.getShowDetailsHeader(headerName)
            .should("exist")
            .should("have.text", headerName);
        return this;
    }

    clickAddRemoveBuildingCompByAddress(address: string): RentCompsActions {
        rentCompsPage.getAddRemoveBuildingCompButtons(address).click();
        return this;
    }

    clickEditBuildingCompButtonByAddress(address: string): RentCompsActions {
        rentCompsPage.getEditAddedBuildingCompButtonByAddress(address).click();
        return this;
    }
}

export default new RentCompsActions(rentCompsPage);