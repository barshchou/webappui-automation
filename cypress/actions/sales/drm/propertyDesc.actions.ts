import { findCompsPage } from "../../../pages/sales/findComps.page";
import BaseActionsExt from "../../base/base.actions.ext";

class PropertyDescriptionActions extends BaseActionsExt<typeof findCompsPage> {
    enterInternalNotes(value: string): this {
        this.Page.internalNotesTextArea.clear().type(value).should("have.text", value);
        return this;
    }

    enterAppraiserCommentary(value: string): this {
        this.Page.appraiserCommentaryTextArea.clear().type(value).should("have.text", value);
        return this;
    }
}
export default new PropertyDescriptionActions(findCompsPage); 