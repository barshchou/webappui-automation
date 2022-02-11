import BaseActions from "../base/base.actions";
import letterOfTransmittalPage from "../../pages/preview_edit/letterOfTransmittal.page";

class LetterOfTransmittalActions extends BaseActions {

    verifyPreviewButtonSelected() {
        letterOfTransmittalPage.previewButton.should("have.attr", "data-qa-isselected", "true");
        return this;
    }
}

export default new LetterOfTransmittalActions();