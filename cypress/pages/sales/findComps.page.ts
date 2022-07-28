import { BoweryReports } from "../../types/boweryReports.type";
import { applyMixins } from "../../utils/object.utils";
import BasePage from "../base/base.page";
import PropertyInformationForm from "./comp_plex/propertyInfo.page";
import SalesCompsDetailsForm from "./comp_plex/salesCompDetails.page";
import SaleInformationForm from "./comp_plex/salesInfo.page";

class FindCompsPage extends BasePage {
    get createCompButton() { return cy.get("[data-qa=create-sales-comps-btn]", { includeShadowDom: true }); }

    get searchCompAddressInput() {
        return cy.get("[data-qa='google-autocomplete-search.location-input'] input", { includeShadowDom: true });
    }

    get findCompField() { return cy.contains("Enter New Comparable Address", { includeShadowDom: true }); }

    get submitButton() { return cy.get("[data-qa=submit-button]", { includeShadowDom: true }); }

    getSelectCompButtonByAddress(address) {
        return cy.contains(address, { includeShadowDom: true }).siblings("td").find("a");
    }

    get addressCells() { return cy.get("[data-qa=address]", { includeShadowDom: true }); }

    get capRateCells() { return cy.get("td[data-qa=cap-rate]", { includeShadowDom: true }); }

    get importCompsButton() { return cy.get("[data-qa=import-btn]", { includeShadowDom: true }); }

    get importCompModal() { return cy.get('[class="ant-modal-content"]', { includeShadowDom: true }); }

    get csvInput() { return cy.get("[data-qa=file-input]", { includeShadowDom: true }); }

    getSelectCompFromMapButtonByAddress(address) {
        return cy.get('[data-qa="sales-comp-item"]', { includeShadowDom: true })
            .contains(`${address}`, { includeShadowDom: true }).parent().parent()
            .find('[data-qa="sales-comp-item-add-btn"]', { includeShadowDom: true });
    }

    /**
     * Get all sales comps from search list
     * @returns List of all rendered sales comps in search list
     */
    getSelectCompFromMapButton() {
        return cy.get('[data-qa="sales-comp-item"]', { includeShadowDom: true })
            .find('[data-qa="sales-comp-item-add-btn"]', { includeShadowDom: true });
    }

    /**
     * Sales Comp row in Selected Comparable table
     * @param index number of selected comparables (default - 0)
     */
    getSelectedComparable(index = 0) {
        return cy.get(`[data-qa="row-${index}"]`);
    }

    getRemoveSelectedCompButtonByAddress(address: string) {
        return cy.contains(address).parent().find('[data-qa="selected-comp-remove-btn"]');
    }

    getRemoveDeletedCompButtonByAddress(address: string) {
        return cy.contains(address).parent().find('[data-qa="removed-comp-remove-btn"]');
    }

    getRemoveCompFromMapButtonByAddress(address: string) {
        return cy.get("comp-plex").shadow().find("[class*=salesCompItemWrapper]").contains(`${address}`).parent()
            .siblings("[class*=buttonsColumn]").find("span").contains("REMOVE").parent();
    }

    get reportToSearchCompInput() { return cy.get("[data-qa='Report Unique ID']", { includeShadowDom: true }); }

    get addToReportCompsButton() {
        return this.importCompModal.contains("ADD TO REPORT");
    }
       
    get selectCompsIconOnMap() {
        return cy.get('[data-testid="ArticleIcon"]', { includeShadowDom: true });
    }

    get searchButton() {
        return cy.get("button", { includeShadowDom: true }).not('[role="tab"]')
            .contains("SEARCH", { includeShadowDom: true });
    }

    get selectCompsButton() {
        return cy.get("button", { includeShadowDom: true }).contains("Select Comps", { includeShadowDom: true });
    }

    get selectAllButton() {
        return this.importCompModal
            .contains("SELECT ALL", { includeShadowDom: true });
    }

    get importCompsSelectButtons() {
        return cy.contains("Selected for report", { includeShadowDom: true })
            .siblings('div')
            .find('[data-qa="sales-comp-item-add-btn"]', { includeShadowDom: true });
    }

    get createCompSearchResults() {
        return cy.get("[data-qa=search-result-form] tbody tr", { includeShadowDom: true });
    }

    get createNewCompButton() { return cy.contains("Create New", { includeShadowDom: true }); }

    get newCompSaveAndCloseButton() { return cy.get('[data-qa="Save & Close"]', { includeShadowDom: true }); }

    get addressSalesComparablesTable() {
        return cy.get('[data-qa="selected-sales-comps-table"] [data-qa="address"]');
    }

    get sortSalesCompsSelectList() {
        return cy.get('[data-qa="sortSalesComps-select-list"]');
    }

    sortSalesCompsSelectListOption(sortType: BoweryReports.SalesComps.SelectedComparablesSortType) {
        return cy.get(`[data-qa="sortSalesComps-${sortType}-select-option"]`);
    }

    get sortSalesCompsSelectValue() {
        return this.sortSalesCompsSelectList.find('[data-qa="select-value"]');
    }

    get salesCompsDateSold() {
        return cy.get('[data-qa="sale-date"]');
    }

    get loadingModalCSV() {
        return cy.get('[data-qa="loading-modal"]').contains('Give us just a sec...');
    }

    get resetAllButton() {
        return cy.contains('RESET ALL', { includeShadowDom: true });
    }

    get loadingModalSpinner() {
        return cy.get('[data-qa="loading-modal"] [data-icon="spinner"]', { includeShadowDom: true });
    }

    get filterSalePeriod() {
        return cy.get('[data-qa="filter-sale-period"]', { includeShadowDom: true });
    }

    filterSalePeriodValue(value: string) {
        return cy.get('[role="option"]', { includeShadowDom: true })
            .contains(`${value}`, { includeShadowDom: true });
    }

    get compSearchTab() {
        return cy.get('[data-qa="comp-tab"]', { includeShadowDom: true });
    }

    get adressSearchTab() {
        return cy.get('[data-qa="address-tab"]', { includeShadowDom: true });
    }

    get jobSearchTab() {
        return cy.get('[data-qa="job-tab"]', { includeShadowDom: true });
    }

    get reportIdInput() {
        return cy.get('input[placeholder="Find a specific Report ID"]', { includeShadowDom: true });
    }

}

/**
 * ernst: We create an interface which merges
 * the expected mixins with the same name as your base
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindCompsPage extends PropertyInformationForm, SaleInformationForm, SalesCompsDetailsForm { }
applyMixins(FindCompsPage, [ PropertyInformationForm, SaleInformationForm, SalesCompsDetailsForm ]);

export const findCompsPage = new FindCompsPage();