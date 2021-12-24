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

    /**
     *
     * @returns {RentCompsActions}
     */
    clickUnitTypesArrowButton() {
        rentCompsPage.unitTypesArrowButton.scrollIntoView().should("be.visible").click();
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {RentCompsActions}
     */
    checkCheckboxByQaAttr(attribute) {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "false").check({force: true}).should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {RentCompsActions}
     */
    uncheckCheckboxByQaAttr(attribute) {
        rentCompsPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "true").uncheck({force: true}).should("have.value", "false");
        return this;
    }

    /**
     *
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
     *
     * @param {Array<string>} attributes
     * @returns {RentCompsActions}
     */
    uncheckListOfCheckboxesByQa(attributes) {
        attributes.forEach(attr => {
            this.uncheckCheckboxByQaAttr(attr);
        });
        return this;
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

    /**
     *
     * @param {string} fieldName
     * @param {string} value
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
     *
     * @param {string} fieldName
     * @param {string} value
     * @returns {RentCompsActions}
     */
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
        return this;
    }

    /**
     *
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

    /**
     *
     * @returns {RentCompsActions}
     */
    clickNumberOfBedroomsArrow() {
        rentCompsPage.numberOfBedroomsArrowButton.should("be.enabled").click();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickSourceOfInfoButton() {
        rentCompsPage.sourceOfInfoArrow.should("be.enabled").click();
        return this;
    }

    /**
     *
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
     *
     * @param {Array<string>} types
     * @param {Array<string>} [dates]
     * @returns {RentCompsActions}
     */
    enterDatesToInputs(types, dates) {
        dates = dates ?? [getTodayDateString(), getTodayDateString()];
        for (let i = 0; i < dates.length; i++) {
            this.enterDateInput(dates[i], types[i]);
        }
        return this;
    }

    /**
     *
     * @param {Array<string>} types
     * @returns {RentCompsActions}
     */
    clearDateInputs(types) {
        types.forEach(type => {
            this.clearDateInput(type);
        });
        return this;
    }

    /**
     *
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

    /**
     *
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
     *
     * @param {string} day
     * @returns {RentCompsActions}
     */
    clickDayInPicker(day) {
        day = day ?? Number(getTodayDay());
        rentCompsPage.getDayInCurrentMonthPicker(day).scrollIntoView().should("be.visible").click();
        return this;
    }

    /**
     *
     * @param {string} type
     * @param {string} date
     * @returns {RentCompsActions}
     */
    verifyEnteredDate(type, date) {
        date = date ?? getTodayDateString();
        if (type === "min") {
            rentCompsPage.dateMinInputToCheckValue.should("have.value", date);
        } else {
            rentCompsPage.dateMaxInputToCheckValue.should("have.value", date);
        }
        return this;
    }

    /**
     *
     * @param {string} type
     * @param {string} day
     * @returns {RentCompsActions}
     */
    selectDayFromPicker(type, day) {
        this.clickPickerButton(type);
        rentCompsPage.pickerCalendar.should("be.visible");
        this.clickDayInPicker(day);
        return this;
    }

    /**
     *
     * @param {Array<string>} types
     * @param {Array<string>} [days]
     * @returns {RentCompsActions}
     */
    selectDaysFromPickerByTypes(types, days) {
        days = days ?? [Number(getTodayDay()), Number(getTodayDay())];
        for (let i = 0; i < types.length; i++) {
            this.selectDayFromPicker(types[i], days[i]);
        }
        return this;
    }

    /**
     *
     * @param {Array<string>} types
     * @param {Array<string>} [dates]
     * @returns {RentCompsActions}
     */
    verifyEnteredDatesByTypes(types, dates) {
        dates = dates ?? [getTodayDateString(), getTodayDateString()];
        for (let i = 0; i < types.length; i++) {
            this.verifyEnteredDate(types[i], dates[i]);
        }
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickAmenitiesArrow() {
        rentCompsPage.amenitiesArrowButton.should("be.enabled").click();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyNumberOfFoundResultsExist() {
        rentCompsPage.numberOfFoundResults.should("exist").should("contain.text", "Results Found");
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickResetFiltersButton() {
        rentCompsPage.resetFiltersButton.click();
        return this;
    }

    /**
     *
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

    /**
     *
     * @param {Array<string>} values
     * @returns {RentCompsActions}
     */
    selectSortByOptionsByValues(values) {
        values.forEach(value => {
            this.selectSortByOptionByValue(value);
        });
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyLoadingDoesntExist() {
        rentCompsPage.loadingModal.should("not.exist");
        return this;
    }

    /**
     *
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
     *
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

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyCompAddressesExist() {
        rentCompsPage.comparableAddressesTexts.each($address => {
            expect($address).not.to.be.empty;
        });
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyRentsTexts() {
        rentCompsPage.rentElementsTexts.each($rentEl => {
            cy.wrap($rentEl).should("exist").should("contain.text", "/month")
                .should("contain.text", "/SF");
        });
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyCompAmenitiesTextsExist() {
        rentCompsPage.comparablesAmenitiesTexts.each($amenityEl => {
            cy.wrap($amenityEl).should("exist").should("contain.text", "bed")
                .should("contain.text", "bath");
        });
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyComparablePropertyTextsExist() {
        rentCompsPage.comparablePropertyTexts.each($propertyEl => {
            cy.wrap($propertyEl).should("exist").should("contain.text", "mi. away")
                .should("contain.text", "SF").should("contain.text", "Valued:");
        });
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    verifyLoadingModalExist() {
        rentCompsPage.loadingModal.should("exist");
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickZoomInButton() {
        rentCompsPage.zoomInButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesntExist();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
    clickZoomOutButton() {
        rentCompsPage.zoomOutButton.click();
        this.verifyLoadingModalExist()
            .verifyLoadingDoesntExist();
        return this;
    }

    /**
     *
     * @returns {RentCompsActions}
     */
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
        return this;
    }

    /**
     *
     * @param {number} numberOfUnits
     * @returns {RentCompsActions}
     */
    verifyComparableGroups(numberOfUnits) {
        if (numberOfUnits === 0) {
            rentCompsPage.uncategorizedTable.find(rentCompsPage.indexColumnCellsSelector).then(indexCells => {
                rentCompsPage.selectedComparableButtons.should("have.length", indexCells.length);
            });
        }
        return this;
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