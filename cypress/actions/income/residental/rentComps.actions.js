import BaseActions from "../../base/base.actions";
import rentCompsPage from "../../../pages/income/residental/rentComps.page";

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
            .type(value).should("have.value", value);
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
}

export default new RentCompsActions();