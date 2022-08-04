import { findCompsPage } from "../../../../pages/sales/findComps.page";

class PropertyDescriptionFormActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
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

    // TODO: return back to this method later since it's hard to get what is going with this textarea
    enterGeneratedCommentary(value: string): PropertyDescriptionFormActions {
        cy.get('[data-qa="reading-btn"]').click({ force:true });
        this.Page.generatedCommentaryTextArea.should("be.enabled");
        cy.pause();
        this.Page.generatedCommentaryTextArea.type(`{enter}${value}`, { force: true });
        this.Page.generatedCommentaryTextArea.should("have.text", value);
        return this;
    }
}
export default new PropertyDescriptionFormActions(findCompsPage);