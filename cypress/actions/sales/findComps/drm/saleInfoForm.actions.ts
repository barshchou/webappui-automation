import { findCompsPage } from "../../../../pages/sales/findComps.page";

class SaleInfoFromActions {

    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }

    selectSaleDate(): this {
        this.Page.SaleDateCalendarNewComp.click();
        this.Page.SaleDateToday.click();
        return this;
    }

    setBuyerGrantee(name: string): this {
        this.Page.BuyerGranteeNewComp.type(name);
        return this;
    }

    setSellerGarantor(seller: string): this {
        this.Page.SellerGrantor.type(seller);   
        return this;
    }    
}
export default new SaleInfoFromActions(findCompsPage);