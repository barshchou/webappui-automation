import navigationSectionPage from "../../pages/base/navigationSection.page";
import { Alias } from "../../utils/alias.utils";
import BaseActionsExt from "./base.actions.ext";
import mapKeysUtils from "../../utils/mapKeys.utils";
import routesUtils from "../../utils/routes.utils";
import stabilizedRentRollPage from "../../pages/income/commercial/stabilizedRentRoll.page";
import rentRollPage from "../../pages/income/commercial/rentRoll.page";
import { BoweryReports } from "../../types/boweryReports.type";
import Enums from "../../enums/enums";
import subjectPropertyDataRouts from "../../utils/subject_property_data_routs.utils";
import { toCamelCase } from "../../../utils/string.utils";

class NavigationSectionActions extends BaseActionsExt<typeof navigationSectionPage> {
    openReviewAndExport(isNewReport = true): NavigationSectionActions {
        let reportAlias = "docxReportAsync";
        cy.intercept({
            method: 'GET',
            url: '/api/docx-report-async/get-report-hierarchy*'
        }).as(reportAlias);
        cy.get('[id="review-and-export"]').click();
        this.submitSaveChangesModal()
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.reviewExport);
        if (isNewReport) { cy.wait(`@${reportAlias}`, { timeout:20000 }); }
        return this;
    }

    verifyUnsavedChangesModal(): NavigationSectionActions {
        cy.get('[data-qa="form-confirm-dialog"]').should("be.visible");
        return this;
    }

    navigateToHighestAndBestUse(): NavigationSectionActions {
        this.clickFinalButton()
            .clickHighestAndBestUseButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.highestAndBestUse);
        return this;
    }

    navigateToPropertyZoning(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickZoningButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.zoning);
        return this;
    }

    navigateToUnitInspection(): NavigationSectionActions {
        this.clickFinalButton()
            .clickUnitInspectionButton()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.unitInspection);
        return this;
    }

    navigateToSourceInformation(saveChanges = true): NavigationSectionActions {
        this.clickFinalButton()
            .clickSourceInformation()
            .submitSaveChangesModal(saveChanges)
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.sourceOfInformation);
        return this;
    }

    navigateToResidentialUnitGroups(saveChanges = true): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickResidentialUnitGroups()
            .submitSaveChangesModal(saveChanges)
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.residentialUnitGroups);
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

    navigateToResidentialRentComps(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickRentCompsButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.residentialRentComps);
        return this;
    }

    navigateToCommercialCompGroups(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialCompGroups()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.commercialCompGroups);
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
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.propertyMarket);
        return this;
    }

    navigateToPropertyDescription() {
        this.clickPropertyButton()
            .clickPropertyDescription()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.generalPropertyDescription);
        return this;
    }

    navigateToClientPage(): NavigationSectionActions {
        this.clickReportButton()
            .clickClientButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.client);
        return this;
    }

    openSiteDescriptionInProperty(): NavigationSectionActions {
        this.clickSiteDescriptionButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.siteDescription);
        return this;
    }

    openMapsInProperty(): NavigationSectionActions {
        this.clickMapsButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.propertyMaps);
        return this;
    }

    navigateToCapRateConclusion(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCapRateConclusion()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.capRateConclusion);
        return this;
    }

    navigateToSalesValueConclusion(): NavigationSectionActions {
        this.clickSalesButton()
            .clickValueConclusionButton()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.saleValueConclusion);
        return this;
    }

    /**
     * @param ignoreGqlWait ignore gql request for comps to be resolved
     */
    navigateToFindComps(ignoreGqlWait = false): NavigationSectionActions {
        this.clickSalesButton()
            .clickFindCompsButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.salesCompsSearch);
            
        ignoreGqlWait ? cy.log("Ignore wait for sales comps fetch") 
            : cy.wait(`@${Alias.gql.SearchSalesTransactions}`, { timeout:120000 }); 
    
        return this;
    }

    navigateToAdjustComps(): NavigationSectionActions {
        this.clickSalesButton()
            .clickAdjustCompsButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.salesAdjustmentGrid);
        return this;
    }

    navigateToFinalScope(): NavigationSectionActions {
        this.clickFinalButton()
            .clickFinalScope()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.appraisalScope);
        return this;
    }

    navigateToAssumptionsConditions(): NavigationSectionActions {
        this.clickFinalButton()
            .clickAssumptionsConditions()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.assumptionConditions);
        return this;
    }

    navigateToFinalSWOTAnalysis(): NavigationSectionActions {
        this.clickFinalButton()
            .clickSWOTAnalysis()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.finalSwotAnalysis);
        return this;
    }

    navigateToCommercialRentComps(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialRentComps()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.commercialRentComps);
        return this;
    }

    navigateToCommercialCompGroupsDiscussion(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialCompGroupsDiscussion()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.commercialCompGroupsDiscussion);
        return this;
    }

    navigateToComparableExpenses(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickComparableExpenses()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.comparableExpenses);
        return this;
    }

    navigateToCommercialUnits(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickCommercialUnits()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.propertyCommercialUnits);
        return this;
    }

    navigateToRentReconciliation(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickRentReconciliationButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.commercialRentReconciliation);
        return this;
    }

    navigateToPropertyAmenities(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickAmenitiesButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.amenities);
        return this;
    }

    navigateToProfileOrganization(nameLink: string): NavigationSectionActions {
        this.clickProfileOrganization()
            .selectLink(nameLink)
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.organizationInfo);
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
            .clickMiscellaneousMenuIfClosed()
            .clickLaundryButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.laundryIncome);
        return this;
    }

    navigateToStorage(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousMenuIfClosed()
            .clickStorageButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.storageIncome);
        return this;
    }

    navigateToOther(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousMenuIfClosed()
            .clickOtherButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.otherIncome);
        return this;
    }

    navigateToParking(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickMiscellaneousMenuIfClosed()
            .clickParkingButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.parkingIncome);
        return this;
    }

    navigateToCoverPage(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickCoverPage()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.coverPage);
        return this;
    }

    navigateToIntroduction(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickIntroduction()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.introduction);
        return this;
    }

    navigateToLetterOfTransmittal(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickLetterOfTransmittal()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.letterOfTransmittal);
        return this;
    }

    navigateToCertification(): NavigationSectionActions {
        this.clickPreviewEditButton()
            .clickCertification()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.certification);
        return this;
    }

    navigateToPotentialGrossIncome(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickPotentialGrossIncome()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.potentialGrossIncome);
        return this;
    }

    navigateToProForma(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickProForma()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.proForma);
        return this;
    }

    navigateToReportKeyInfo(): NavigationSectionActions {
        this.clickReportButton()
            .clickReportInfoButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.keyInfo);
        return this;
    }

    navigateToExpenseHistory(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickExpenseHistoryButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.expenseHistory);
        return this;
    }

    navigateToExpenseForecast(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickExpenseForecastButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.expenseForecast)
            .verifyProgressBarNotExist();
        return this;
    }

    navigateToSupportingCapRates(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickSupportingCapRates()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.supportingCapRates);
        return this;
    }

    navigateToTaxInfo(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickTaxInfo()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.taxInfo);
        return this;
    }

    navigateToCommercialReimbursementSummary(): NavigationSectionActions {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialReimbursementSummaryButton()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.commercialReimbursementSummary);
        return this;
    }

    navigateToResidentialStabilizedRentRoll(): this {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickResidentialStabilizedRentRoll()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.residentialStabilizedRentRoll);
        return this;
    }

    navigateToResidentialStabilizedRentRollSummary(): this {
        this.clickIncomeApproachButton()
            .clickResidentialMenuIfClosed()
            .clickResidentialStabilizedRentRollSummary()
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.residentialStabilizedRentRollSummary);
        return this;
    }

    navigateToCommercialStabilizedRentRoll(): this {
        this.clickIncomeApproachButton()
            .clickCommercialMenuIfClosed()
            .clickCommercialStabRentRollButton()
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
            .submitSaveChangesModal()
            .waitForUrl(routesUtils.reportAppraiser);
        return this;
    }

    navigateToRenovation(): NavigationSectionActions {
        this.clickPropertyButton()
            .clickRenovationButton()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.renovation);
        return this;
    }

    navigateToSubjectPropertyData(section: BoweryReports.SubjectPropertyDataSections = Enums
        .SUBJECT_PROPERTY_DATA_SECTIONS.siteDetails, isSubmitChanges = true
    ): NavigationSectionActions {
        const routeToBe = subjectPropertyDataRouts[toCamelCase(section.replaceAll("-", " "))];
        this.clickDataCollectionsIcon()
            .clickSubjectPropertyDataMenuIfClosed()
            .clickSubjectPropertyDataSectionAnchor(section)
            .submitSaveChangesModal(isSubmitChanges)
            .verifyProgressBarNotExist()
            .waitForUrl(routeToBe);
        return this;
    }

    navigateToFinalValuesReconciliation(): NavigationSectionActions {
        this.clickFinalButton()
            .clickFinalValuesReconciliation()
            .submitSaveChangesModal()
            .verifyProgressBarNotExist()
            .waitForUrl(routesUtils.finalValuesReconciliation);
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

    private clickMiscellaneousMenuIfClosed(): NavigationSectionActions {
        navigationSectionPage.miscellaneousIncome.then(el => {
            if (!el.hasClass("expanded")) {
                this.clickMiscellaneousIncome();
            }
        });

        return this;
    }

    clickSubjectPropertyDataMenuIfClosed(): NavigationSectionActions {
        navigationSectionPage.subjectPropertyDataDropdown.then(el => {
            if (!el.hasClass("expanded")) {
                navigationSectionPage.subjectPropertyDataDropdown.click();
            }
        });
        return this;
    }

    /**
     * @description Opens specific page by url, that contains id of current report, 
     * which is opened in moment of method call
     * @param pageRoute The route to specific page, pages routes are contained in pages_routes enums directory
     */
    openPageByUrl(pageRoute: string): NavigationSectionActions {
        const baseUrl = Cypress.config().baseUrl;
        const routeToPaste = pageRoute.startsWith("/") ? pageRoute.replace("/", "") : pageRoute;
        cy._mapGet(mapKeysUtils.reportId).then(reportId => {
            cy.visit(`${baseUrl}/report/${reportId}/${routeToPaste}`);
        });

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

    //#region Click actions

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

    clickFinalButton(): NavigationSectionActions {
        navigationSectionPage.finalButton.click();
        return this;
    }

    clickHighestAndBestUseButton(): NavigationSectionActions {
        navigationSectionPage.highestAndBestUseButton.click();
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

    clickZoningButton(): NavigationSectionActions {
        navigationSectionPage.zoningButton.click();
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

    clickExpenseForecastBookmark(): NavigationSectionActions {
        navigationSectionPage.expenseForecastBookmark.click().should("have.attr", "color", "#F68750");
        return this;
    }

    clickCapRateConclusion(): NavigationSectionActions {
        navigationSectionPage.capRateConclusion.click();
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

    clickFindCompsButton(): NavigationSectionActions {
        navigationSectionPage.findCompsButton.click();
        return this;
    }

    clickAdjustCompsButton(): NavigationSectionActions {
        navigationSectionPage.adjustCompsButton.click();
        return this;
    }

    clickFinalScope(): NavigationSectionActions {
        navigationSectionPage.finalScope.click();
        return this;
    }

    clickAssumptionsConditions(): NavigationSectionActions {
        navigationSectionPage.assumptionsConditions.click();
        return this;
    }

    clickSWOTAnalysis(): NavigationSectionActions {
        navigationSectionPage.swotAnalysis.click();
        return this;
    }

    clickCommercialCompGroupsDiscussion(): NavigationSectionActions {
        navigationSectionPage.commercialCompGroupsDiscussionButton.click();
        return this;
    }

    clickCommercialRentComps(): NavigationSectionActions {
        navigationSectionPage.commercialRentCompsButton.click();
        return this;
    }

    clickComparableExpenses(): NavigationSectionActions {
        navigationSectionPage.comparableExpenses.click();
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

    clickPotentialGrossIncome(): NavigationSectionActions {
        navigationSectionPage.potentialGrossIncome.click();
        return this;
    }

    clickTaxInfo(): NavigationSectionActions {
        navigationSectionPage.taxInfo.click();
        return this;
    }

    clickProForma(): NavigationSectionActions {
        navigationSectionPage.proForma.click();
        return this;
    }

    clickCommercialCompGroups(): NavigationSectionActions {
        navigationSectionPage.commercialCompGroups.click();
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

    clickExpenseForecastButton(): NavigationSectionActions {
        navigationSectionPage.expenseForecast.click();
        return this;
    }

    clickSupportingCapRates(): NavigationSectionActions {
        navigationSectionPage.supportingCapRates.click();
        return this;
    }

    clickCommercialReimbursementSummaryButton(): NavigationSectionActions {
        navigationSectionPage.commercialReimbursementButton.click();
        return this;
    }

    clickResidentialStabilizedRentRollSummary(): this {
        navigationSectionPage.residentialStabilizedRentRollSummary.click();
        return this;
    }

    clickAppraiserButton(): NavigationSectionActions {
        navigationSectionPage.reportAppraiserButton.click();
        return this;
    }

    clickRenovationButton(): NavigationSectionActions {
        navigationSectionPage.renovationButton.click();
        return this;
    }

    clickContentManagementSystem(): NavigationSectionActions {
        navigationSectionPage.contentManagementSystemButton.click();
        return this;
    }

    clickFinalValuesReconciliation(): NavigationSectionActions {
        navigationSectionPage.finalValuesReconciliationButton.click();
        return this;
    }

    clickDataCollectionsIcon(): NavigationSectionActions {
        navigationSectionPage.dataCollectionsIcon.click();
        return this;
    }

    clickSubjectPropertyDataSectionAnchor(section: BoweryReports.SubjectPropertyDataSections
    ): NavigationSectionActions {
        navigationSectionPage.getSubjectPropertyDataSectionAnchor(section).click();
        return this;
    }

    //#endregion
    
}

export default new NavigationSectionActions(navigationSectionPage);
