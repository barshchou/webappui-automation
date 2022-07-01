import { findCompsPage } from "../../../../pages/sales/findComps.page";

class PropertyDescriptionFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }

    enterInternalNotes(value: string): PropertyDescriptionFormActions {
        this.Page.internalNotesTextArea.dblclick({ force:true })
        .type(value, { force:true }).clear({ force:true })
        .type(value, { force:true }).should("have.text", value);
        return this;
    }

    enterAppraiserCommentary(value: string): PropertyDescriptionFormActions {
        this.Page.appraiserCommentaryTextArea.dblclick({ force:true })
        .type(value, { force:true }).clear({ force:true })
        .type(value, { force:true });
        this.Page.appraiserCommentaryTextArea.should("have.text", value);
        return this;
    }
}
export default new PropertyDescriptionFormActions(findCompsPage);