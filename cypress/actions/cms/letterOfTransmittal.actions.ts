import BaseActionsExt from "../base/base.actions.ext";
import letterOfTransmittalPage from "../../pages/cms/letterOfTransmittal.page";

class LetterOfTransmittalActions extends BaseActionsExt<typeof letterOfTransmittalPage> {
    verifyPageTitle(): LetterOfTransmittalActions {
        letterOfTransmittalPage.pageTitle.should('have.text', 'Letter of Transmittal');
        return this;
    }
}

export default new LetterOfTransmittalActions(letterOfTransmittalPage);
