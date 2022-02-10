import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActions from "./base.actions";

class NavigationSectionActions extends BaseActions {

    clickIncomeApproachButton() {
        navigationSectionPage.incomeApproachButton.click();
        return this;
    }

    clickResidentialIncomeArrow() {
        navigationSectionPage.residentialIncomeArrow.click();
        return this;
    }

    clickInPlaceRentRollButton() {
        navigationSectionPage.inPlaceRentRollButton.click();
        return this;
    }

    clickRentCompsButton() {
        navigationSectionPage.rentCompsButton.click();
        return this;
    }

    clickCommercialArrow() {
        navigationSectionPage.commercialIncomeArrow.click();
        return this;
    }

    clickCommercialRentRollButton() {
        navigationSectionPage.commercialRentRollButton.click();
        return this;
    }

    clickCommercialStabRentRollButton() {
        navigationSectionPage.commercialStabRentRollButton.click();
        return this;
    }

    clickFinalButton() {
        navigationSectionPage.finalButton.click();
        return this;
    }

    clickUnitInspectionButton() {
        navigationSectionPage.unitInspectionButton.click();
        return this;
    }

    clickPropertyButton() {
        navigationSectionPage.propertyButton.click();
        return this;
    }

    clickCommercialUnits() {
        navigationSectionPage.commercialUnitsButton.click();
        return this;
    }

    clickSummaryButton() {
        navigationSectionPage.summaryButton.click();
        return this;
    }

    clickReportButton() {
        navigationSectionPage.reportButton.click();
        return this;
    }

    clickClientButton() {
        navigationSectionPage.clientButton.click();
        return this;
    }

    clickSiteDescriptionButton() {
        navigationSectionPage.siteDescription.click();
        return this;
    }

    clickMapsButton() {
        navigationSectionPage.propertyMaps.click();
        return this;
    }

    navigateToUnitInspection() {
        this.clickSaveButton();
        this.clickFinalButton()
            .clickUnitInspectionButton()
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToResInPlaceRentRoll() {
        this.clickIncomeApproachButton()
            .clickResidentialIncomeArrow()
            .clickInPlaceRentRollButton()
            .clickYesButton();
        return this;
    }

    navigateToRentComps() {
        this.clickIncomeApproachButton()
            .clickResidentialIncomeArrow()
            .clickRentCompsButton()
            .clickYesButton();
        return this;
    }

    openRentCompsInResidential() {
        this.clickRentCompsButton()
            .clickYesButton();
        return this;
    }

    /**
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

    navigateToPropertySummary() {
        this.clickPropertyButton()
            .clickSummaryButton()
            .clickYesButton();
        return this;
    }

    navigateToClientPage() {
        this.clickReportButton()
            .clickClientButton()
            .clickYesButton();
        return this;
    }

    openSiteDescriptionInProperty() {
        this.clickSiteDescriptionButton()
            .clickYesButton();
        return this;
    }

    openMapsInProperty() {
        this.clickMapsButton()
            .clickYesButton();
        return this;
    }

    clickExpenseForecastBookmark() {
        navigationSectionPage.expenseForecastBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }

    clickCapRateConclusion() {
        navigationSectionPage.capRateConclusion.click();
        return this;
    }

    navigateToCapRateConclusion(isWithSave = true) {
        this.clickIncomeApproachButton()
            .clickCapRateConclusion();
        if (isWithSave) {
            this.clickYesButton();
        }
        return this;
    }

    clickSalesButton() {
        navigationSectionPage.salesApproachButton.click();
        return this;
    }

    clickValueConclusionButton() {
        navigationSectionPage.valueConclusionButton.click();
        return this;
    }

    clickInsurableReplacementCostBookmark() {
        navigationSectionPage.insurableReplacementCostBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }

    navigateToSalesValueConclusion() {
        this.clickSalesButton()
            .clickValueConclusionButton()
            .clickYesButton();
        return this;
    }

    clickFindCompsButton() {
        navigationSectionPage.findCompsButton.click();
        return this;
    }

    navigateToFindComps() {
        this.clickSalesButton()
            .clickFindCompsButton()
            .clickYesButton();
        return this;
    }

    clickAdjustCompsButton() {
        navigationSectionPage.adjustCompsButton.click();
        return this;
    }

    openAdjustCompsInSales() {
        this.clickAdjustCompsButton()
            .clickYesButton();
        return this;
    }

    clickCommercialRentComps() {
        navigationSectionPage.commercialRentCompsButton.click();
        return this;
    }

    navigateToCommercialRentComps() {
        this.clickIncomeApproachButton()
            .clickCommercialArrow()
            .clickCommercialRentComps()
            .clickYesButton();
        return this;
    }

    clickComparableExpenses() {
        navigationSectionPage.comparableExpenses.click();
        return this;
    }

    navigateToComparableExpenses() {
        this.clickIncomeApproachButton()
            .clickComparableExpenses()
            .clickYesButton();
        return this;
    }

    navigateToCommercialUnits() {
        this.clickPropertyButton()
            .clickCommercialUnits()
            .clickYesButton();
        return this;
    }

    openInPlaceRentRollInResidential(isWithSave = false) {
        this.clickInPlaceRentRollButton();
        if (isWithSave) this.clickYesButton();
        return this;
    }

    clickAmenitiesButton() {
        navigationSectionPage.amenities.click();
        return this;
    }

    navigateToPropertyAmenities() {
        this.clickPropertyButton()
            .clickAmenitiesButton()
            .clickYesButton();
        return this;
    }

    clickLaundryButton() {
        navigationSectionPage.laundry.click();
        return this;
    }

    clickMiscellaneousIncome() {
        navigationSectionPage.miscellaneousIncome.click();
        return this;
    }

    navigateToLaundry() {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickLaundryButton()
            .clickYesButton();
        return this;
    }
}

export default new NavigationSectionActions();