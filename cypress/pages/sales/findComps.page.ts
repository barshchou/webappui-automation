import { applyMixins } from "../../utils/object.utils";
import BasePage from "../base/base.page";
import PropertyInformationForm from "./comp_plex/propertyInfo.page";
import SaleInformationForm from "./comp_plex/salesInfo.page";

class FindCompsPage extends BasePage {
    get createCompButton() {return cy.get("[data-qa=create-sales-comps-btn]", { includeShadowDom: true });}

    get searchCompAddressInput() {return cy.get("[data-qa='google-autocomplete-search.location-input'] input", { includeShadowDom: true });}

    get findCompField() {return cy.contains("Enter New Comparable Address", { includeShadowDom: true });}

    get submitButton() {return cy.get("[data-qa=submit-button]", { includeShadowDom: true });}

    //getSelectCompButtonByAddress(address) {return cy.xpath(`//*[text()='${address}']//following-sibling::td/a`);}

    getSelectCompButtonByAddress(address) {return cy.contains(address, { includeShadowDom: true }).siblings("td").find("a");}

    get addressCells() {return cy.get("[data-qa=address]", { includeShadowDom: true });}

    get capRateCells() {return cy.get("td[data-qa=cap-rate]", { includeShadowDom: true });}

    get importCompsButton() {return cy.get("[data-qa=import-btn]", { includeShadowDom: true });}

    get importCompModal() {return cy.get('[class="ant-modal-content"]', { includeShadowDom: true });}

    get csvInput() {return cy.get("[data-qa=file-input]", { includeShadowDom: true });}

    getSelectCompFromMapButtonByAddress(address) {
        return cy.get('[data-qa="sales-comp-item"]', { includeShadowDom: true })
        .contains(`${address}`, { includeShadowDom: true }).parent()
        .find('[data-qa="sales-comp-item-add-btn"]', { includeShadowDom: true });
    }

    getRemoveSelectedCompButtonByAddress(address) {
        return cy.contains(address).parent("td").parent().find('[data-qa="selected-comp-remove-btn"]');
    }

    getRemoveDeletedCompButtonByAddress(address) {
        return cy.contains(address).parent("td").parent().find('[data-qa="removed-comp-remove-btn"]');
    }

    getRemoveCompFromMapButtonByAddress(address) {
        return cy.get("comp-plex").shadow().find("[class*=salesCompItemWrapper]").contains(`${address}`).parent()
        .siblings("[class*=buttonsColumn]").find("span").contains("REMOVE").parent();
    }

    get reportToSearchCompInput() {return cy.get("[data-qa='Report Unique ID']", { includeShadowDom: true });}

    get importReportCompsButton() {return this.importCompModal.find("span").contains("Import")
        .parent("button");}

    get searchButton() {return cy.get("button.searchButton-3-4-2", { includeShadowDom: true });}

    get importCompsSelectButtons() {return cy.contains("Selected for report", { includeShadowDom: true }).siblings("button[.='Select']");}

    get createCompSearchResults() {return cy.get("[data-qa=search-result-form] tbody tr", { includeShadowDom: true });}

    get createNewCompButton() {return cy.contains("Create New", { includeShadowDom: true });}

    get newCompSaveAndCloseButton() {return cy.get('[data-qa="Save & Close"]', { includeShadowDom: true });}
}

/**
 * ernst: We create an interface which merges
 * the expected mixins with the same name as your base
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindCompsPage extends PropertyInformationForm, SaleInformationForm {}
applyMixins(FindCompsPage, [ PropertyInformationForm, SaleInformationForm ]);

export const findCompsPage = new FindCompsPage();