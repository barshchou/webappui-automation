import navigationSectionPage from "../../pages/base/navigationSection.page";
import { Alias } from "../../utils/alias.utils";
import BaseActionsExt from "./base.actions.ext";
import mapKeysUtils from "../../utils/mapKeys.utils";

class NavigationSectionActions extends BaseActionsExt<typeof navigationSectionPage> {
    clickYesIfExist() {
        cy.get("body").then($body => {
                if ($body.text().includes("You have unsaved changes")) {
                    cy.get("[data-qa=form-confirm-dialog]").invoke('prop', 'hidden').then($prop => {
                        cy.log(`${$prop}`);
                        if ($prop == false) {
                            this.clickYesButton();
                        }
                    });
                }
            });
        return this;
    }

    openReviewAndExport(isNewReport = true) {
        let reportAlias = "docxReportAsync";
        cy.intercept({
            method: 'GET',
            url: '/api/docx-report-async/get-report-hierarchy*'
        }).as(reportAlias);
        cy.get('[id="review-and-export"]').click();
        this.clickYesIfExist();
        this.verifyProgressBarNotExist();
        if (isNewReport) cy.wait(`@${reportAlias}`, { timeout:20000 });
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
        this.clickYesIfExist();
        return this;
    }

    clickCommercialStabRentRollButton() {
        navigationSectionPage.commercialStabRentRollButton.click();
        return this;
    }

    navigateToStabilizedRentRollInCommercial() {
        this.clickCommercialStabRentRollButton()
            .clickYesIfExist();
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

    clickMarketButton() {
        navigationSectionPage.marketButton.click();
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

    clickResidentialStabilizedRentRoll(): this {
        navigationSectionPage.residentialStabilizedRentRoll.click();
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
            .clickResidentialMenuIfClosed()
            .clickInPlaceRentRollButton()
            .clickYesIfExist();
        return this;
    }

    navigateToRentComps() {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickRentCompsButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCompGroups() {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialCompGroups()
            .clickYesIfExist();
        return this;
    }

    openRentCompsInResidential() {
        this.clickRentCompsButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCommercialInPlaceRentRoll() {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialRentRollButton()
            .clickYesIfExist();
        return this;
    }

    openInPlaceRentRollInCommercial(): NavigationSectionActions {
        this.clickCommercialRentRollButton()
            .clickYesIfExist();
        return this;
    }

    navigateToPropertySummary() {
        this.clickPropertyButton()
            .clickSummaryButton()
            .clickYesIfExist();
        return this;
    }

    navigateToPropertyMarket(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickMarketButton()
            .clickYesIfExist();
        return this;
    }

    navigateToClientPage() {
        this.clickReportButton()
            .clickClientButton()
            .clickYesIfExist();
        return this;
    }

    openSiteDescriptionInProperty() {
        this.clickSiteDescriptionButton()
            .clickYesIfExist();
        return this;
    }

    openMapsInProperty() {
        this.clickMapsButton()
            .clickYesIfExist();
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

    navigateToCapRateConclusion() {
        this.clickIncomeApproachButton()
            .clickCapRateConclusion()
            .clickYesIfExist();
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
            .clickYesIfExist();
        return this;
    }

    clickFindCompsButton() {
        navigationSectionPage.findCompsButton.click();
        return this;
    }

    navigateToFindComps() {
        this.clickSalesButton()
            .clickFindCompsButton()
            .clickYesIfExist();        
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`, { timeout:120000 });
    
        return this;
    }

    clickAdjustCompsButton() {
        navigationSectionPage.adjustCompsButton.click();
        return this;
    }

    navigateToAdjustComps() {
        this.clickSalesButton()
            .clickAdjustCompsButton()
            .clickYesIfExist();
        return this;
    }

    clickCommercialRentComps() {
        navigationSectionPage.commercialRentCompsButton.click();
        return this;
    }

    clickCommercialCompGroupsDiscussion() {
        navigationSectionPage.commercialCompGroupsDiscussionButton.click();
        return this;
    }

    navigateToCommercialRentComps() {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialRentComps()
            .clickYesIfExist();
        return this;
    }

    clickComparableExpenses() {
        navigationSectionPage.comparableExpenses.click();
        return this;
    }

    navigateToComparableExpenses() {
        this.clickIncomeApproachButton()
            .clickComparableExpenses()
            .clickYesIfExist();
        return this;
    }

    navigateToCommercialUnits() {
        this.clickPropertyButton()
            .clickCommercialUnits()
            .clickYesIfExist();
        return this;
    }

    openInPlaceRentRollInResidential() {
        this.clickInPlaceRentRollButton()
            .clickYesIfExist();
        return this;
    }

    navigateToRentReconcillation() {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickRentReconcillationButton()
            .clickYesIfExist();
        return this;
    }

    clickRentReconcillationButton() {
        navigationSectionPage.commercialRentReconcillationButton.click();
        return this;
    }

    clickAmenitiesButton() {
        navigationSectionPage.amenities.click();
        return this;
    }

    navigateToPropertyAmenities() {
        this.clickPropertyButton()
            .clickAmenitiesButton()
            .clickYesIfExist();
        return this;
    }

    clickLaundryButton() {
        navigationSectionPage.laundry.click();
        return this;
    }

    clickStorageButton() {
        navigationSectionPage.storage.click();
        return this;
    }

    clickOtherButton() {
        navigationSectionPage.other.click();
        return this;
    }

    clickParkingButton() {
        navigationSectionPage.parking.click();
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
            .clickYesIfExist();
        return this;
    }

    navigateToStorage() {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickStorageButton()
            .clickYesIfExist();
        return this;
    }

    navigateToOther() {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickOtherButton()
            .clickYesIfExist();
        return this;
    }

    navigateToParking() {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickParkingButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCoverPage() {
        this.clickPreviewEditButton()
        .clickCoverPage()
        .clickYesIfExist();
    return this;
    }

    navigateToIntroduction() {
        this.clickPreviewEditButton()
        .clickIntroduction()
        .clickYesIfExist();
    return this;
    }

    navigateToLetterOfTransmittal() {
        this.clickPreviewEditButton()
            .clickLetterOfTransmittal()
            .clickYesIfExist();
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
            .clickYesIfExist();
        return this;
    }

    clickProForma() {
        navigationSectionPage.proForma.click();
        return this;
    }
  
    navigateToProForma(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickProForma();
            this.clickYesIfExist();
        return this;
    }

    clickCommercialCompGroups() {
        navigationSectionPage.commercialCompGroups.click();
        return this;
    }

    openCompGroupsInCommercial() {
        this.clickCommercialCompGroups()
            .clickYesIfExist();
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
            .clickYesIfExist();
        return this;
    }

    clickExpenseForecastButton(): NavigationSectionActions {
        navigationSectionPage.expenseForecast.click();
        return this;
    }

    navigateToExpenseForecast(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickExpenseForecastButton()
            .clickYesIfExist();
        return this;
    }

    clickSupportingCapRates(): NavigationSectionActions {
        navigationSectionPage.supportingCapRates.click();
        return this;
    }

    navigateToSupportingCapRates(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickSupportingCapRates()
            .clickYesIfExist();
        return this;
    }

    navigateToTaxInfo(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickTaxInfo()
            .clickYesIfExist();
        return this;
    }

    openCommercialStabilizedRentRollInCommercial(): NavigationSectionActions {
        this.clickCommercialStabRentRollButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCommercialReimbursementSummary(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialReimbursementSummaryButton()
            .clickYesIfExist();
        return this;
    }

    clickCommercialReimbursementSummaryButton(): NavigationSectionActions {
        navigationSectionPage.comercialReimbursementButton.click();
        return this;
    }

    navigateToResidentialStabilizedRentRoll(): this {
        this.clickIncomeApproachButton();
        this.clickResidentialMenuIfClosed();
        this.clickResidentialStabilizedRentRoll()
            .clickYesIfExist();
        return this;
    }

    navigateToCommercialStabilizedRentRoll(): this {
        this.clickIncomeApproachButton();
        this.clickCommercialMenuIfClosed();
        this.clickCommercialStabRentRollButton()
            .clickYesIfExist();
        return this;
    }

    private clickCommercialMenuIfClosed(): NavigationSectionActions {
        navigationSectionPage.commercialIncomeArrow.then(el => {
            if (!el.hasClass("expanded")) {
                this.clickCommercialArrow();
            }
        });

        return this;
    }

    private clickResidentialMenuIfClosed(): NavigationSectionActions {
        navigationSectionPage.residentialIncomeArrow.then(el => {
            if (!el.hasClass("expanded")) {
                this.clickResidentialIncomeArrow();
            }
        });

        return this;
    }

    openPageByVisit(pageRoute: string): NavigationSectionActions {
        const baseUrl = Cypress.config().baseUrl;
        cy._mapGet(mapKeysUtils.report_id).then(reportId => {
            cy.visit(`${baseUrl}/report/${reportId}/${pageRoute}`);
        });
        return this;
    }
}

export default new NavigationSectionActions(navigationSectionPage);
