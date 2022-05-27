import { findCompsPage } from "../../../../pages/sales/findComps.page";

class PropertyDescriptionFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage){
        this.Page = page;
    }

    enterInternalNotes(value: string): this {
        this.Page.internalNotesTextArea.clear().type(value).should("have.text", value);
        return this;
    }

    enterAppraiserCommentary(value: string): this {
        this.Page.appraiserCommentaryTextArea.click().type(value).clear().type(value);
        this.Page.appraiserCommentaryTextArea.should("have.text", value);
        return this;
    }
}
export default new PropertyDescriptionFormActions(findCompsPage);