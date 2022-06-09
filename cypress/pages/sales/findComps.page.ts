import { applyMixins } from "../../utils/object.utils";
import BasePage from "../base/base.page";
import PropertyInformationForm from "./drm/propertyInfo.page";
import SaleInformationForm from "./drm/salesInfo.page";

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

    get importCompModal() {return cy.get("[data-qa*=import][data-qa*=modal]", { includeShadowDom: true });}

    get csvInput() {return cy.get("[data-qa=file-input]", { includeShadowDom: true });}

    getSelectCompFromMapButtonByAddress(address) {
        return cy.get("[class*=salesCompItemWrapper]", { includeShadowDom: true }).contains(`${address}`).parent()
        .siblings("[class*=buttonsColumn]").find("span").contains("ADD").parent();
    }

    // getRemoveSelectedCompButtonByAddress(address) {
    //     return cy.xpath(`//*[contains(text(), '${address}')]//parent::td//following-sibling::td` +
    //         "//descendant::button[@aria-label='Remove']");
    // }

    getRemoveSelectedCompButtonByAddress(address) {
        return cy.contains(address, { includeShadowDom: true }).parent("td").siblings("td").children("button[@aria-label='Remove']");
    }

    // getRemoveDeletedCompButtonByAddress(address) {
    //     return cy.xpath(`//*[contains(text(), '${address}')]//parent::td//following-sibling::td` +
    //         "//descendant::button[@aria-label='Add']//following::button[@aria-label='Remove'][1]");
    // }

    getRemoveDeletedCompButtonByAddress(address) {
        return cy.contains(address, { includeShadowDom: true }).parent("td").siblings("td").children("button[@aria-label='Add']")
            .next("button[@aria-label='Add'");
    }

    getRemoveCompFromMapButtonByAddress(address) {
        return cy.get("comp-plex").shadow().find("[class*=salesCompItemWrapper]").contains(`${address}`).parent()
        .siblings("[class*=buttonsColumn]").find("span").contains("REMOVE").parent();
    }

    get reportToSearchCompInput() {return cy.get("[name^=report]", { includeShadowDom: true });}

    get importReportCompsButton() {return this.importCompModal.find("span").contains("Import")
        .parent("button");}

    // get searchButton() {return cy.xpath("//button[.='Search']");}

    get searchButton() {return cy.get("button[.='Search']", { includeShadowDom: true });}

    // get importCompsSelectButtons() {return cy.xpath("//*[.='Selected for report']//following::button[.='Select']");}

    get importCompsSelectButtons() {return cy.contains("Selected for report", { includeShadowDom: true }).siblings("button[.='Select']");}

    get createCompSearchResults() {return cy.get("[data-qa=search-result-form] tbody tr", { includeShadowDom: true });}

    // get createNewCompButton() {return cy.xpath("//button[.='Create New']");}

    get createNewCompButton() {return cy.contains("Create New", { includeShadowDom: true });}

    // get createCompNumberResidentialUnits() {return cy.xpath("//*[.='# Residential Units*']//child::input");}

    get createCompNumberResidentialUnits() {return cy.get("comp-plex").shadow().contains("Residential Units").children("input");}

    // get conditionDropdown() {return cy.xpath("//*[text()='Condition']//following::*[@class='ant-select-selector'][1]");}

    get conditionDropdown() {return cy.contains("Condition", { includeShadowDom: true }).next(".ant-select");}

    getDropdownOption(title: string) {return cy.get(`.ant-select-item-option[title='${title}']`, { includeShadowDom: true });}

    // get errorMessageNewComp() {return cy.xpath("//*[text()='Required'][contains(@class, 'errorText')]");}

    get errorMessageNewComp() {return cy.contains("Required", { includeShadowDom: true });}

    // get newCompContinueButton() {return cy.xpath("//button[.='Continue']");}

    get newCompContinueButton() {return cy.get("button.Continue", { includeShadowDom: true });}

    // get netRentableAreaNewComp() {return cy.xpath("//*[.='Net Rentable Area']//child::input");}

    get netRentableAreaNewComp() {return cy.contains("Net Rentable Area", { includeShadowDom: true }).children("input");}

    // get averageUnitSizeNewComp() {return cy.xpath("//*[.='Average Unit Size']//child::input");}

    get averageUnitSizeNewComp() {return cy.contains("Average Unit Size", { includeShadowDom: true }).children("input");}

    // get newCompSaveAndCloseButton() {return cy.xpath("//button[.='Save & Close']");}

    get newCompSaveAndCloseButton() {return cy.contains("Save & Close", { includeShadowDom: true });}
}

/**
 * ernst: We create an interface which merges
 * the expected mixins with the same name as your base
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindCompsPage extends PropertyInformationForm, SaleInformationForm {}
applyMixins(FindCompsPage, [ PropertyInformationForm, SaleInformationForm ]);

export const findCompsPage = new FindCompsPage();