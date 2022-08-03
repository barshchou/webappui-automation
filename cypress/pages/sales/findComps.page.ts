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

    get addressCells() { return cy.get("[data-qa=address]", { timeout: 120000, includeShadowDom: true }); }

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

    get importReportCompsButton() {
        return this.importCompModal.find("span").contains("Import")
            .parent("button"); 
    }

    get searchButton() {
        return cy.contains("Report Unique ID", { includeShadowDom: true })
            .next().find("button", { includeShadowDom: true }); 
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
}

/**
 * ernst: We create an interface which merges
 * the expected mixins with the same name as your base
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindCompsPage extends PropertyInformationForm, SaleInformationForm, SalesCompsDetailsForm {}
applyMixins(FindCompsPage, [ PropertyInformationForm, SaleInformationForm, SalesCompsDetailsForm ]);

export const findCompsPage = new FindCompsPage();