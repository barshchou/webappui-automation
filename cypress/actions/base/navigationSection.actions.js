import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActions from "./base.actions";

class NavigationSectionActions extends BaseActions {

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickIncomeApproachButton() {
        navigationSectionPage.incomeApproachButton.click();
        return this;
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

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickCommercialArrow() {
        navigationSectionPage.commercialIncomeArrow.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickCommercialRentRollButton() {
        navigationSectionPage.commercialRentRollButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickCommercialStabRentRollButton() {
        navigationSectionPage.commercialStabRentRollButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickFinalButton() {
        navigationSectionPage.finalButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickUnitInspectionButton() {
        navigationSectionPage.unitInspectionButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickPropertyButton() {
        navigationSectionPage.propertyButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickCommercialUnits() {
        navigationSectionPage.commercialUnitsButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickSummaryButton() {
        navigationSectionPage.summaryButton.click();
        return this;
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

    /**
     *
     * @returns {NavigationSectionActions}
     */
    navigateToCommercialUnits() {
        this.clickSaveButton()
            .verifyProgressBarNotExist()
            .clickSaveButton()
            .verifyProgressBarNotExist();
        this.clickPropertyButton()
            .clickCommercialUnits();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    navigateToUnitInspection() {
        this.clickSaveButton()
            .clickFinalButton()
            .clickUnitInspectionButton()
            .verifyProgressBarNotExist();
        return this;
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

    /**
     *
     * @param {boolean} isWithSave
     * @returns {NavigationSectionActions}
     */
    navigateToCommercialInPlaceRentRoll(isWithSave = true) {
        this.clickIncomeApproachButton()
            .clickCommercialArrow()
            .clickCommercialRentRollButton();
        if (isWithSave) {
            this.clickYesButton();
        }
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    navigateToPropertySummary() {
        this.clickPropertyButton()
            .clickSummaryButton()
            .clickYesButton();
        return this;
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

    clickCapRateConclusion() {
        navigationSectionPage.capRateConclusion.click();
    }

    navigateToCapRateConclusion(isWithSave = true) {
        this.clickIncomeApproachButton();
        this.clickCapRateConclusion();
        if (isWithSave) {
            this.clickYesButton();
        }
    }

    clickInsurableReplacementCostBookmark() {
        navigationSectionPage.insurableReplacementCostBookmark.click().should("have.attr", "color", "#F68750");
    }
}

export default new NavigationSectionActions();