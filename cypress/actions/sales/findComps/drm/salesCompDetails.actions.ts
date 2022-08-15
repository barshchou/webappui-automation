import { findCompsPage } from "../../../../pages/sales/findComps.page";

class SalesCompDetailsFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    openSaleInformationForm(): SalesCompDetailsFormActions {
        this.Page.SaleInfoEditBtn.should("exist").click();
        this.Page.SaleStatusDropdown.should("exist");
        return this;
    }

    
    saveCompChanges(): SalesCompDetailsFormActions {
        this.Page.saveChangesBtn.should("exist").should("be.enabled").click();
        this.Page.salesCompDetailModal.should("not.exist");
        return this;
    }
    
}
export default new SalesCompDetailsFormActions(findCompsPage);