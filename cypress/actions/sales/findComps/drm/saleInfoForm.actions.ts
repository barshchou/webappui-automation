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
               this.Page.SaleDateCalendarNewComp.click();
               this.Page.DropdownPicker.should('exist');
               this.Page.SaleDateCalendarNewComp.focus().clear().type(`${getRandomDate()}`).type('{enter}');
         } else {
            this.Page.SaleDateCalendarNewComp.click().type(`${date}`); //TODO complete this step
         }
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

    // setSaleStatus(saleStatus: string): SaleInfoFromActions {
    //     this.Page.SaleStatus.type(saleStatus, { force:true });   
    //     return this;
    // } 
}
export default new SaleInfoFromActions(findCompsPage);