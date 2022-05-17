import { applyMixins } from "../../utils/object.utils";
import BasePage from "../base/base.page";
import PropertyInformationForm from "./drm/propertyInfo";

class FindCompsPage extends BasePage {
    get createCompButton() {return cy.get("[data-qa=create-sales-comps-btn]");}

    get searchCompAddressInput() {return cy.get("[data-qa='google-autocomplete-search.location-input'] input");}

    get findCompField() {return cy.contains("Enter New Comparable Address");}

    get submitButton() {return cy.get("[data-qa=submit-button]");}

    getSelectCompButtonByAddress(address) {return cy.xpath(`//*[text()='${address}']//following-sibling::td/a`);}

    get addressCells() {return cy.get("[data-qa=address]");}

    get capRateCells() {return cy.get("td[data-qa=cap-rate]");}

    get importCompsButton() {return cy.get("[data-qa=import-btn]");}

    get importCompModal() {return cy.get("[data-qa*=import][data-qa*=modal]");}

    get csvInput() {return cy.get("[data-qa=file-input]");}

    getSelectCompFromMapButtonByAddress(address) {
        return cy.get("[class*=address]").filter(`:contains('${address}')`).parent()
            .siblings("[class*=buttonsColumn]").find("span").contains("Select").parent();
    }

    getRemoveSelectedCompButtonByAddress(address) {
        return cy.xpath(`//*[contains(text(), '${address}')]//parent::td//following-sibling::td` +
            "//descendant::button[@aria-label='Remove']");
    }

    getRemoveDeletedCompButtonByAddress(address) {
        return cy.xpath(`//*[contains(text(), '${address}')]//parent::td//following-sibling::td` +
            "//descendant::button[@aria-label='Add']//following::button[@aria-label='Remove'][1]");
    }

    getRemoveCompFromMapButtonByAddress(address) {
        return cy.get("[class*=address]").filter(`:contains('${address}')`).parent()
            .siblings("[class*=buttonsColumn]").find("span").contains("Remove").parent();
    }

    get reportToSearchCompInput() {return cy.get("[name^=report]");}

    get importReportCompsButton() {return this.importCompModal.find("span").contains("Import")
        .parent("button");}

    get searchButton() {return cy.xpath("//button[.='Search']");}

    get importCompsSelectButtons() {return cy.xpath("//*[.='Selected for report']//following::button[.='Select']");}

    get createCompSearchResults() {return cy.get("[data-qa=search-result-form] tbody tr");}

    get createNewCompButton() {return cy.xpath("//button[.='Create New']");}
}

/**
 * ernst: We create an interface which merges
 * the expected mixins with the same name as your base
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindCompsPage extends PropertyInformationForm {}
applyMixins(FindCompsPage, [ PropertyInformationForm ]);

export const findCompsPage = new FindCompsPage();