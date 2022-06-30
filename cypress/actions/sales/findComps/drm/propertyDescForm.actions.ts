import { findCompsPage } from "../../../../pages/sales/findComps.page";

class PropertyDescriptionFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }

    enterInternalNotes(value: string): PropertyDescriptionFormActions {
        this.Page.internalNotesTextArea.click().clear()
        .type(value, { force:true }).should("have.text", value);
        return this;
    }

    enterAppraiserCommentary(value: string): PropertyDescriptionFormActions {
        this.Page.appraiserCommentaryTextArea.click()
        .type(value, { force:true }).clear()
        .type(value, { force:true });
        this.Page.appraiserCommentaryTextArea.should("have.text", value);
        return this;
    }
}
export default new PropertyDescriptionFormActions(findCompsPage);