import createCompMapPage from "../../pages/sales/createCompMap.page";
import { Alias } from "../../utils/alias.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CreateCompMapActions extends BaseActionsExt<typeof createCompMapPage> {

    captureScreen(): CreateCompMapActions {
        createCompMapPage.openWizardButton.click();
        createCompMapPage.zoomInButton.click();
        createCompMapPage.captureScreenButton.click();
        createCompMapPage.mapImage.should("have.attr", "title");
        return this;
    }

    verifyPageOpened(): CreateCompMapActions {
        cy.wait(`@${Alias.gql.UpdateJob}`, { timeout:60000 });
        createCompMapPage.pageHeader.should("exist");
        return this;
    }
}

export default new CreateCompMapActions(createCompMapPage);