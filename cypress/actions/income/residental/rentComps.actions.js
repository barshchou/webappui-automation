import BaseActions from "../../base/base.actions";
import rentCompsPage from "../../../pages/income/residental/rentComps.page";
import {getTodayDateString, getTodayDay, isDateHasCorrectFormat} from "../../../../utils/date.utils";

class RentCompsActions extends BaseActions{
    verifyGCText(conclusionType = "AS_IS") {
        if (conclusionType === "AS_IS") {
            rentCompsPage.generatedCommentary.should("exist").should("contain.text",
                "In order to gauge the reasonableness of the contract rents, " +
                "we have examined the following rental activity in the submarket:");
        } else {
            rentCompsPage.generatedCommentary.should("exist").should("contain.text",
                "In order to forecast the market rents, " +
                "we have examined the following rental activity in the submarket:");
        }
    }

    clickUnitSwitchButton() {
        rentCompsPage.unitSwitchButton.should("be.enabled").click();
    }

    clickBuildingSwitchButton() {
        rentCompsPage.buildingSwitchButton.should("be.enabled").click();
    }

    verifyBuildingSelected() {
        rentCompsPage.buildingSwitchButton.should("have.attr","data-qa-isselected", "true");
    }

    verifyUnitSelected() {
        rentCompsPage.unitSwitchButton.should("have.attr","data-qa-isselected", "true");
    }

    clickSwitchConfirmButton() {
        rentCompsPage.switchSearchConfirmButton.should("be.visible").click();
    }

    clickUnitTypesArrowButton() {
        rentCompsPage.unitTypesArrowButton.scrollIntoView().should("be.visible").click();
    }
    
    checkUncheckCheckboxByQaAttr(attribute, check = true) {
        if (check) {
            rentCompsPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "false").check({force:true}).should("have.value", "true");
        } else {
            rentCompsPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "true").uncheck({force:true}).should("have.value", "false");
        }
    }
    
    checkUncheckListOfCheckboxesByQa(attributes, check = true) {
        if (check) {
            attributes.forEach(attr => {
                this.checkUncheckCheckboxByQaAttr(attr);
            });
        } else {
            attributes.forEach(attr => {
                this.checkUncheckCheckboxByQaAttr(attr, false);
            });
        }
    }

    verifyPopUpTextExist() {
        rentCompsPage.changeCompTypePopUpMessage.should("exist");
    }

    changeToBuildingSearch() {
        this.clickBuildingSwitchButton();
        this.verifyPopUpTextExist();
        this.clickSwitchConfirmButton();
        this.verifyBuildingSelected();
    }

    changeToUnitSearch() {
        this.clickUnitSwitchButton();
        this.verifyPopUpTextExist();
        this.clickSwitchConfirmButton();
        this.verifyUnitSelected();
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
        rentCompsPage.sortByDropdown.should("be.visible").click({force:true});
        rentCompsPage.getSortDropdownOptionByValue(value).click();
        rentCompsPage.sortByDropdown.should("have.text", value);
    }

    selectSortByOptionsByValues(values) {
        values.forEach(value => {
           this.selectSortByOptionByValue(value);
        });
    }

    verifyLoadingDoesntExist() {
        rentCompsPage.loadingModal.should("not.exist");
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
            let addressArray = $address.text().split(",");
            expect(addressArray).to.have.length(3);
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
}

export default new RentCompsActions();