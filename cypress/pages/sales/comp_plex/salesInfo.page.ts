export default class SaleInformationForm {
    get LinkTypeInput(){
        return cy.get('[data-qa="Link Type"]', { includeShadowDom:true });
    }

    get LinkTypeList(){
        return cy.get('[class="rc-virtual-list"]', { includeShadowDom:true });
    }

    getLinkTypeListOption(optionName = "Bowery Subject"){
        return cy.get(`[data-qa="Link Type"] [title="${optionName}"]`);
    }

    get SaleDateCalendarNewComp() {return cy.get('[data-qa="Sale Date"]', { includeShadowDom:true });}

    get SaleDateToday(){
        return cy.get('[class="ant-picker-today-btn"]', { includeShadowDom: true });
    }

    get DropdownPicker(){
        return cy.get('[class="ant-picker-dropdown ant-picker-dropdown-placement-bottomLeft "]', { includeShadowDom: true });
    }

    get BuyerGranteeNewComp() {return cy.get('[data-qa="Buyer (Grantee)"]', { includeShadowDom:true });}

    get SellerGrantor() {return cy.get('[data-qa="Seller (Grantor)"]', { includeShadowDom:true });}

    get SaleStatusDropdown() {
        return cy.get('[data-qa="Sale Status"]', { includeShadowDom: true });
    }
}