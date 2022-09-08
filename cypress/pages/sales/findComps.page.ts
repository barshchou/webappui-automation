import { BoweryReports } from "../../types/boweryReports.type";
import { applyMixins } from "../../utils/object.utils";
import BasePage from "../base/base.page";
import JobSearchPage from "./comp_plex/job-search.page";
import PropertyInformationForm from "./comp_plex/propertyInfo.page";
import SalesCompsDetailsForm from "./comp_plex/salesCompDetails.page";
import SaleInformationForm from "./comp_plex/salesInfo.page";
import AddressSearchPage from "./comp_plex/address-search.page";

class FindCompsPage extends BasePage {
    get propertyDescReadingBtn() {
        return cy.get('[data-qa="reading-btn"]');
    }

    get propertyDescRevertToGenerateBtn() {
        return cy.get('[data-qa="revert-to-generated-btn"]');
    }

    get createCompButton() { return cy.get("[data-qa=create-sales-comps-btn]"); }

    get searchCompAddressInput() {
        return cy.get("[data-qa='google-autocomplete-search.location-input'] input");
    }

    get findCompField() { return cy.contains("Enter New Comparable Address"); }

    get submitButton() { return cy.get("[data-qa=submit-button]"); }

    getSelectCompButtonByAddress(address) {
        return cy.contains(address).siblings("td").find("a");
    }

    get addressCells() { return cy.get("[data-qa=address]", { timeout: 120000 }); }

    get capRateCells() { return cy.get("td[data-qa=cap-rate]"); }

    get importCompsButton() { return cy.get("[data-qa=import-btn]"); }

    get importCompModal() { return cy.get('[class="ant-modal-content"]'); }

    get csvInput() { return cy.get("[data-qa=file-input]"); }

    getSelectCompFromMapButtonByAddress(address) {
        return cy.get('[data-qa="sales-comp-item"]')
            .contains(`${address}`).parent().parent()
            .find('[data-qa="sales-comp-item-add-btn"]');
    }

    /**
     * Get all sales comps from search list
     * @returns List of all rendered sales comps in search list
     */
    getSelectCompFromMapButton() {
        return cy.get('[data-qa="sales-comp-item"]')
            .find('[data-qa="sales-comp-item-add-btn"]');
    }

    /**
     * Sales Comp row in Selected Comparable table
     * @param index number of selected comparables (default - 0)
     */
    getSelectedComparable(index = 0) {
        return cy.get(`[data-qa="row-${index}"]`);
    }

    getRemoveSelectedCompButtonByAddress(address: string) {
        return cy.contains("td", address).siblings("td[data-qa=selected-comp-actions]")
            .find('[data-qa="selected-comp-remove-btn"]');
    }

    getRemoveDeletedCompButtonByAddress(address: string) {
        return cy.contains("td", address).siblings("td[data-qa=removed-comp-actions]")
            .find('[data-qa="removed-comp-remove-btn"]');
    }

    getRemoveCompFromMapButtonByAddress(address: string) {
        return cy.get("comp-plex").shadow().find("[class*=salesCompItemWrapper]").contains(`${address}`).parent()
            .siblings("[class*=buttonsColumn]").find("span").contains("REMOVE").parent();
    }

    get reportToSearchCompInput() { return cy.get("[data-qa='Report Unique ID']"); }

    get addToReportCompsButton() {
        return this.importCompModal.contains("ADD TO REPORT");
    }
       
    get selectCompsIconOnMap() {
        return cy.get('[data-testid="ArticleIcon"]');
    }

    get searchButton() {
        return cy.get("button").not('[role="tab"]')
            .contains("SEARCH");
    }

    get selectCompsButton() {
        return cy.get("button").contains("Select Comps");
    }

    get selectAllButton() {
        return this.importCompModal
            .contains("SELECT ALL");
    }

    get importCompsSelectButtons() {
        return cy.contains("Selected for report")
            .siblings('div')
            .find('[data-qa="sales-comp-item-add-btn"]');
    }

    get createCompSearchResults() {
        return cy.get("[data-qa=search-result-form] tbody tr");
    }

    get createNewCompButton() { return cy.contains("Create New"); }

    get newCompSaveAndCloseButton() { return cy.get('[data-qa="Save & Close"]'); }

    get addressSalesComparablesTable() {
        return cy.get('[data-qa="selected-sales-comps-table"] [data-qa="address"]');
    }

    get sortSalesCompsSelectList() {
        return cy.get('[data-qa="sortSalesComps-select-list"]');
    }

    sortSalesCompsSelectListOption(sortType: BoweryReports.FindComps.SelectedComparablesSortType) {
        return cy.get(`[data-qa="sortSalesComps-${sortType}-select-option"]`);
    }

    get sortSalesCompsSelectValue() {
        return this.sortSalesCompsSelectList.find('[data-qa="select-value"]');
    }

    get salesCompsDateSold() {
        return cy.get('[data-qa="sale-date"]');
    }

    get loadingModalCSV() {
        return cy.get('[data-qa="loading-modal"] [data-icon="file-upload"]', { timeout: 60000 });
    }

    get resetAllButton() {
        return cy.contains('RESET ALL');
    }

    get loadingModalSpinner() {
        return cy.get('[data-qa="loading-modal"] [data-icon="spinner"]', { timeout: 60000 });
    }

    get filterSalePeriod() {
        return cy.get('[data-qa="filter-completedInPeriod"]');
    }

    get compStatusFilter() {
        return cy.get("[data-qa=filter-statuses]");
    }

    filterOptionValue(value: string) {
        return cy.get(`[role="option"][data-value="${value}"]`);
    }

    filterPropertyTypeValue(value: string) {
        return cy.get(`[data-value="${value}"]`);
    }

    get compSearchTab() {
        return cy.get('[data-qa="comp-tab"]');
    }

    get addressSearchTab() {
        return cy.get('[data-qa="address-tab"]');
    }

    get jobSearchTab() {
        return cy.get('[data-qa="job-tab"]');
    }
    
    get selectedForReportTitle() {
        return this.importCompModal.contains("Selected for report");
    }

    get sfNewComp() {
        return cy.get('[title="SF"]');
    }

    compEditButton(index = 0) {
        return this.getSelectedComparable(index).xpath(`//button[.='Details']`).eq(index);
    }

    get saveCompProperty() {
        return cy.get(`[class="ant-modal-footer"]`, { includeShadowDom: true }).find("button").eq(1);
    }
}

/**
 * ernst: We create an interface which merges
 * the expected mixins with the same name as your base
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindCompsPage extends PropertyInformationForm, SaleInformationForm, SalesCompsDetailsForm, 
    JobSearchPage, AddressSearchPage { }
applyMixins(FindCompsPage, [ PropertyInformationForm, SaleInformationForm, SalesCompsDetailsForm, 
    JobSearchPage, AddressSearchPage ]);

export const findCompsPage = new FindCompsPage();