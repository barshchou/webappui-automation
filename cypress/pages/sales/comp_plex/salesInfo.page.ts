export default class SaleInformationForm {
    get SaleInfoCancelBtn() {
        return cy.get('[data-qa="sale-info-cancel-btn"]', { includeShadowDom:true });
    }

    get SaleInfoDoneBtn() {
        return cy.get('[data-qa="sale-info-done-btn"]', { includeShadowDom:true });
    }

    get LinkTypeInput() {
        return cy.get('[data-qa="Link Type"]', { includeShadowDom:true });
    }

    get LinkTypeList() {
        return cy.get('[class="rc-virtual-list"]', { includeShadowDom:true });
    }

    getLinkTypeListOption(optionName = "Bowery Subject") {
        return cy.get(`[data-qa="Link Type"] [title="${optionName}"]`);
    }

    get SaleDateCalendarNewComp() { return cy.get('[data-qa="Sale Date"]', { includeShadowDom:true }); }

    get SaleDateToday() {
        return cy.get('[class="ant-picker-today-btn"]', { includeShadowDom: true });
    }

    get BuyerGranteeNewComp() { return cy.get('[data-qa="Buyer (Grantee)"]', { includeShadowDom:true }); }

    get SellerGrantor() { return cy.get('[data-qa="Seller (Grantor)"]', { includeShadowDom:true }); }

    get SaleInfoPricePerUnit() {
        return cy.get('[data-qa="Price per Unit"]', { includeShadowDom: true });
    }

    get SaleInfoPricePerSF() {
        return cy.get('[data-qa="Price per SF"]', { includeShadowDom:true });
    }
}