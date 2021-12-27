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

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickResidentialIncomeArrow() {
        navigationSectionPage.residentialIncomeArrow.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickInPlaceRentRollButton() {
        navigationSectionPage.inPlaceRentRollButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickRentCompsButton() {
        navigationSectionPage.rentCompsButton.click();
        return this;
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

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickClientButton() {
        navigationSectionPage.clientButton.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickSiteDescriptionButton() {
        navigationSectionPage.siteDescription.click();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickMapsButton() {
        navigationSectionPage.propertyMaps.click();
        return this;
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
        this.clickSaveButton();
        this.clickFinalButton()
            .clickUnitInspectionButton()
            .verifyProgressBarNotExist();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    navigateToResInPlaceRentRoll() {
        this.clickIncomeApproachButton()
            .clickResidentialIncomeArrow()
            .clickInPlaceRentRollButton()
            .clickYesButton();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    navigateToRentComps() {
        this.clickIncomeApproachButton()
            .clickResidentialIncomeArrow()
            .clickRentCompsButton()
            .clickYesButton();
        return this;
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

    /**
     *
     * @returns {NavigationSectionActions}
     */
    openClientPageInReport() {
        this.clickClientButton()
            .clickYesButton();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    openSiteDescriptionInProperty() {
        this.clickSiteDescriptionButton()
            .clickYesButton();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    openMapsInProperty() {
        this.clickMapsButton()
            .clickYesButton();
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickExpenseForecastBookmark() {
        navigationSectionPage.expenseForecastBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickCapRateConclusion() {
        navigationSectionPage.capRateConclusion.click();
        return this;
    }

    /**
     *
     * @param isWithSave
     * @returns {NavigationSectionActions}
     */
    navigateToCapRateConclusion(isWithSave = true) {
        this.clickIncomeApproachButton()
            .clickCapRateConclusion();
        if (isWithSave) {
            this.clickYesButton();
        }
        return this;
    }

    /**
     *
     * @returns {NavigationSectionActions}
     */
    clickInsurableReplacementCostBookmark() {
        navigationSectionPage.insurableReplacementCostBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }
}

export default new NavigationSectionActions();