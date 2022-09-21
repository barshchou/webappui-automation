import { CompPlex } from "../../../types/compplex.type";

export default class SaleInformationForm {
    get SaleInfoCancelBtn() {
        return cy.get('[data-qa="info-cancel-btn"]');
    }

    get SaleInfoDoneBtn() {
        return cy.get('[data-qa="info-done-btn"]');
    }

    get LinkTypeInput() {
        return cy.get('[data-qa="Link Type"]');
    }

    get LinkTypeList() {
        return cy.get('[class="rc-virtual-list"]');
    }

    getLinkTypeListOption(optionName = "Bowery Subject") {
        return cy.get(`[data-qa="Link Type"] [title="${optionName}"]`);
    }

    get SaleDateCalendarNewComp() { return cy.get('[data-qa="Sale Date"]'); }

    get ListingAsOfDateCalendarNewComp() { return cy.get('[data-qa="Listing as of Date"]'); }

    get ContractDateCalendarNewComp() { return cy.get('[data-qa="Contract Date"]'); }

    get SaleDateToday() {
        return cy.get('[class="ant-picker-today-btn"]');
    }

    get DropdownDatePicker() {
        return cy.get('[class="ant-picker-dropdown ant-picker-dropdown-placement-bottomLeft "]');
    }

    get SaleInfoPricePerUnit() {
        return cy.get('[data-qa="Price per Unit"]', { includeShadowDom: true });
    }

    get SaleInfoPricePerSF() {
        return cy.get('[data-qa="Price per SF"]', { includeShadowDom:true });
    }

    get BuyerGranteeNewComp() { 
        return cy.get('[data-qa="Buyer (Grantee)"]'); 
    }

    get SellerGrantor() { 
        return cy.get('[data-qa="Seller (Grantor)"]'); 
    }

    get SaleStatusDropdown() {
        return cy.get('[data-qa="Sale Status"]');
    }

    get DeedSalePriceInput() {
        return cy.get('[data-qa="Deed Sale Price"]'); 
    }

    getSaleStatus(status: CompPlex.SaleInfo.SaleStatus) {
        return cy.get(`[label="${status}"]`);
    }

    get contractPriceInput() {
        return cy.get(`[data-qa="Contract Price"]`);
    }

    saleCondition(radioName: CompPlex.SaleInfo.SaleCondition) {
        return cy.get(`input[class="ant-radio-input"][value="${radioName}"]`);
    }
    
}