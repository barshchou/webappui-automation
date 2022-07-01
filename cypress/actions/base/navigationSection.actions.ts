import navigationSectionPage from "../../pages/base/navigationSection.page";
import { Alias } from "../../utils/alias.utils";
import BaseActionsExt from "./base.actions.ext";
import mapKeysUtils from "../../utils/mapKeys.utils";

class NavigationSectionActions extends BaseActionsExt<typeof navigationSectionPage> {
    clickYesIfExist(): NavigationSectionActions {
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

    openReviewAndExport(isNewReport = true): NavigationSectionActions {
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
        this.clickYesIfExist();
        return this;
    }

    clickCommercialStabRentRollButton(): NavigationSectionActions {
        navigationSectionPage.commercialStabRentRollButton.click();
        return this;
    }

    navigateToStabilizedRentRollInCommercial(): NavigationSectionActions {
        this.clickCommercialStabRentRollButton()
            .clickYesIfExist();
        return this;
    }

    clickFinalButton(): NavigationSectionActions {
        navigationSectionPage.finalButton.click();
        return this;
    }

    clickUnitInspectionButton(): NavigationSectionActions {
        navigationSectionPage.unitInspectionButton.click();
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

    navigateToUnitInspection(): NavigationSectionActions {
        this.clickSaveButton();
        this.clickFinalButton()
            .clickUnitInspectionButton()
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToResInPlaceRentRoll(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickInPlaceRentRollButton()
            .clickYesIfExist();
        return this;
    }

    navigateToRentComps(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickRentCompsButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCompGroups(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialCompGroups()
            .clickYesIfExist();
        return this;
    }

    openRentCompsInResidential(): NavigationSectionActions {
        this.clickRentCompsButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCommercialInPlaceRentRoll(): NavigationSectionActions {
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

    navigateToPropertySummary(): NavigationSectionActions {
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

    navigateToClientPage(): NavigationSectionActions {
        this.clickReportButton()
            .clickClientButton()
            .clickYesIfExist();
        return this;
    }

    openSiteDescriptionInProperty(): NavigationSectionActions {
        this.clickSiteDescriptionButton()
            .clickYesIfExist();
        return this;
    }

    openMapsInProperty(): NavigationSectionActions {
        this.clickMapsButton()
            .clickYesIfExist();
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
            .clickYesIfExist();
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
            .clickYesIfExist();
        return this;
    }

    clickFindCompsButton(): NavigationSectionActions {
        navigationSectionPage.findCompsButton.click();
        return this;
    }

    navigateToFindComps(): NavigationSectionActions {
        this.clickSalesButton()
            .clickFindCompsButton()
            .clickYesIfExist();        
        cy.wait(`@${Alias.gql.SearchSalesTransactions}`, { timeout:120000 });
    
        return this;
    }

    clickAdjustCompsButton(): NavigationSectionActions {
        navigationSectionPage.adjustCompsButton.click();
        return this;
    }

    navigateToAdjustComps(): NavigationSectionActions {
        this.clickSalesButton()
            .clickAdjustCompsButton()
            .clickYesIfExist();
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
            .clickYesIfExist();
        return this;
    }

    clickComparableExpenses(): NavigationSectionActions {
        navigationSectionPage.comparableExpenses.click();
        return this;
    }

    navigateToComparableExpenses(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickComparableExpenses()
            .clickYesIfExist();
        return this;
    }

    navigateToCommercialUnits(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickCommercialUnits()
            .clickYesIfExist();
        return this;
    }

    openInPlaceRentRollInResidential(): NavigationSectionActions {
        this.clickInPlaceRentRollButton()
            .clickYesIfExist();
        return this;
    }

    navigateToRentReconcillation(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickRentReconcillationButton()
            .clickYesIfExist();
        return this;
    }

    clickRentReconcillationButton(): NavigationSectionActions {
        navigationSectionPage.commercialRentReconcillationButton.click();
        return this;
    }

    clickAmenitiesButton(): NavigationSectionActions {
        navigationSectionPage.amenities.click();
        return this;
    }

    navigateToPropertyAmenities(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickAmenitiesButton()
            .clickYesIfExist();
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

    navigateToLaundry(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickLaundryButton()
            .clickYesIfExist();
        return this;
    }

    navigateToStorage(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickStorageButton()
            .clickYesIfExist();
        return this;
    }

    navigateToOther(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickOtherButton()
            .clickYesIfExist();
        return this;
    }

    navigateToParking(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousIncome()
            .clickParkingButton()
            .clickYesIfExist();
        return this;
    }

    navigateToCoverPage(): NavigationSectionActions {
        this.clickPreviewEditButton()
        .clickCoverPage()
        .clickYesIfExist();
    return this;
    }

    navigateToIntroduction(): NavigationSectionActions {
        this.clickPreviewEditButton()
        .clickIntroduction()
        .clickYesIfExist();
    return this;
    }

    navigateToLetterOfTransmittal(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickLetterOfTransmittal()
            .clickYesIfExist();
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
            .clickYesIfExist();
        return this;
    }

    clickProForma(): NavigationSectionActions {
        navigationSectionPage.proForma.click();
        return this;
    }
  
    navigateToProForma(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickProForma();
            this.clickYesIfExist();
        return this;
    }

    clickCommercialCompGroups(): NavigationSectionActions {
        navigationSectionPage.commercialCompGroups.click();
        return this;
    }

    openCompGroupsInCommercial(): NavigationSectionActions {
        this.clickCommercialCompGroups()
            .clickYesIfExist();
        return this;
    }

    navigateToReportInformation(): NavigationSectionActions {
        this.clickReportButton()
            .clickReportInfoButton()
            .clickYesIfExist();
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

    /**
     * @description Opens specific page by url, that contains id of current report, which is opened in moment of method call
     * @param pageRoute The route to specific page, pages routes are contained in pages_routes enums directory
     */
    openPageByVisit(pageRoute: string): NavigationSectionActions {
        const baseUrl = Cypress.config().baseUrl;
        cy._mapGet(mapKeysUtils.report_id).then(reportId => {
            cy.visit(`${baseUrl}/report/${reportId}/${pageRoute}`);
        });
        return this;
    }
}

export default new NavigationSectionActions(navigationSectionPage);
