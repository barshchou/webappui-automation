import { findCompsPage } from "../../../pages/sales/findComps.page";
import BaseActionsExt from "../../base/base.actions.ext";

class SaleInformationActions extends BaseActionsExt<typeof findCompsPage> {
    selectSaleDate(): this {
        this.Page.SaleDateCalendarNewComp.click();
        this.Page.SaleDateToday.click();
        cy.pause();
        return this;
    }

    enterInternalNotes(value: string): this {
        this.Page.internalNotesTextArea.clear().type(value).should("have.text", value);
        return this;
    }

    enterAppraiserCommentary(value: string): this {
        this.Page.appraiserCommentaryTextArea.clear().type(value).should("have.text", value);
        return this;
    }

}
export default new SaleInformationActions(findCompsPage); 