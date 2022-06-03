import rentCompsPage from "../../../../pages/income/residential/rent_comps/rentComps.page";
import { getTodayDateString, getTodayDay, isDateHasCorrectFormat } from "../../../../../utils/date.utils";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../../../utils/numbers.utils";
import BaseActionsExt from "../../../base/base.actions.ext";

class RentCompsActions extends BaseActionsExt<typeof rentCompsPage> {

    verifyGCText(conclusionType: string): this {
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

    verifyUnitSwitchBackground(isChosen = true): this {
        if (isChosen) {
            rentCompsPage.unitSwitchButton.should("have.css", "background-color", "rgb(66, 96, 211)");
        } else {
            rentCompsPage.unitSwitchButton.should("have.css", "background-color", "rgb(255, 255, 255)");
        }
        return this;
    }

    verifyBuildingSwitchBackground(isChosen = true): this {
        if (isChosen) {
            rentCompsPage.buildingSwitchButton.should("have.css", "background-color", "rgb(66, 96, 211)");
        } else {
            rentCompsPage.buildingSwitchButton.should("have.css", "background-color", "rgb(255, 255, 255)");
        }
        return this;
    }

    clickUnitSwitchButton(): this {
        this.verifyUnitSwitchBackground(false);
        rentCompsPage.unitSwitchButton.should("be.enabled").click();
        return this;
    }

    clickBuildingSwitchButton(): this {
        this.verifyBuildingSwitchBackground(false);
        rentCompsPage.buildingSwitchButton.should("be.enabled").click();
        return this;
    }

    verifyBuildingSelected(): this {
        rentCompsPage.buildingSwitchButton.should("have.attr", "aria-pressed", "true");
        this.verifyBuildingSwitchBackground();
        return this;
    }

    verifyUnitSelected(): this {
        rentCompsPage.unitSwitchButton.should("have.attr", "aria-pressed", "true");
        this.verifyUnitSwitchBackground();
        return this;
    }

    clickSwitchConfirmButton(basis: string): this {
        rentCompsPage.switchSearchConfirmButton.should("contain.text", "Search")
            .and("contain.text", `Per ${basis}`);
        rentCompsPage.switchSearchConfirmButton.click();
        return this;
    }

    clickUnitTypesArrowButton(): this {
        rentCompsPage.unitTypesArrowButton.scrollIntoView().should("be.visible").click();
        return this;
    }

    checkCheckboxByQaAttr(attribute: string | number): this {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "false").check({ force: true }).should("have.value", "true");
        return this;
    }

    verifyCheckboxByQaAttr(attribute: string | number, isChecked = true): this {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", isChecked ? "true" : "false");
        return this;
    }

    uncheckCheckboxByQaAttr(attribute: string | number): this {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "true").uncheck({ force: true }).should("have.value", "false");
        return this;
    }

    checkListOfCheckboxesByQa(attributes: Array<string | number>): this {
        attributes.forEach(attr => {
            this.checkCheckboxByQaAttr(attr);
        });
        return this;
    }

    uncheckListOfCheckboxesByQa(attributes: Array<string | number>): this {
        attributes.forEach(attr => {
            this.uncheckCheckboxByQaAttr(attr);
        });
        return this;
    }

    verifyPopUpTextExist(basis: string): this {
        rentCompsPage.changeCompTypePopUpMessage.should("exist");
        rentCompsPage.getAreYouSurePopUp(basis).should("exist");
        return this;
    }

    verifySearchCancelExists(): this {
        rentCompsPage.searchCancelButton.should("exist");
        return this;
    }

    changeToBuildingSearch(): this {
        this.clickBuildingSwitchButton()
            .verifyPopUpTextExist("Building")
            .verifySearchCancelExists()
            .clickSwitchConfirmButton("Building")
            .verifyBuildingSelected();
        return this;
    }

    changeToUnitSearch(): this {
        this.clickUnitSwitchButton()
            .verifyPopUpTextExist("Unit")
            .verifySearchCancelExists()
            .clickSwitchConfirmButton("Unit")
            .verifyUnitSelected();
        return this;
    }

    enterValueToInput(fieldName: string, value: string | number): this {
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
        }
        inputField.scrollIntoView().should("be.visible").should("have.attr", "placeholder", placeholder)
            .type(value);
        this.verifyEnteredValueToInput(fieldName, value);
        return this;
    }

    verifyEnteredValueToInput(fieldName: string, value: string| number = ""): this {
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
        }
        inputField.should("have.value", valueToBe);
        return this;
    }

    clearInput(fieldName: string): this {
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
        }
        return this;
    }

    clickNumberOfBedroomsArrow(): this {
        rentCompsPage.numberOfBedroomsArrowButton.should("be.enabled").click();
        return this;
    }

    clickSourceOfInfoButton(): this {
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

    enterDateInput(date: string, type = "min"): this {
        this.clearDateInput(type);
        const isDateCorrect = isDateHasCorrectFormat(date);
        switch (type) {
            case "max":
                rentCompsPage.maxDateValueInput.scrollIntoView().should("be.visible").type(date);
                if (isDateCorrect) {
                    this.verifyEnteredDate("max", date);
                } else {
                    rentCompsPage.errorMessage.should("exist");
                }
                break;
            default:
                rentCompsPage.minDateValueInput.scrollIntoView().should("be.visible").type(date);
                if (isDateCorrect) {
                    this.verifyEnteredDate("min", date);
                } else {
                    rentCompsPage.errorMessage.should("exist");
                }
        }
        return this;
    }

    clickPickerButton(type = "min"): this {
        switch (type) {
            case "max":
                rentCompsPage.dateMaxPickerButton.should("be.enabled").click();
                break;
            default:
                rentCompsPage.dateMinPickerButton.should("be.enabled").click();
        }
        return this;
    }

    clickDayInPicker(day: string | number): this {
        day = day ?? Number(getTodayDay());
        rentCompsPage.getDayInCurrentMonthPicker(day).scrollIntoView().should("be.visible").click();
        return this;
    }

    verifyEnteredDate(type: string, date: string): this {
        date = date ?? getTodayDateString();
        if (type === "min") {
            rentCompsPage.dateMinInputToCheckValue.should("have.value", date);
        } else {
            rentCompsPage.dateMaxInputToCheckValue.should("have.value", date);
        }
        return this;
    }

    selectDayFromPicker(type: string, day: string | number): this {
        this.clickPickerButton(type);
        rentCompsPage.pickerCalendar.should("be.visible");
        this.clickDayInPicker(day);
        return this;
    }

    clickAmenitiesArrow(): this {
        rentCompsPage.amenitiesArrowButton.should("be.enabled").click();
        return this;
    }

    clickResetFiltersButton(): this {
        rentCompsPage.resetFiltersButton.click();
        return this;
    }

    selectSortByOptionByValue(value: string): this {
        this.verifyLoadingDoesntExist();
        rentCompsPage.sortByDropdown.should("be.visible").click({ force: true });
        rentCompsPage.getSortDropdownOptionByValue(value).click();
        rentCompsPage.sortByDropdown.should("have.text", value);
        return this;
    }

    verifyLoadingDoesntExist(): this {
        rentCompsPage.loadingModal.should("not.exist");
        return this;
    }

    verifyPhotosExistAndNavigateByPhotos(comparableIndex: number): this {
        this.verifyLoadingDoesntExist();
        rentCompsPage.comparableItems.eq(comparableIndex).then($item => {
            cy.wrap($item).find(rentCompsPage.photoElementLocator).then($photos => {
                this.navigateThroughAllPhotosInComparable($photos, comparableIndex)
                    .navigateThroughAllPhotosInComparable($photos, comparableIndex, "back");
            });
        });
        return this;
    }

    navigateThroughAllPhotosInComparable(jQueryPhotoElements: JQuery<HTMLElement>, comparableIndex: number,
                                         direction = "forward"): this {
        let numberOfPhotos = jQueryPhotoElements.length;
        let style = "";
        for (let i = 0; i < numberOfPhotos; i++) {
            let currentPhoto = cy.wrap(jQueryPhotoElements).eq(i);
            currentPhoto.should("exist");
            let currentStyle = jQueryPhotoElements.eq(i).attr("style");
            currentPhoto.invoke("attr", "style").should("not.equal", style);
            if (direction === "forward") {
                rentCompsPage.nextPhotoButtons.eq(comparableIndex).click();
            } else {
                rentCompsPage.prevPhotoButtons.eq(comparableIndex).click();
            }
            this.verifyLoadingDoesntExist();
            style = currentStyle;
        }
        return this;
    }

    verifyLoadingModalExist(): this {
        rentCompsPage.loadingModal.should("exist");
        return this;
    }

    clickZoomInButton(): this {
        rentCompsPage.zoomInButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesntExist();
        return this;
    }

    clickZoomOutButton(): this {
        rentCompsPage.zoomOutButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesntExist();
        return this;
    }

    clickAllSelectComparableButtons(): this {
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

    selectComparableByIndex(index = 0): this {
        rentCompsPage.selectComparableButtons.eq(index).click();
        return this;
    }

    verifyComparableSelectedByIndex(index = 0): this {
        rentCompsPage.selectedMapComparableRemoveButtons.eq(index).should("exist");
        return this;
    }

    selectComparableByAddress(address: string): this {
        rentCompsPage.getSelectButtonByAddress(address).click({ force: true });
        this.verifyComparableSelectedByAddress(address);
        return this;
    }

    verifyComparableSelectedByAddress(address: string): this {
        rentCompsPage.getRemoveButtonByAddress(address).should("exist");
        return this;
    }

    verifyUncategorizedCompsNumberAsSelected(): this {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.indexColumnCellsSelector).then(indexCells => {
            rentCompsPage.selectedMapComparableRemoveButtons.should("have.length", indexCells.length);
        });
        return this;
    }

    verifySearchResultIsShown(searchResultIndex = 0): this {
        rentCompsPage.searchResultsRows.eq(searchResultIndex).should("be.visible");
        return this;
    }

    openAddNewComparableForm(address: string, searchResIndex = 0): this {
        this.verifyLoadingDoesntExist();
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

    openAddNewComparableFormAdvanced(comparableData: Readonly<{ state: string, address: string, id: string | number }>): this {
        this.verifyLoadingDoesntExist();
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

    private verifyCellText(rowJQueryEl: JQuery<HTMLElement>, cellLocator: string, textToBe: string | number): this {
        cy.wrap(rowJQueryEl).find(cellLocator).should("have.text", textToBe);
        return this;
    }

    private verifyCellExist(rowJQueryEl: JQuery<HTMLElement>, cellLocator: string): this {
        cy.wrap(rowJQueryEl).find(cellLocator).should("exist");
        return this;
    }

    verifyComparableBedroomTableByNumber(index: number, rentCompData: Readonly<{ bedrooms: number | string, rooms: number | string,
                                        monthly: string | number, sourceInfoCheck: string, address: string }>): this {
        rentCompsPage.getBedroomTableByNumber(rentCompData.bedrooms).find(rentCompsPage.getCategoryRowByIndexLocator(index))
            .then(row => {
                this.verifyCompRowDefaultCells(row, rentCompData, index);
            });
        return this;
    }

    verifyComparableUncategorizedDefaultCellsByRow(rowIndex: number, rentCompData: Readonly<{bedrooms: number | string,
                    rooms: number | string, monthly: string | number, sourceInfoCheck: string, address: string}>): this {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(rowIndex)).then(row => {
            this.verifyCompRowDefaultCells(row, rentCompData, rowIndex);
        });
        return this;
    }

    verifyUncategorizedMinCell(minValue: number | string): this {
        const textToBe = typeof minValue === "string" ? minValue : `$${numberWithCommas(minValue)}`;
        rentCompsPage.uncategorizedMinCell.should("have.text", textToBe);
        return this;
    }

    verifyUncategorizedAverageCell(averageValue: number | string): this {
        const textToBe = typeof averageValue === "string" ? averageValue : `$${numberWithCommas(averageValue)}`;
        rentCompsPage.uncategorizedAverageCell.should("have.text", textToBe);
        return this;
    }

    verifyUncategorizedMaxCell(maxValue: number | string): this {
        const textToBe = typeof maxValue === "string" ? maxValue : `$${numberWithCommas(maxValue)}`;
        rentCompsPage.uncategorizedMaxCell.should("have.text", textToBe);
        return this;
    }

    verifyRentRollSummaryExist(): this {
        rentCompsPage.rentRollSummary.should("exist");
        return this;
    }

    verifyUncategorizedSubjectMinExist(): this {
        rentCompsPage.uncategorizedSubjectMin.should("exist");
        return this;
    }

    verifyUncategorizedSubjectAverageExist(): this {
        rentCompsPage.uncategorizedSubjectAverage.should("exist");
        return this;
    }

    verifyUncategorizedSubjectMaxExist(): this {
        rentCompsPage.uncategorizedSubjectMax.should("exist");
        return this;
    }

    verifyUncategorizedSubjectColumnText(textToBe: string): this {
        rentCompsPage.uncategorizedSubjectColumn.should("have.text", textToBe);
        return this;
    }

    checkDisplaySquareFootageForCompsCheckbox(): this {
        rentCompsPage.displaySquareFootageForCompsCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyUncategorizedSquareFootageCells(index: number, rentCompData: Readonly<{squareFootage: number | string,
                                            rentPSF: number | string}>): this {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(index)).then(row => {
            this.verifyRentPsfSfCompRowCells(row, rentCompData);
        });
        return this;
    }

    private verifyRentPsfSfCompRowCells(JQueryRowElement: JQuery<HTMLElement>,
                                        rentCompData: Readonly<{squareFootage: number | string, rentPSF: number | string}>): this {
        const sfText = typeof rentCompData.squareFootage === "string" ? rentCompData.squareFootage :
            numberWithCommas(rentCompData.squareFootage);
        this.verifyCellText(JQueryRowElement, rentCompsPage.squareFootageCellsLocator, sfText);
        const rentPerSFText = typeof rentCompData.squareFootage === "string" ? rentCompData.rentPSF :
            `$${numberWithCommas(rentCompData.rentPSF)}`;
        this.verifyCellText(JQueryRowElement, rentCompsPage.rentPerSfCellsLocator, rentPerSFText);
        return this;
    }

    private verifyCompRowDefaultCells(JQueryRowElement: JQuery<HTMLElement>, rentCompData: Readonly<{bedrooms: number | string,
        rooms: number | string, monthly: string | number, sourceInfoCheck: string, address: string}>, rowIndex: number): this {

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

    verifyUncategorizedSubjectDevForecast(textToBe: string): this {
        rentCompsPage.uncategorizedDevForecast.should("have.text", textToBe);
        return this;
    }

    private verifyBathroomsCompRowCell(JQueryRowElement: JQuery<HTMLElement>, bathroomsNumber: string | number): this {
        this.verifyCellText(JQueryRowElement, rentCompsPage.bathroomsCellsLocator, bathroomsNumber);
        return this;
    }

    verifyUncategorizedBathroomsRowCell(rowNumber: number, bathroomsNumber: number | string): this {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(rowNumber)).then(row => {
            this.verifyBathroomsCompRowCell(row, bathroomsNumber);
        });
        return this;
    }

    verifyUncategorizedHeader(): this {
        rentCompsPage.uncategorizedTableHeader.should("exist").and("have.text", "Uncategorized");
        return this;
    }

    verifyBedroomTableHeader(bedroomsNumber: number): this {
        rentCompsPage.getBedroomsTableHeader(bedroomsNumber).should("exist")
            .and("have.text", `${bedroomsNumber} Bedroom`);
        return this;
    }

    verifyBedroomSubjectColumnText(bedroomsNumber: number, textToBe: string): this {
        rentCompsPage.getBedroomSubjectColumn(bedroomsNumber).should("have.text", textToBe);
        return this;
    }

    verifyBedroomMarketRateSummaryExist(bedroomsNumber: number): this {
        rentCompsPage.getBedroomMarketRateSummary(bedroomsNumber).should("exist");
        return this;
    }

    verifyColumnNotExist(columnName: string): this {
        rentCompsPage.tablesColumns.contains(columnName).should("not.exist");
        return this;
    }

    verifyColumnExist(columnName: string): this {
        rentCompsPage.tablesColumns.contains(columnName).should("exist");
        return this;
    }

    checkFilterValue(name: string, value: string): this {
        rentCompsPage.getFilterArrowButton(name).click();
        this.checkCheckboxByQaAttr(value);
        rentCompsPage.getFilterArrowButton(name).click();
        return this;
    }

    verifyFilterValue(name: string, value: string, isChecked = true): this {
        rentCompsPage.getFilterArrowButton(name).click();
        this.verifyCheckboxByQaAttr(value, isChecked);
        rentCompsPage.getFilterArrowButton(name).click();
        return this;
    }
}

export default new RentCompsActions(rentCompsPage);