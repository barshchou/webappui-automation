import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActionsExt from "./base.actions.ext";

class NavigationSectionActions extends BaseActionsExt<typeof navigationSectionPage> {
    
    openReviewAndExport(isWithSave = false) {
        let reportAlias = "docxReportAsync";
        cy.intercept({
            method: 'GET',
            url: '/api/docx-report-async/get-report-hierarchy*'
        }).as(reportAlias);
        cy.get('[id="review-and-export"]').click();
        if (isWithSave) this.clickYesButton();
        cy.wait(`@${reportAlias}`, { timeout:20000 });
        return this;
    }
    
    verifyUnsavedChangesModal() {
        cy.get('[data-qa="form-confirm-dialog"]').should("be.visible");
        return this;
    }

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

    navigateToStabilizedRentRollInCommercial() {
        this.clickCommercialStabRentRollButton()
            .clickYesButton();
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

    navigateToCommercialInPlaceRentRoll(isWithSave = true) {
        this.clickIncomeApproachButton()
            .clickCommercialArrow()
            .clickCommercialRentRollButton();
        if (isWithSave) {
            this.clickYesButton();
        }
        return this;
    }

    openInPlaceRentRollInCommercial(isWithSave = true): NavigationSectionActions {
        this.clickCommercialRentRollButton();
        if (isWithSave) this.clickYesButton();
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

    clickPreviewEditButton() {
        navigationSectionPage.previewEditButton.click();
        return this;
    }

    clickLetterOfTransmittal() {
        navigationSectionPage.letterOfTransmittal.click();
        return this;
    }

    clickCoverPage() {
        navigationSectionPage.coverPage.click();
        return this;
    }

    clickIntroduction() {
        navigationSectionPage.introduction.click();
        return this;
    }

    clickProfileOrganization() {
        navigationSectionPage.profileOrganization.click();
        return this;
    }

    selectLink(nameLink: string) {
        navigationSectionPage.menuItemsProfileOrganization.contains(nameLink).click();
        return this;
    }

    navigateToProfileOrganization(nameLink: string) {
        this.clickProfileOrganization()
            .selectLink(nameLink);
        return this;
    }

    navigateToLaundry() {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickLaundryButton()
            .clickYesButton();
        return this;
    }

    navigateToCoverPage() {
        this.clickPreviewEditButton()
        .clickCoverPage()
        .clickYesButton();
    return this;
    }

    navigateToIntroduction() {
        this.clickPreviewEditButton()
        .clickIntroduction()
        .clickYesButton();
    return this;
    }

    navigateToLetterOfTransmittal() {
        this.clickPreviewEditButton()
            .clickLetterOfTransmittal()
            .clickYesButton();
        return this;
    }

    clickPotentialGrossIncome() {
        navigationSectionPage.potentialGrossIncome.click();
        return this;
    }

    clickTaxInfo() {
        navigationSectionPage.taxInfo.click();
        return this;
    }

    navigateToPotentialGrossIncome() {
        this.clickIncomeApproachButton()
            .clickPotentialGrossIncome()
            .clickYesButton();
        return this;
    }

    clickProForma() {
        navigationSectionPage.proForma.click();
        return this;
    }
  
    navigateToProForma(isWithSave = true): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickProForma();
        if (isWithSave) {
            this.clickYesButton();
        }
        return this;
    }

    clickCommercialCompGroups() {
        navigationSectionPage.commercialCompGroups.click();
        return this;
    }

    openCompGroupsInCommercial() {
        this.clickCommercialCompGroups()
            .clickYesButton();
        return this;
    }

    navigateToReportInformation(){
        navigationSectionPage.reportInfoButton.click();
        return this;
    }

    clickExpenseHistoryButton(): NavigationSectionActions {
        navigationSectionPage.expenseHistory.click();
        return this;
    }

    navigateToExpenseHistory(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickExpenseHistoryButton()
            .clickYesButton();
        return this;
    }

    clickExpenseForecastButton(): NavigationSectionActions {
        navigationSectionPage.expenseForecast.click();
        return this;
    }

    navigateToExpenseForecast(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickExpenseForecastButton()
            .clickYesButton();
        return this;
    }

    clickSupportingCapRates(): NavigationSectionActions {
        navigationSectionPage.supportingCapRates.click();
        return this;
    }

    navigateToSupportingCapRates(isWithYes = false): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickSupportingCapRates();
        if(isWithYes) {
            this.clickYesButton();
        }
        return this;
    }

    navigateToTaxInfo(isWithSave = true): NavigationSectionActions {
        this.clickIncomeApproachButton().clickTaxInfo();
        if (isWithSave) {
            this.clickYesButton();
        } 
        return this;
    }

    openCommercialStabilizedRentRollInCommercial() {
        this.clickCommercialStabRentRollButton()
            .clickYesButton();
        return this;
    }
}

export default new NavigationSectionActions(navigationSectionPage);
