import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActions from "./base.actions";

class NavigationSectionActions extends BaseActions {
    clickIncomeApproachButton() {
        navigationSectionPage.incomeApproachButton.click();
    }

    clickResidentialIncomeArrow() {
        navigationSectionPage.residentialIncomeArrow.click();
    }

    clickInPlaceRentRollButton() {
        navigationSectionPage.inPlaceRentRollButton.click();
    }

    clickRentCompsButton() {
        navigationSectionPage.rentCompsButton.click();
    }

    clickCommercialArrow() {
        navigationSectionPage.commercialIncomeArrow.click();
    }

    clickCommercialRentRollButton() {
        navigationSectionPage.commercialRentRollButton.click();
    }

    clickCommercialStabRentRollButton() {
        navigationSectionPage.commercialStabRentRollButton.click();
    }

    clickFinalButton() {
        navigationSectionPage.finalButton.click();
    }

    clickUnitInspectionButton() {
        navigationSectionPage.unitInspectionButton.click();
    }

    clickPropertyButton() {
        navigationSectionPage.propertyButton.click();
    }

    clickCommercialUnits() {
        navigationSectionPage.commercialUnitsButton.click();
    }

    clickSummaryButton() {
        navigationSectionPage.summaryButton.click();
    }

    clickClientButton() {
        navigationSectionPage.clientButton.click();
    }

    clickSiteDescriptionButton() {
        navigationSectionPage.siteDescription.click();
    }

    clickMapsButton() {
        navigationSectionPage.propertyMaps.click();
    }

    navigateToCommercialUnits() {
        this.clickSaveButton();
        this.verifyProgressBarNotExist();
        this.clickSaveButton();
        this.verifyProgressBarNotExist();
        this.clickPropertyButton();
        this.clickCommercialUnits();
    }

    navigateToUnitInspection() {
        this.clickSaveButton();
        this.clickFinalButton();
        this.clickUnitInspectionButton();
        this.verifyProgressBarNotExist();
    }

    navigateToInPlaceRentRoll() {
        this.clickIncomeApproachButton();
        this.clickResidentialIncomeArrow();
        this.clickInPlaceRentRollButton();
        this.clickYesButton();
    }

    navigateToRentComps() {
        this.clickIncomeApproachButton();
        this.clickResidentialIncomeArrow();
        this.clickRentCompsButton();
        this.clickYesButton();
    }

    navigateToCommercialInPlaceRentRoll(isWithSave = true) {
        this.clickIncomeApproachButton();
        this.clickCommercialArrow();
        this.clickCommercialRentRollButton();
        if (isWithSave) {
            this.clickYesButton();
        }
    }

    navigateToPropertySummary() {
        this.clickPropertyButton();
        this.clickSummaryButton();
        this.clickYesButton();
    }

    openClientPageInReport() {
        this.clickClientButton();
        this.clickYesButton();
    }

    openSiteDescriptionInProperty() {
        this.clickSiteDescriptionButton();
        this.clickYesButton();
    }

    openMapsInProperty() {
        this.clickMapsButton();
        this.clickYesButton();
    }

    clickExpenseForecastBookmark() {
        navigationSectionPage.expenseForecastBookmark.click().should("have.attr", "color", "#F68750");
    }
}

export default new NavigationSectionActions();