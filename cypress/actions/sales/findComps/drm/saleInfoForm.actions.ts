import { getRandomDate } from './../../../../../utils/date.utils';
import { findCompsPage } from "../../../../pages/sales/findComps.page";

class SaleInfoFromActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    selectSaleDate(date = 'today'): SaleInfoFromActions {
        if (date === 'today') {
            this.Page.SaleDateCalendarNewComp.click();
            this.Page.SaleDateToday.click();
        } else if (date === 'random') {
            this.Page.SaleDateCalendarNewComp.realClick({ clickCount: 5 });
            this.Page.SaleDateCalendarNewComp.focus().clear().type(`${getRandomDate()}`).type('{enter}');
        } else {
            //TODO should edit this step for selecting data via date picker
            this.Page.SaleDateCalendarNewComp.focus().clear().type(`${date}`).type('{enter}'); 
        }
        return this;
    }

    setBuyerGrantee(name: string): SaleInfoFromActions {
        this.Page.BuyerGranteeNewComp.type(name, { force: true });
        return this;
    }

    setSellerGrantor(seller: string): SaleInfoFromActions {
        this.Page.SellerGrantor.type(seller, { force: true });
        return this;
    }

    setDeedSalePrice(price: string) {
        this.Page.DeedSalePriceInput.type(price, { force:true });
        return this;
    }

    setSaleStatus(status: "Transaction" | "Under Contract" | "Listing") {
        this.Page.SaleStatusDropdown.click();
        this.Page.getSaleStatus(status).click();
    }
}
export default new SaleInfoFromActions(findCompsPage);