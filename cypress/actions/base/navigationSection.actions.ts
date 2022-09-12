import navigationSectionPage from "../../pages/base/navigationSection.page";
import { Alias } from "../../utils/alias.utils";
import BaseActionsExt from "./base.actions.ext";
import mapKeysUtils from "../../utils/mapKeys.utils";
import routesUtils from "../../utils/routes.utils";
import { Utils } from "../../types/utils.type";
import stabilizedRentRollPage from "../../pages/income/commercial/stabilizedRentRoll.page";
import rentRollPage from "../../pages/income/commercial/rentRoll.page";

class NavigationSectionActions extends BaseActionsExt<typeof navigationSectionPage> {
    
    waitForUrl(route: Utils.Routes) {
        cy.url().should("include", route);
        return this;
    }

    submitSaveChangesModal(saveChanges = true): NavigationSectionActions {
        cy.get("body").then($body => {
            if ($body.text().includes("You have unsaved changes")) {
                cy.get("[data-qa=form-confirm-dialog]").invoke('prop', 'hidden').then($prop => {
                    cy.log(`${$prop}`);
                    if ($prop == false) {
                        if (saveChanges) { 
                            this.clickYesButton(); 
                        } else {
                            this.clickNoButton();
                        }
                    }
                });
            }
        });
        return this;
    }

    openReviewAndExport(isNewReport = true): NavigationSectionActions {
        let reportAlias = "docxReportAsync";
        cy.intercept({
            method: 'GET',
            url: '/api/docx-report-async/get-report-hierarchy*'
        }).as(reportAlias);
        cy.get('[id="review-and-export"]').click();
        this.submitSaveChangesModal();
        this.verifyProgressBarNotExist();
        if (isNewReport) { cy.wait(`@${reportAlias}`, { timeout:20000 }); }
        return this;
    }

    verifyUnsavedChangesModal(): NavigationSectionActions {
        cy.get('[data-qa="form-confirm-dialog"]').should("be.visible");
        return this;
    }

    clickIncomeApproachButton(): NavigationSectionActions {
        navigationSectionPage.incomeApproachButton.click();
        return this;
    }

    clickResidentialIncomeArrow(): NavigationSectionActions {
        navigationSectionPage.residentialIncomeArrow.click();
        return this;
    }

    clickInPlaceRentRollButton(): NavigationSectionActions {
        navigationSectionPage.inPlaceRentRollButton.click();
        return this;
    }

    clickRentCompsButton(): NavigationSectionActions {
        navigationSectionPage.rentCompsButton.click();
        return this;
    }

    clickCommercialArrow(): NavigationSectionActions {
        navigationSectionPage.commercialIncomeArrow.click();
        return this;
    }

    clickCommercialRentRollButton(): NavigationSectionActions {
        navigationSectionPage.commercialRentRollButton.click();
        return this;
    }

    clickCommercialStabRentRollButton(): NavigationSectionActions {
        navigationSectionPage.commercialStabRentRollButton.click();
        return this;
    }

    navigateToStabilizedRentRollInCommercial(): NavigationSectionActions {
        this.clickCommercialStabRentRollButton()
            .submitSaveChangesModal();
        return this;
    }

    clickFinalButton(): NavigationSectionActions {
        navigationSectionPage.finalButton.click();
        return this;
    }

    clickSourceInformation(): NavigationSectionActions {
        navigationSectionPage.sourceInformation.click();
        return this;
    }

    clickUnitInspectionButton(): NavigationSectionActions {
        navigationSectionPage.unitInspectionButton.click();
        return this;
    }

    clickResidentialUnitGroups(): NavigationSectionActions {
        navigationSectionPage.residentialUnitGroups.click();
        return this;
    }

    clickPropertyButton(): NavigationSectionActions {
        navigationSectionPage.propertyButton.click();
        return this;
    }

    clickCommercialUnits(): NavigationSectionActions {
        navigationSectionPage.commercialUnitsButton.click();
        return this;
    }

    clickSummaryButton(): NavigationSectionActions {
        navigationSectionPage.summaryButton.click();
        return this;
    }

    clickMarketButton(): NavigationSectionActions {
        navigationSectionPage.marketButton.click();
        return this;
    }

    clickPropertyDescription() {
        navigationSectionPage.propertyDescriptionButton.click();
        return this;
    }

    clickReportButton(): NavigationSectionActions {
        navigationSectionPage.reportButton.click();
        return this;
    }

    clickClientButton(): NavigationSectionActions {
        navigationSectionPage.clientButton.click();
        return this;
    }

    clickSiteDescriptionButton(): NavigationSectionActions {
        navigationSectionPage.siteDescription.click();
        return this;
    }

    clickMapsButton(): NavigationSectionActions {
        navigationSectionPage.propertyMaps.click();
        return this;
    }

    clickResidentialStabilizedRentRoll(): NavigationSectionActions {
        navigationSectionPage.residentialStabilizedRentRoll.click();
        return this;
    }

    clickPropertyHistory(): NavigationSectionActions {
        navigationSectionPage.propertyHistory.click();
        return this;
    }

    navigateToUnitInspection(): NavigationSectionActions {
        this.clickSaveButton();
        this.clickFinalButton()
            .clickUnitInspectionButton()
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToSourceInformation(saveChanges = true): NavigationSectionActions {
        this.clickFinalButton()
            .clickSourceInformation()
            .submitSaveChangesModal(saveChanges)
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToResidentialUnitGroups(saveChanges = true): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickResidentialUnitGroups()
            .submitSaveChangesModal(saveChanges)
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToResInPlaceRentRoll(saveChanges = true): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickInPlaceRentRollButton()
            .submitSaveChangesModal(saveChanges)
            .waitForUrl(routesUtils.residentialInPlaceRentRoll);
        return this;
    }

    navigateToRentComps(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickRentCompsButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToPropertyHistory(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickPropertyHistory()
            .submitSaveChangesModal();
        return this;
    }

    navigateToCompGroups(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialCompGroups()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist();
        return this;
    }

    openRentCompsInResidential(): NavigationSectionActions {
        this.clickRentCompsButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToCommercialInPlaceRentRoll(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialRentRollButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.commercialInPlaceRentRoll);
        
        // see comment to `navigateToCommercialStabilizedRentRoll` method
        rentRollPage.commercialInPlaceRentRollForm.should("be.visible");
        return this;
    }

    openInPlaceRentRollInCommercial(): NavigationSectionActions {
        this.clickCommercialRentRollButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToPropertySummary(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickSummaryButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.propertySummary);
        return this;
    }

    navigateToPropertyMarket(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickMarketButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToPropertyDescription() {
        this.clickPropertyButton()
            .clickPropertyDescription()
            .submitSaveChangesModal();
        return this;
    }

    navigateToClientPage(): NavigationSectionActions {
        this.clickReportButton()
            .clickClientButton()
            .submitSaveChangesModal();
        return this;
    }

    openSiteDescriptionInProperty(): NavigationSectionActions {
        this.clickSiteDescriptionButton()
            .submitSaveChangesModal();
        return this;
    }

    openMapsInProperty(): NavigationSectionActions {
        this.clickMapsButton()
            .submitSaveChangesModal();
        return this;
    }

    clickExpenseForecastBookmark(): NavigationSectionActions {
        navigationSectionPage.expenseForecastBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }

    clickCapRateConclusion(): NavigationSectionActions {
        navigationSectionPage.capRateConclusion.click();
        return this;
    }

    navigateToCapRateConclusion(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCapRateConclusion()
            .submitSaveChangesModal();
        return this;
    }

    clickSalesButton(): NavigationSectionActions {
        navigationSectionPage.salesApproachButton.click();
        return this;
    }

    clickValueConclusionButton(): NavigationSectionActions {
        navigationSectionPage.valueConclusionButton.click();
        return this;
    }

    clickInsurableReplacementCostBookmark(): NavigationSectionActions {
        navigationSectionPage.insurableReplacementCostBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }

    navigateToSalesValueConclusion(): NavigationSectionActions {
        this.clickSalesButton()
            .clickValueConclusionButton()
            .submitSaveChangesModal();
        return this;
    }

    clickFindCompsButton(): NavigationSectionActions {
        navigationSectionPage.findCompsButton.click();
        return this;
    }

    /**
     * @param ignoreGqlWait ignore gql request for comps to be resolved
     */
    navigateToFindComps(ignoreGqlWait = false): NavigationSectionActions {
        this.clickSalesButton()
            .clickFindCompsButton()
            .submitSaveChangesModal();
            
        ignoreGqlWait ? cy.log("Ignore wait for sales comps fetch") 
            : cy.wait(`@${Alias.gql.SearchSalesTransactions}`, { timeout:120000 }); 
    
        return this;
    }

    clickAdjustCompsButton(): NavigationSectionActions {
        navigationSectionPage.adjustCompsButton.click();
        return this;
    }

    navigateToAdjustComps(): NavigationSectionActions {
        this.clickSalesButton()
            .clickAdjustCompsButton()
            .submitSaveChangesModal();
        return this;
    }

    clickFinalScope(): NavigationSectionActions {
        navigationSectionPage.finalScope.click();
        return this;
    }

    navigateToFinalScope(): NavigationSectionActions {
        this.clickFinalButton()
            .clickFinalScope()
            .submitSaveChangesModal();
        return this;
    }

    clickAssumptionsConditions(): NavigationSectionActions {
        navigationSectionPage.assumptionsConditions.click();
        return this;
    }

    navigateToAssumptionsConditions(): NavigationSectionActions {
        this.clickFinalButton()
            .clickAssumptionsConditions()
            .submitSaveChangesModal();
        return this;
    }

    clickSWOTAnalysis(): NavigationSectionActions {
        navigationSectionPage.swotAnalysis.click();
        return this;
    }

    navigateToFinalSWOTAnalysis(): NavigationSectionActions {
        this.clickFinalButton()
            .clickSWOTAnalysis()
            .submitSaveChangesModal();
        return this;
    }

    clickCommercialRentComps(): NavigationSectionActions {
        navigationSectionPage.commercialRentCompsButton.click();
        return this;
    }

    clickCommercialCompGroupsDiscussion(): NavigationSectionActions {
        navigationSectionPage.commercialCompGroupsDiscussionButton.click();
        return this;
    }

    navigateToCommercialRentComps(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialRentComps()
            .submitSaveChangesModal();
        return this;
    }

    clickComparableExpenses(): NavigationSectionActions {
        navigationSectionPage.comparableExpenses.click();
        return this;
    }

    navigateToComparableExpenses(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickComparableExpenses()
            .submitSaveChangesModal();
        return this;
    }

    navigateToCommercialUnits(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickCommercialUnits()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.propertyCommercialUnits);
        return this;
    }

    openInPlaceRentRollInResidential(): NavigationSectionActions {
        this.clickInPlaceRentRollButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToRentReconciliation(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickRentReconciliationButton()
            .submitSaveChangesModal();
        return this;
    }

    clickRentReconciliationButton(): NavigationSectionActions {
        navigationSectionPage.commercialRentReconciliationButton.click();
        return this;
    }

    clickAmenitiesButton(): NavigationSectionActions {
        navigationSectionPage.amenities.click();
        return this;
    }

    navigateToPropertyAmenities(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickAmenitiesButton()
            .submitSaveChangesModal();
        return this;
    }

    clickLaundryButton(): NavigationSectionActions {
        navigationSectionPage.laundry.click();
        return this;
    }

    clickStorageButton(): NavigationSectionActions {
        navigationSectionPage.storage.click();
        return this;
    }

    clickOtherButton(): NavigationSectionActions {
        navigationSectionPage.other.click();
        return this;
    }

    clickParkingButton(): NavigationSectionActions {
        navigationSectionPage.parking.click();
        return this;
    }

    clickMiscellaneousIncome(): NavigationSectionActions {
        navigationSectionPage.miscellaneousIncome.click();
        return this;
    }

    clickPreviewEditButton(): NavigationSectionActions {
        navigationSectionPage.previewEditButton.click();
        return this;
    }

    clickLetterOfTransmittal(): NavigationSectionActions {
        navigationSectionPage.letterOfTransmittal.click();
        return this;
    }

    clickCertification(): NavigationSectionActions {
        navigationSectionPage.certification.click();
        return this;
    }

    clickCoverPage(): NavigationSectionActions {
        navigationSectionPage.coverPage.click();
        return this;
    }

    clickIntroduction(): NavigationSectionActions {
        navigationSectionPage.introduction.click();
        return this;
    }

    clickProfileOrganization(): NavigationSectionActions {
        navigationSectionPage.profileOrganization.click();
        return this;
    }

    selectLink(nameLink: string): NavigationSectionActions {
        navigationSectionPage.menuItemsProfileOrganization.contains(nameLink).click();
        return this;
    }

    navigateToProfileOrganization(nameLink: string): NavigationSectionActions {
        this.clickProfileOrganization()
            .selectLink(nameLink);
        return this;
    }

    navigateToContentManagementSystem(): NavigationSectionActions {
        this.clickContentManagementSystem()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToLaundry(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickLaundryButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToStorage(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickStorageButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToOther(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickOtherButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToParking(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickParkingButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToCoverPage(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickCoverPage()
            .submitSaveChangesModal();
        return this;
    }

    navigateToIntroduction(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickIntroduction()
            .submitSaveChangesModal();
        return this;
    }

    navigateToLetterOfTransmittal(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickLetterOfTransmittal()
            .submitSaveChangesModal();
        return this;
    }

    navigateToCertification(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickCertification()
            .submitSaveChangesModal();
        return this;
    }

    clickPotentialGrossIncome(): NavigationSectionActions {
        navigationSectionPage.potentialGrossIncome.click();
        return this;
    }

    clickTaxInfo(): NavigationSectionActions {
        navigationSectionPage.taxInfo.click();
        return this;
    }

    navigateToPotentialGrossIncome(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickPotentialGrossIncome()
            .submitSaveChangesModal();
        return this;
    }

    clickProForma(): NavigationSectionActions {
        navigationSectionPage.proForma.click();
        return this;
    }
  
    navigateToProForma(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickProForma();
        this.submitSaveChangesModal();
        return this;
    }

    clickCommercialCompGroups(): NavigationSectionActions {
        navigationSectionPage.commercialCompGroups.click();
        return this;
    }

    openCompGroupsInCommercial(): NavigationSectionActions {
        this.clickCommercialCompGroups()
            .submitSaveChangesModal();
        return this;
    }

    navigateToReportInformation(): NavigationSectionActions {
        this.clickReportButton()
            .clickReportInfoButton()
            .submitSaveChangesModal();
        return this;
    }

    clickReportInfoButton(): NavigationSectionActions {
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
            .submitSaveChangesModal();
        return this;
    }

    clickExpenseForecastButton(): NavigationSectionActions {
        navigationSectionPage.expenseForecast.click();
        return this;
    }

    navigateToExpenseForecast(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickExpenseForecastButton()
            .submitSaveChangesModal();
        return this;
    }

    clickSupportingCapRates(): NavigationSectionActions {
        navigationSectionPage.supportingCapRates.click();
        return this;
    }

    navigateToSupportingCapRates(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickSupportingCapRates()
            .submitSaveChangesModal();
        return this;
    }

    navigateToTaxInfo(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickTaxInfo()
            .submitSaveChangesModal();
        return this;
    }

    openCommercialStabilizedRentRollInCommercial(): NavigationSectionActions {
        this.clickCommercialStabRentRollButton()
            .submitSaveChangesModal();
        return this;
    }

    navigateToCommercialReimbursementSummary(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialReimbursementSummaryButton()
            .submitSaveChangesModal();
        return this;
    }

    clickCommercialReimbursementSummaryButton(): NavigationSectionActions {
        navigationSectionPage.commercialReimbursementButton.click();
        return this;
    }
    
    navigateToResidentialStabilizedRentRoll(): this {
        this.clickIncomeApproachButton();
        this.clickResidentialMenuIfClosed();
        this.clickResidentialStabilizedRentRoll()
            .submitSaveChangesModal();
        return this;
    }

    navigateToResidentialStabilizedRentRollSummary(): this {
        this.clickIncomeApproachButton();
        this.clickResidentialMenuIfClosed();
        this.clickResidentialStabilizedRentRollSummary()
            .submitSaveChangesModal();
        return this;
    }

    clickResidentialStabilizedRentRollSummary(): this {
        navigationSectionPage.residentialStabilizedRentRollSummary.click();
        return this;
    }

    navigateToCommercialStabilizedRentRoll(): this {
        this.clickIncomeApproachButton();
        this.clickCommercialMenuIfClosed();
        this.clickCommercialStabRentRollButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.commercialStabilizedRentRoll);
        
        /*
         * since we're working in same forms of final form component
         * we need to wait until this specific form will be rendered,
         * so we'll be sure that we're not at the old form
         * useful for such tests where we switching between Commercial -> InPlaceRentRoll and Commercial -> StabRentRoll
         */
        stabilizedRentRollPage.commercialStabRentRollForm.should("be.visible");
        return this;
    }

    logout(): NavigationSectionActions {
        this.clickProfileOrganization()
            .selectLink("Log Out");
        return this;
    }

    navigateToReportAppraiser(): NavigationSectionActions {
        this.clickReportButton()
            .clickAppraiserButton()
            .submitSaveChangesModal();
        return this;
    }

    clickAppraiserButton(): NavigationSectionActions {
        navigationSectionPage.reportAppraiserButton.click();
        return this;
    }

    navigateToRenovation(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickRenovationButton()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist();
        return this;
    }

    clickRenovationButton(): NavigationSectionActions {
        navigationSectionPage.renovationButton.click();
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

    /**
     * @description Opens specific page by url, that contains id of current report, 
     * which is opened in moment of method call
     * @param pageRoute The route to specific page, pages routes are contained in pages_routes enums directory
     */
    openPageByVisit(pageRoute: string): NavigationSectionActions {
        const baseUrl = Cypress.config().baseUrl;
        cy._mapGet(mapKeysUtils.reportId).then(reportId => {
            cy.visit(`${baseUrl}/report/${reportId}/${pageRoute}`);
        });

        return this;
    }

    clickContentManagementSystem(): NavigationSectionActions {
        navigationSectionPage.contentManagementSystemButton.click();
        return this;
    }

    hoverOverContentManagementSystemIcon(): NavigationSectionActions {
        navigationSectionPage.contentManagementSystemButton.realHover();
        return this;
    }

    hoverOverGlobalIcon(): NavigationSectionActions {
        navigationSectionPage.cmsGlobalIcon.realHover();
        return this;
    }

    verifyCmsIconTooltip(): NavigationSectionActions {
        this.hoverOverContentManagementSystemIcon();
        this.Page.tooltip.should('have.text', 'Content Management System');
        return this;
    }

    verifyGlobalIconTooltip(): NavigationSectionActions {
        this.hoverOverGlobalIcon();
        this.Page.tooltip.should('have.text', 'Global');
        return this;
    }

    verifyBottomPanelButtonsRemoved(): NavigationSectionActions {
        navigationSectionPage.contentManagementSystemButton.should('not.exist');
        navigationSectionPage.mapMakerButton.should('not.exist');
        navigationSectionPage.photoGridExportButton.should('not.exist');
        navigationSectionPage.dataExtractionToolButton.should('not.exist');
        navigationSectionPage.whatsNewButton.should('not.exist');
        navigationSectionPage.helpAndResourcesButton.should('not.exist');
        return this;
    }
}

export default new NavigationSectionActions(navigationSectionPage);
