import { findCompsPage } from "../../../pages/sales/findComps.page";
import BaseActionsExt from "../../base/base.actions.ext";

class PropertyInformationActions extends BaseActionsExt<typeof findCompsPage> {
    selectSaleDate(){
        this.Page.SaleDateCalendarNewComp.click();
        this.Page.SaleDateToday.click();
        cy.pause();
        return this;
    }

}
export default new PropertyInformationActions(findCompsPage); 