import { getRandomDate } from './../../../../../utils/date.utils';
import { findCompsPage } from "../../../../pages/sales/findComps.page";
import { CompPlex } from '../../../../types/compplex.type';

class SaleInfoFromActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    /*
     * Method for selecting date in calendar on 'Sale Information' 
     * modal (when the comp is added manually)
     */
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
        this.Page.BuyerGranteeNewComp.focus().type(name, { force: true });
        return this;
    }

    setSellerGrantor(seller: string): SaleInfoFromActions {
        this.Page.SellerGrantor.focus().type(seller, { force: true });
        return this;
    }

    setDeedSalePrice(price: string) {
        this.Page.DeedSalePriceInput.type(price, { force:true });
        return this;
    }

    setSaleStatus(status: CompPlex.SaleInfo.SaleStatus) {
        this.Page.SaleStatusDropdown.click();
        this.Page.getSaleStatus(status).click();
    }
    
    saveChangesOnDone(): SaleInfoFromActions {
        this.Page.doneButton.should('be.enabled').focus().click();
        return this;
    }

    checkRadioButtonSaleCondition(radioName: CompPlex.SaleInfo.SaleCondition): SaleInfoFromActions {
        this.Page.saleCondition(radioName).should('exist').focus().check({ force: true })
            .should('be.checked');
        return this;
    }

}
export default new SaleInfoFromActions(findCompsPage);