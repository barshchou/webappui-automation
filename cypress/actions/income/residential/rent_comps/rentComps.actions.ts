import BaseActions from "../../../base/base.actions";
import rentCompsPage from "../../../../pages/income/residential/rent_comps/rentComps.page";
import {getTodayDateString, getTodayDay, isDateHasCorrectFormat} from "../../../../../utils/date.utils";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../../../utils/numbers.utils";

class RentCompsActions extends BaseActions {

    /**
     * @param {string} conclusionType
     * @returns {RentCompsActions}
     */
    verifyGCText(conclusionType) {
        rentCompsPage.generatedCommentary.should("exist")
            .should("contain.text", this.getCommentary(conclusionType));
        return this;
    }

    /**
     * @private
     * @param {string} conclusionType
     * @returns {string}
     */
    getCommentary(conclusionType) {
        if (conclusionType === "AS_IS") {
            return "In order to gauge the reasonableness of the contract rents, " +
                "we have examined the following rental activity in the submarket:";
        } else {
            return "In order to forecast the market rents, " +
                "we have examined the following rental activity in the submarket:";
        }
    }

    verifyUnitSwitchBackground(isChosen = true) {
        if (isChosen) {
            rentCompsPage.unitSwitchButton.should("have.css", "background-color", "rgb(46, 67, 147)");
        } else {
            rentCompsPage.unitSwitchButton.should("have.css", "background-color", "rgb(66, 96, 211)");
        }
        return this;
    }

    verifyBuildingSwitchBackground(isChosen = true) {
        if (isChosen) {
            rentCompsPage.buildingSwitchButton.should("have.css", "background-color", "rgb(46, 67, 147)");
        } else {
            rentCompsPage.buildingSwitchButton.should("have.css", "background-color", "rgb(66, 96, 211)");
        }
        return this;
    }

    clickUnitSwitchButton() {
        this.verifyUnitSwitchBackground(false);
        rentCompsPage.unitSwitchButton.should("be.enabled").click();
        return this;
    }

    clickBuildingSwitchButton() {
        this.verifyBuildingSwitchBackground(false);
        rentCompsPage.buildingSwitchButton.should("be.enabled").click();
        return this;
    }

    verifyBuildingSelected() {
        rentCompsPage.buildingSwitchButton.should("have.attr", "data-qa-isselected", "true");
        this.verifyBuildingSwitchBackground();
        return this;
    }

    verifyUnitSelected() {
        rentCompsPage.unitSwitchButton.should("have.attr", "data-qa-isselected", "true");
        this.verifyUnitSwitchBackground();
        return this;
    }

    clickSwitchConfirmButton(basis) {
        rentCompsPage.switchSearchConfirmButton.should("contain.text", "Search")
            .and("contain.text", `Per ${basis}`);
        rentCompsPage.switchSearchConfirmButton.click();
        return this;
    }

    clickUnitTypesArrowButton() {
        rentCompsPage.unitTypesArrowButton.scrollIntoView().should("be.visible").click();
        return this;
    }

    /**
     * @param {string} attribute
     * @returns {RentCompsActions}
     */
    checkCheckboxByQaAttr(attribute) {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "false").check({force: true}).should("have.value", "true");
        return this;
    }

    /**
     * @param {string} attribute
     * @returns {RentCompsActions}
     */
    uncheckCheckboxByQaAttr(attribute) {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "true").uncheck({force: true}).should("have.value", "false");
        return this;
    }

    /**
     * @param {Array<string>} attributes
     * @returns {RentCompsActions}
     */
    checkListOfCheckboxesByQa(attributes) {
        attributes.forEach(attr => {
            this.checkCheckboxByQaAttr(attr);
        });
        return this;
    }

    /**
     * @param {Array<string>} attributes
     * @returns {RentCompsActions}
     */
    uncheckListOfCheckboxesByQa(attributes) {
        attributes.forEach(attr => {
            this.uncheckCheckboxByQaAttr(attr);
        });
        return this;
    }

    verifyPopUpTextExist(basis) {
        rentCompsPage.changeCompTypePopUpMessage.should("exist");
        rentCompsPage.getAreYouSurePopUp(basis).should("exist");
        return this;
    }

    verifySearchCancelExists() {
        rentCompsPage.searchCancelButton.should("exist");
        return this;
    }

    changeToBuildingSearch() {
        this.clickBuildingSwitchButton()
            .verifyPopUpTextExist("Building")
            .verifySearchCancelExists()
            .clickSwitchConfirmButton("Building")
            .verifyBuildingSelected();
        return this;
    }

    changeToUnitSearch() {
        this.clickUnitSwitchButton()
            .verifyPopUpTextExist("Unit")
            .verifySearchCancelExists()
            .clickSwitchConfirmButton("Unit")
            .verifyUnitSelected();
        return this;
    }

    /**
     * @param {string} fieldName
     * @param {string | number} value
     * @returns {RentCompsActions}
     */
    enterValueToInput(fieldName, value) {
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

    /**
     * @param {string} fieldName
     * @param {string | number} value
     * @returns {RentCompsActions}
     */
    verifyEnteredValueToInput(fieldName, value = "") {
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

    /**
     * @param {string} fieldName
     * @returns {RentCompsActions}
     */
    clearInput(fieldName) {
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

    clickNumberOfBedroomsArrow() {
        rentCompsPage.numberOfBedroomsArrowButton.should("be.enabled").click();
        return this;
    }

    clickSourceOfInfoButton() {
        rentCompsPage.sourceOfInfoArrow.should("be.enabled").click();
        return this;
    }

    /**
     * @param {string} type
     * @returns {RentCompsActions}
     */
    clearDateInput(type = "min") {
        switch (type) {
            case "max":
                rentCompsPage.maxDateValueInput.clear();
                break;
            default:
                rentCompsPage.minDateValueInput.clear();
        }
        return this;
    }

    /**
     * @param {string} date
     * @param {string} type
     * @returns {RentCompsActions}
     */
    enterDateInput(date, type = "min") {
        this.clearDateInput(type);
        const isDateCorrect = isDateHasCorrectFormat(date);
        switch (type) {
            case "max":
                rentCompsPage.maxDateValueInput.scrollIntoView().should("be.visible").type(date);
                if (isDateCorrect) {
                    this.verifyEnteredDate("max", date);
                } else {
                    rentCompsPage.maxDateValueInput.parent().should("have.class", "Mui-error");
                }
                break;
            default:
                rentCompsPage.minDateValueInput.scrollIntoView().should("be.visible").type(date);
                if (isDateCorrect) {
                    this.verifyEnteredDate("min", date);
                } else {
                    rentCompsPage.minDateValueInput.parent().should("have.class", "Mui-error");
                }
        }
        return this;
    }

    /**
     * @param {string} type
     * @returns {RentCompsActions}
     */
    clickPickerButton(type = "min") {
        switch (type) {
            case "max":
                rentCompsPage.dateMaxPickerButton.should("be.enabled").click();
                break;
            default:
                rentCompsPage.dateMinPickerButton.should("be.enabled").click();
        }
        return this;
    }

    /**
     * @param {string} day
     * @returns {RentCompsActions}
     */
    clickDayInPicker(day) {
        day = day ?? Number(getTodayDay());
        rentCompsPage.getDayInCurrentMonthPicker(day).scrollIntoView().should("be.visible").click();
        return this;
    }

    /**
     * @param {string} type
     * @param {string} date
     * @returns {RentCompsActions}
     */
    verifyEnteredDate(type, date) {
        date = date ?? getTodayDateString();
        if (type === "min") {
            rentCompsPage.minDateValueInput.should("have.value", date);
        } else {
            rentCompsPage.maxDateValueInput.should("have.value", date);
        }
        return this;
    }

    /**
     * @param {string} type
     * @param {string | number} day
     * @returns {RentCompsActions}
     */
    selectDayFromPicker(type, day) {
        this.clickPickerButton(type);
        rentCompsPage.pickerCalendar.should("be.visible");
        this.clickDayInPicker(day);
        return this;
    }

    clickAmenitiesArrow() {
        rentCompsPage.amenitiesArrowButton.should("be.enabled").click();
        return this;
    }

    clickResetFiltersButton() {
        rentCompsPage.resetFiltersButton.click();
        return this;
    }

    /**
     * @param {string} value
     * @returns {RentCompsActions}
     */
    selectSortByOptionByValue(value) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.sortByDropdown.should("be.visible").click({force: true});
        rentCompsPage.getSortDropdownOptionByValue(value).click();
        rentCompsPage.sortByDropdown.should("have.text", value);
        return this;
    }

    verifyLoadingDoesntExist() {
        rentCompsPage.loadingModal.should("not.exist");
        return this;
    }

    /**
     * @param {number} comparableIndex
     * @returns {RentCompsActions}
     */
    verifyPhotosExistAndNavigateByPhotos(comparableIndex) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.comparableItems.eq(comparableIndex).then($item => {
            cy.wrap($item).find(rentCompsPage.photoElementLocator).then($photos => {
                this.navigateThroughAllPhotosInComparable($photos, comparableIndex)
                    .navigateThroughAllPhotosInComparable($photos, comparableIndex, "back");
            });
        });
        return this;
    }

    /**
     * @param {JQuery<HTMLElement>} jQueryPhotoElements
     * @param {number} comparableIndex
     * @param {string} direction
     * @returns {RentCompsActions}
     */
    navigateThroughAllPhotosInComparable(jQueryPhotoElements, comparableIndex, direction = "forward") {
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

    verifyLoadingModalExist() {
        rentCompsPage.loadingModal.should("exist");
        return this;
    }

    clickZoomInButton() {
        rentCompsPage.zoomInButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesntExist();
        return this;
    }

    clickZoomOutButton() {
        rentCompsPage.zoomOutButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesntExist();
        return this;
    }

    clickAllSelectComparableButtons() {
        rentCompsPage.selectComparableButtons.then(buttons => {
            const buttonsLength = buttons.length;
            for (let i = 0; i < buttonsLength; i++) {
                if (i !== 0) {
                    rentCompsPage.selectedComparableButtons.eq(i).should("not.exist");
                }
                cy.wrap(buttons.eq(i)).should("be.enabled").click({force: true});
                this.verifyComparableSelectedByIndex(i);
            }
        });
        return this;
    }

    /**
     * @param {number} index
     * @returns {RentCompsActions}
     */
    selectComparableByIndex(index = 0) {
        rentCompsPage.selectComparableButtons.eq(index).click();
        return this;
    }

    /**
     * @param {number} index
     * @returns {RentCompsActions}
     */
    verifyComparableSelectedByIndex(index = 0) {
        rentCompsPage.selectedComparableButtons.eq(index).should("exist");
        return this;
    }

    /**
     * @param {string} address
     * @returns {RentCompsActions}
     */
    selectComparableByAddress(address) {
        rentCompsPage.getSelectButtonByAddress(address).click({force: true});
        this.verifyComparableSelectedByAddress(address);
        return this;
    }

    /**
     * @param {string} address
     * @returns {RentCompsActions}
     */
    verifyComparableSelectedByAddress(address) {
        rentCompsPage.getSelectedButtonByAddress(address).should("exist");
        return this;
    }

    verifyUncategorizedCompsNumberAsSelected() {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.indexColumnCellsSelector).then(indexCells => {
            rentCompsPage.selectedComparableButtons.should("have.length", indexCells.length);
        });
        return this;
    }

    /**
     * @param {number} searchResultIndex
     * @returns {RentCompsActions}
     */
    verifySearchResultIsShown(searchResultIndex = 0) {
        rentCompsPage.searchResultsRows.eq(searchResultIndex).should("be.visible");
        return this;
    }

    /**
     * @param {string} address
     * @param {number} searchResIndex
     * @returns {RentCompsActions}
     */
    openAddNewComparableForm(address, searchResIndex = 0) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.addNewRentCompButton.scrollIntoView().should("be.enabled").click();
        rentCompsPage.findRentCompSection.should("be.visible");
        rentCompsPage.submitButton.should("be.disabled");
        rentCompsPage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        rentCompsPage.advancedSearchButton.should("be.visible");
        rentCompsPage.submitButton.should("not.be.disabled").click();
        rentCompsPage.searchResultsRows.eq(searchResIndex).click();
        rentCompsPage.submitButton.should("not.be.disabled").click();
        rentCompsPage.newUnitForm.should("be.visible");
        return this;
    }

    /**
     * @param {Readonly<{state: string, address: string, id: string | number}>} comparableData
     * @returns {RentCompsActions}
     */
    openAddNewComparableFormAdvanced(comparableData) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.addNewRentCompButton.scrollIntoView().click();
        rentCompsPage.advancedSearchButton.click();
        rentCompsPage.selectStateButton.click();
        rentCompsPage.getStateByName(comparableData.state).click();
        rentCompsPage.searchAddressField.type(`${comparableData.address}{enter}`)
            .should("have.value", comparableData.address);
        rentCompsPage.findRentCompSection.click();
        rentCompsPage.propertyIdentifierInput.type(comparableData.id).should("have.value", comparableData.id);
        rentCompsPage.submitButton.click();
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} rowJQueryEl
     * @param {string} cellLocator
     * @param {string} textToBe
     * @returns {RentCompsActions}
     */
    verifyCellText(rowJQueryEl, cellLocator, textToBe) {
        cy.wrap(rowJQueryEl).find(cellLocator).should("have.text", textToBe);
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} rowJQueryEl
     * @param {string} cellLocator
     * @returns {RentCompsActions}
     */
    verifyCellExist(rowJQueryEl, cellLocator) {
        cy.wrap(rowJQueryEl).find(cellLocator).should("exist");
        return this;
    }

    /**
     * @param {number} index
     * @param {Readonly<{bedrooms: number | string, rooms: number | string, monthly: string | number,
     * sourceInfoCheck: string, address: string}>} rentCompData
     * @returns {RentCompsActions}
     */
    verifyComparableBedroomTableByNumber(index, rentCompData) {
        rentCompsPage.getBedroomTableByNumber(rentCompData.bedrooms).find(rentCompsPage.getCategoryRowByIndexLocator(index))
            .then(row => {
                this.verifyCompRowDefaultCells(row, rentCompData, index);
            });
        return this;
    }

    /**
     * @param {number} rowIndex
     * @param {Readonly<{bedrooms: number | string, rooms: number | string, monthly: string | number,
     * sourceInfoCheck: string, address: string}>} rentCompData
     * @returns {RentCompsActions}
     */
    verifyComparableUncategorizedDefaultCellsByRow(rowIndex, rentCompData) {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(rowIndex)).then(row => {
            this.verifyCompRowDefaultCells(row, rentCompData, rowIndex);
        });
        return this;
    }

    /**
     * @param {number | string} minValue
     * @returns {RentCompsActions}
     */
    verifyUncategorizedMinCell(minValue) {
        const textToBe = typeof minValue === "string" ? minValue : `$${numberWithCommas(minValue)}`;
        rentCompsPage.uncategorizedMinCell.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number | string} averageValue
     * @returns {RentCompsActions}
     */
    verifyUncategorizedAverageCell(averageValue) {
        const textToBe = typeof averageValue === "string" ? averageValue : `$${numberWithCommas(averageValue)}`;
        rentCompsPage.uncategorizedAverageCell.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number | string} maxValue
     * @returns {RentCompsActions}
     */
    verifyUncategorizedMaxCell(maxValue) {
        const textToBe = typeof maxValue === "string" ? maxValue : `$${numberWithCommas(maxValue)}`;
        rentCompsPage.uncategorizedMaxCell.should("have.text", textToBe);
        return this;
    }

    verifyRentRollSummaryExist() {
        rentCompsPage.rentRollSummary.should("exist");
        return this;
    }

    verifyUncategorizedSubjectMinExist() {
        rentCompsPage.uncategorizedSubjectMin.should("exist");
        return this;
    }

    verifyUncategorizedSubjectAverageExist() {
        rentCompsPage.uncategorizedSubjectAverage.should("exist");
        return this;
    }

    verifyUncategorizedSubjectMaxExist() {
        rentCompsPage.uncategorizedSubjectMax.should("exist");
        return this;
    }

    /**
     * @param {string} textToBe
     * @returns {RentCompsActions}
     */
    verifyUncategorizedSubjectColumnText(textToBe) {
        rentCompsPage.uncategorizedSubjectColumn.should("have.text", textToBe);
        return this;
    }

    checkDisplaySquareFootageForCompsCheckbox() {
        rentCompsPage.displaySquareFootageForCompsCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     * @param {number} index
     * @param {Readonly<{squareFootage: number | string, rentPSF: number | string}>} rentCompData
     * @returns {RentCompsActions}
     */
    verifyUncategorizedSquareFootageCells(index, rentCompData) {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(index)).then(row => {
            this.verifyRentPsfSfCompRowCells(row, rentCompData);
        });
        return this;
    }


    /**
     * @private
     * @param {JQuery<HTMLElement>} JQueryRowElement
     * @param {Readonly<{squareFootage: number | string, rentPSF: number | string}>} rentCompData
     * @returns {RentCompsActions}
     */
    verifyRentPsfSfCompRowCells(JQueryRowElement, rentCompData) {
        const sfText = typeof rentCompData.squareFootage === "string" ? rentCompData.squareFootage :
            numberWithCommas(rentCompData.squareFootage);
        this.verifyCellText(JQueryRowElement, rentCompsPage.squareFootageCellsLocator, sfText);
        const rentPerSFText = typeof rentCompData.squareFootage === "string" ? rentCompData.rentPSF :
            `$${numberWithCommas(rentCompData.rentPSF)}`;
        this.verifyCellText(JQueryRowElement, rentCompsPage.rentPerSfCellsLocator, rentPerSFText);
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} JQueryRowElement
     * @param {Readonly<{bedrooms: number | string, rooms: number | string, monthly: string | number,
     * sourceInfoCheck: string, address: string}>} rentCompData
     * @param {number} rowIndex
     * @returns {RentCompsActions}
     */
    verifyCompRowDefaultCells(JQueryRowElement, rentCompData, rowIndex) {
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
        const perRoom = numberWithCommas(Math.round(rentForCalc / rentCompData.rooms));
        this.verifyCellText(JQueryRowElement, rentCompsPage.categoryRentPerRoomLocator, `$${perRoom}`)
            .verifyCellText(JQueryRowElement, rentCompsPage.categorySourceOfInfoLocator, rentCompData.sourceInfoCheck);
        cy.wrap(JQueryRowElement).find(rentCompsPage.editButtonLocator).should("exist");
        cy.wrap(JQueryRowElement).find(rentCompsPage.removeButtonLocator).should("exist");
        return this;
    }

    /**
     * @param {string} textToBe
     * @returns {RentCompsActions}
     */
    verifyUncategorizedSubjectDevForecast(textToBe) {
        rentCompsPage.uncategorizedDevForecast.should("have.text", textToBe);
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} JQueryRowElement
     * @param {string | number} bathroomsNumber
     * @returns {RentCompsActions}
     */
    verifyBathroomsCompRowCell(JQueryRowElement, bathroomsNumber) {
        this.verifyCellText(JQueryRowElement, rentCompsPage.bathroomsCellsLocator, bathroomsNumber);
        return this;
    }

    /**
     * @param {number} rowNumber
     * @param {number | string} bathroomsNumber
     * @returns {RentCompsActions}
     */
    verifyUncategorizedBathroomsRowCell(rowNumber, bathroomsNumber) {
        rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(rowNumber)).then(row => {
            this.verifyBathroomsCompRowCell(row, bathroomsNumber);
        });
        return this;
    }

    verifyUncategorizedHeader() {
        rentCompsPage.uncategorizedTableHeader.should("exist").and("have.text", "Uncategorized");
        return this;
    }

    /**
     * @param bedroomsNumber
     * @returns {RentCompsActions}
     */
    verifyBedroomTableHeader(bedroomsNumber) {
        rentCompsPage.getBedroomsTableHeader(bedroomsNumber).should("exist")
            .and("have.text", `${bedroomsNumber} Bedroom`);
        return this;
    }

    /**
     * @param {number} bedroomsNumber
     * @param {string} textToBe
     * @returns {RentCompsActions}
     */
    verifyBedroomSubjectColumnText(bedroomsNumber, textToBe) {
        rentCompsPage.getBedroomSubjectColumn(bedroomsNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number} bedroomsNumber
     * @returns {RentCompsActions}
     */
    verifyBedroomMarketRateSummaryExist(bedroomsNumber) {
        rentCompsPage.getBedroomMarketRateSummary(bedroomsNumber).should("exist");
        return this;
    }

    /**
     * @param {string} columnName
     * @returns {RentCompsActions}
     */
    verifyColumnNotExist(columnName) {
        rentCompsPage.tablesColumns.contains(columnName).should("not.exist");
        return this;
    }

    /**
     * @param {string} columnName
     * @returns {RentCompsActions}
     */
    verifyColumnExist(columnName) {
        rentCompsPage.tablesColumns.contains(columnName).should("exist");
        return this;
    }
}

export default new RentCompsActions();