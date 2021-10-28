import BaseActions from "../base/base.actions";
import siteDescriptionPage from "../../pages/property/siteDescription.page";

class SiteDescriptionActions extends BaseActions{
    editTransportationDiscussionCommentary(newCommentary) {
        siteDescriptionPage.transportationDiscussionCommEdit.click();
        siteDescriptionPage.transportationCommentary.clear().type(newCommentary).should("have.text", newCommentary);
    }

    checkSurroundingResidental() {
        siteDescriptionPage.surroundingResidentalCheckbox.check().should("have.value", "true");
    }
}

export default new SiteDescriptionActions();