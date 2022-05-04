import letterOfTransmittalPage from "../../pages/preview_edit/letterOfTransmittal.page";
import BaseActionsExt from "../base/base.actions.ext";

class LetterOfTransmittalActions extends BaseActionsExt<typeof letterOfTransmittalPage> {

    verifyPreviewButtonSelected() {
        letterOfTransmittalPage.previewButton.should("have.attr", "aria-pressed", "true");
        return this;
    }
}

export default new LetterOfTransmittalActions(letterOfTransmittalPage);