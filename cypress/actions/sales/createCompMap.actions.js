import BaseActions from "../base/base.actions";
import createCompMapPage from "../../pages/sales/createCompMap.page";

class CreateCompMapActions extends BaseActions {

    /**
     * @returns {CreateCompMapActions}
     */
    captureScreen() {
        createCompMapPage.openWizardButton.click();
        createCompMapPage.zoomInButton.click();
        createCompMapPage.captureScreenButton.click();
        createCompMapPage.mapImage.should("have.attr", "title");
        return this;
    }

    verifyPageOpened() {
        createCompMapPage.pageHeader.should("exist");
        return this;
    }
}

export default new CreateCompMapActions();