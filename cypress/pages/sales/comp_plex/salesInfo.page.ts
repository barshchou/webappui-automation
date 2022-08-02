export default class SaleInformationForm {
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

    get SaleDateToday() {
        return cy.get('[class="ant-picker-today-btn"]');
    }

    get DropdownDatePicker() {
        return cy.get('[class="ant-picker-dropdown ant-picker-dropdown-placement-bottomLeft "]');
    }

    get BuyerGranteeNewComp() { return cy.get('[data-qa="Buyer (Grantee)"]'); }

    get SellerGrantor() { return cy.get('[data-qa="Seller (Grantor)"]'); }

    get SaleStatusDropdown() {
        return cy.get('[data-qa="Sale Status"]');
    }
}