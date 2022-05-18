import { findCompsPage } from "../../../pages/sales/findComps.page";
import BaseActionsExt from "../../base/base.actions.ext";

class SaleInformationActions extends BaseActionsExt<typeof findCompsPage> {
    selectSaleDate(): this {
        this.Page.SaleDateCalendarNewComp.click();
        this.Page.SaleDateToday.click();
        cy.pause();
        return this;
    }
}
export default new SaleInformationActions(findCompsPage); 