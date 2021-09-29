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

    enterMinRent(value) {
        this.clearMinRent();
        rentCompsPage.minRentInput.scrollIntoView().should("be.visible")
            .should("have.attr", "placeholder", "$0").type(value).should("have.value", value);
    }

    enterMaxRent(value) {
        this.clearMaxRent();
        rentCompsPage.maxRentInput.scrollIntoView().should("be.visible")
            .should("have.attr", "placeholder", "$5,000").type(value).should("have.value", value);
    }

    clearMaxRent() {
        rentCompsPage.maxRentInput.clear();
    }

    clearMinRent() {
        rentCompsPage.minRentInput.clear();
    }
}

export default new RentCompsActions();