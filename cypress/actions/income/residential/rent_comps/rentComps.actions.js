import BaseActions from "../../../base/base.actions";
import rentCompsPage from "../../../../pages/income/residential/rent_comps/rentComps.page";
import {getTodayDateString, getTodayDay, isDateHasCorrectFormat} from "../../../../../utils/date.utils";
import {numberWithCommas} from "../../../../../utils/numbers.utils";

class RentCompsActions extends BaseActions {

    /**
     *
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

    /**
     *
     * @returns {RentCompsActions}
     */
    clickUnitSwitchButton() {
        rentCompsPage.unitSwitchButton.should("be.enabled").click();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickBuildingSwitchButton() {
        rentCompsPage.buildingSwitchButton.should("be.enabled").click();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyBuildingSelected() {
        rentCompsPage.buildingSwitchButton.should("have.attr", "data-qa-isselected", "true");
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyUnitSelected() {
        rentCompsPage.unitSwitchButton.should("have.attr", "data-qa-isselected", "true");
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickSwitchConfirmButton() {
        rentCompsPage.switchSearchConfirmButton.should("be.visible").click();
        return this;
    }

    clickUnitTypesArrowButton() {
        rentCompsPage.unitTypesArrowButton.scrollIntoView().should("be.visible").click();
    }

    checkUncheckCheckboxByQaAttr(attribute, check = true) {
        if (check) {
            rentCompsPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "false").check({force: true}).should("have.value", "true");
        } else {
            rentCompsPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "true").uncheck({force: true}).should("have.value", "false");
        }
    }

    checkUncheckListOfCheckboxesByQa(attributes, check = true) {
        attributes.forEach(attr => {
            this.checkUncheckCheckboxByQaAttr(attr, check);
        });
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyPopUpTextExist() {
        rentCompsPage.changeCompTypePopUpMessage.should("exist");
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    changeToBuildingSearch() {
        this.clickBuildingSwitchButton()
            .verifyPopUpTextExist()
            .clickSwitchConfirmButton()
            .verifyBuildingSelected();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    changeToUnitSearch() {
        this.clickUnitSwitchButton()
            .verifyPopUpTextExist()
            .clickSwitchConfirmButton()
            .verifyUnitSelected();
        return this;
    }

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
    }

    verifyEnteredValueToInput(fieldName, value = "") {
        let inputField;
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
        inputField.should("have.value", value);
    }

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
    }

    clickNumberOfBedroomsArrow() {
        rentCompsPage.numberOfBedroomsArrowButton.should("be.enabled").click();
    }

    clickSourceOfInfoButton() {
        rentCompsPage.sourceOfInfoArrow.should("be.enabled").click();
    }

    clearDateInput(type = "min") {
        switch (type) {
            case "max":
                rentCompsPage.maxDateValueInput.clear();
                break;
            default:
                rentCompsPage.minDateValueInput.clear();
        }
    }

    enterDatesToInputs(types, dates) {
        dates = dates ?? [getTodayDateString(), getTodayDateString()];
        for (let i = 0; i < dates.length; i++) {
            this.enterDateInput(dates[i], types[i]);
        }
    }

    clearDateInputs(types) {
        types.forEach(type => {
            this.clearDateInput(type);
        });
    }

    enterDateInput(date, type = "min") {
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
    }

    clickPickerButton(type = "min") {
        switch (type) {
            case "max":
                rentCompsPage.dateMaxPickerButton.should("be.enabled").click();
                break;
            default:
                rentCompsPage.dateMinPickerButton.should("be.enabled").click();
        }
    }

    clickDayInPicker(day) {
        day = day ?? Number(getTodayDay());
        rentCompsPage.getDayInCurrentMonthPicker(day).scrollIntoView().should("be.visible").click();
    }

    verifyEnteredDate(type, date) {
        date = date ?? getTodayDateString();
        if (type === "min") {
            rentCompsPage.dateMinInputToCheckValue.should("have.value", date);
        } else {
            rentCompsPage.dateMaxInputToCheckValue.should("have.value", date);
        }
    }

    selectDayFromPicker(type, day) {
        this.clickPickerButton(type);
        rentCompsPage.pickerCalendar.should("be.visible");
        this.clickDayInPicker(day);
    }

    selectDaysFromPickerByTypes(types, days) {
        days = days ?? [Number(getTodayDay()), Number(getTodayDay())];
        for (let i = 0; i < types.length; i++) {
            this.selectDayFromPicker(types[i], days[i]);
        }
    }

    verifyEnteredDatesByTypes(types, dates) {
        dates = dates ?? [getTodayDateString(), getTodayDateString()];
        for (let i = 0; i < types.length; i++) {
            this.verifyEnteredDate(types[i], dates[i]);
        }
    }

    clickAmenitiesArrow() {
        rentCompsPage.amenitiesArrowButton.should("be.enabled").click();
    }

    verifyNumberOfFoundResultsExist() {
        rentCompsPage.numberOfFoundResults.should("exist").should("contain.text", "Results Found");
    }

    clickResetFiltersButton() {
        rentCompsPage.resetFiltersButton.click();
    }

    selectSortByOptionByValue(value) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.sortByDropdown.should("be.visible").click({force: true});
        rentCompsPage.getSortDropdownOptionByValue(value).click();
        rentCompsPage.sortByDropdown.should("have.text", value);
    }

    selectSortByOptionsByValues(values) {
        values.forEach(value => {
            this.selectSortByOptionByValue(value);
        });
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyLoadingDoesntExist() {
        rentCompsPage.loadingModal.should("not.exist");
        return this;
    }

    verifyPhotosExistAndNavigateByPhotos(comparableIndex) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.comparableItems.eq(comparableIndex).then($item => {
            cy.wrap($item).find(rentCompsPage.photoElementLocator).then($photos => {
                this.navigateThroughAllPhotosInComparable($photos, comparableIndex);
                this.navigateThroughAllPhotosInComparable($photos, comparableIndex, "back");
            });
        });
    }

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
    }

    verifyCompAddressesExist() {
        rentCompsPage.comparableAddressesTexts.each($address => {
            expect($address).not.to.be.empty;
        });
    }

    verifyRentsTexts() {
        rentCompsPage.rentElementsTexts.each($rentEl => {
            cy.wrap($rentEl).should("exist").should("contain.text", "/month")
                .should("contain.text", "/SF");
        });
    }

    verifyCompAmenitiesTextsExist() {
        rentCompsPage.comparablesAmenitiesTexts.each($amenityEl => {
            cy.wrap($amenityEl).should("exist").should("contain.text", "bed")
                .should("contain.text", "bath");
        });
    }

    verifyComparablePropertyTextsExist() {
        rentCompsPage.comparablePropertyTexts.each($propertyEl => {
            cy.wrap($propertyEl).should("exist").should("contain.text", "mi. away")
                .should("contain.text", "SF").should("contain.text", "Valued:");
        });
    }

    verifyLoadingModalExist() {
        rentCompsPage.loadingModal.should("exist");
    }

    clickZoomInButton() {
        rentCompsPage.zoomInButton.click();
        this.verifyLoadingModalExist();
        this.verifyLoadingDoesntExist();
    }

    clickZoomOutButton() {
        rentCompsPage.zoomOutButton.click();
        this.verifyLoadingModalExist();
        this.verifyLoadingDoesntExist();
    }

    clickAllSelectComparableButtons() {
        rentCompsPage.selectComparableButtons.then(buttons => {
            const buttonsLength = buttons.length;
            for (let i = 0; i < buttonsLength; i++) {
                if (i !== 0) {
                    rentCompsPage.selectedComparableButtons.eq(i).should("not.exist");
                }
                cy.wrap(buttons.eq(i)).should("be.enabled").click({force: true});
                rentCompsPage.selectedComparableButtons.eq(i).should("exist");
            }
        });
    }

    verifyComparableGroups(numberOfUnits) {
        if (numberOfUnits === 0) {
            rentCompsPage.uncategorizedTable.find(rentCompsPage.indexColumnCellsSelector).then(indexCells => {
                rentCompsPage.selectedComparableButtons.should("have.length", indexCells.length);
            });
        }
    }

    /**
     *
     * @param {number} searchResultIndex
     * @returns {RentCompsActions}
     */
    verifySearchResultIsShown(searchResultIndex = 0) {
        rentCompsPage.searchResultsRows.eq(searchResultIndex).should("be.visible");
        return this;
    }

    /**
     *
     * @param {string} address
     * @param {number} searchResIndex
     * @returns {RentCompsActions}
     */
    openAddNewComparableForm(address, searchResIndex = 0) {
        this.verifyLoadingDoesntExist();
        rentCompsPage.addNewRentCompButton.scrollIntoView().should("be.enabled").click();
        rentCompsPage.findRenCompSection.should("be.visible");
        rentCompsPage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        rentCompsPage.findRenCompSection.click();
        rentCompsPage.submitButton.should("not.be.disabled").click();
        rentCompsPage.searchResultsRows.eq(searchResIndex).click();
        rentCompsPage.submitButton.should("not.be.disabled").click();
        rentCompsPage.newUnitForm.should("be.visible");
        return this;
    }

    /**
     *
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
        rentCompsPage.findRenCompSection.click();
        rentCompsPage.propertyIdentifierInput.type(comparableData.id).should("have.value", comparableData.id);
        rentCompsPage.submitButton.click();
        return this;
    }

    /**
     *
     * @param {number} index
     * @param {number, string} numberOfRooms
     * @param {number, string} numberOfBedrooms
     * @param {number, string} monthlyRent
     * @param {string} sourceOfInfo
     * @param {number, string} numberOfUnits
     * @returns {RentCompsActions}
     */
    verifyAddedComparable(index, numberOfRooms, numberOfBedrooms, monthlyRent,
                          sourceOfInfo, numberOfUnits = 0) {
        if (numberOfUnits === 0) {
            rentCompsPage.uncategorizedTable.find(rentCompsPage.getCategoryRowByIndexLocator(index)).then(row => {
                this.verifyCellText(row, rentCompsPage.categoryRoomsCellsLocator, numberOfRooms);
                this.verifyCellText(row, rentCompsPage.categoryBedroomsCellsLocator, numberOfBedrooms);
                const rentTextToBe = typeof monthlyRent === "string" ? `$${monthlyRent}` : `$${numberWithCommas(monthlyRent)}`;
                this.verifyCellText(row, rentCompsPage.categoryRentsCellsLocator, rentTextToBe);
                const rentForCalc = typeof monthlyRent === "string" ? monthlyRent.replace(",", "")
                    : monthlyRent;
                const perRoom = numberWithCommas(Math.round(rentForCalc / numberOfRooms));
                this.verifyCellText(row, rentCompsPage.categoryRentPerRoomLocator, `$${perRoom}`);
                this.verifyCellText(row, rentCompsPage.categorySourceOfInfoLocator, sourceOfInfo);
            });
        }
        return this;
    }

    /**
     *
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
     *
     * @param {number} index
     * @param {Readonly<{bedrooms: number | string, rooms: number | string, monthly: string | number,
     * sourceInfoCheck: string}>} rentCompData
     * @returns {RentCompsActions}
     */
    verifyComparableBedroomTableByNumber(index, rentCompData) {
        rentCompsPage.getBedroomTableByNumber(rentCompData.bedrooms).find(rentCompsPage.getCategoryRowByIndexLocator(index))
            .then(row => {
                this.verifyCellText(row, rentCompsPage.categoryRoomsCellsLocator, rentCompData.rooms)
                    .verifyCellText(row, rentCompsPage.categoryBedroomsCellsLocator, rentCompData.bedrooms);
                const monthlyRentText = typeof rentCompData.monthly === "string" ? `$${rentCompData.monthly}` :
                    `$${numberWithCommas(rentCompData.monthly)}`;
                this.verifyCellText(row, rentCompsPage.categoryRentsCellsLocator, monthlyRentText);
                const rentForCalc = typeof rentCompData.monthly === "string" ?
                    rentCompData.monthly.replace(",", "") : rentCompData.monthly;
                const perRoom = numberWithCommas(Math.round(rentForCalc / rentCompData.rooms));
                this.verifyCellText(row, rentCompsPage.categoryRentPerRoomLocator, `$${perRoom}`)
                    .verifyCellText(row, rentCompsPage.categorySourceOfInfoLocator, rentCompData.sourceInfoCheck);
            });
        return this;
    }
}

export default new RentCompsActions();