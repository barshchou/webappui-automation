import BaseActions from "../base/base.actions";
import createCompMapPage from "../../pages/sales/createCompMap.page";

class CreateCompMapActions extends BaseActions {

    captureScreen() {
        createCompMapPage.openWizardButton.click();
        createCompMapPage.zoomInButton.click();
        createCompMapPage.captureScreenButton.click();
        createCompMapPage.mapImage.should("have.attr", "title");
    }
}

export default new CreateCompMapActions();