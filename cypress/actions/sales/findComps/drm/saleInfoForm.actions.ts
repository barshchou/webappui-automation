import { findCompsPage } from "../../../../pages/sales/findComps.page";

class SaleInfoFromActions {

    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    selectSaleDate(): SaleInfoFromActions {
        this.Page.SaleDateCalendarNewComp.click();
        this.Page.SaleDateToday.click();
        return this;
    }

    setBuyerGrantee(name: string): SaleInfoFromActions {
        this.Page.BuyerGranteeNewComp.type(name, { force: true });
        return this;
    }

    setSellerGarantor(seller: string): SaleInfoFromActions {
        this.Page.SellerGrantor.type(seller, { force:true });   
        return this;
    }    
}
export default new SaleInfoFromActions(findCompsPage);