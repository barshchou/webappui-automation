import BaseActions from "../base/base.actions";
import unitInspectionPage from "../../pages/final/unitInspection.page";

class UnitInspectionActions extends BaseActions {
    verifyNumberOfInspectedUnits(inspectedNumber = 1) {
        if (inspectedNumber === 0) {
            unitInspectionPage.generatedCommentary.should("have.text", "We have not inspected any units.");
        } else {
            unitInspectionPage.generatedCommentary.should("contain.text", `We inspected ${inspectedNumber}`);
        }
    }
}

export default new UnitInspectionActions();