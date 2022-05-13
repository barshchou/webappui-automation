import BaseActions from "../base/base.actions";
import createCompMapPage from "../../pages/sales/createCompMap.page";
import { Alias } from "../../utils/alias.utils";

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
        cy.wait(`@${Alias.gqlRequest}`, { timeout:60000 });
        createCompMapPage.pageHeader.should("exist");
        return this;
    }
}

export default new CreateCompMapActions();