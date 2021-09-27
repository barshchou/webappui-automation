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
        rentCompsPage.switchSearchConfirmButton.should("be.visible").click()
    }
}

export default new RentCompsActions();