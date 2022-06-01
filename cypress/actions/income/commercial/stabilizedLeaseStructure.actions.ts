import stabilizedLeaseStructurePage from "../../../pages/income/commercial/stabilizedLeaseStructure.page";
import BaseActionsExt from "../../base/base.actions.ext";

class stabilizedLeaseStructureActions extends BaseActionsExt<typeof stabilizedLeaseStructurePage> {
  
    verifyThatPageIsOpened(): this {
        stabilizedLeaseStructurePage.stabilizedLeaseStructureHeaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-stabilized-lease-structure'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-stabilized-lease-structure")).should("be.true");
        });
        return this;
    }
}
export default new stabilizedLeaseStructureActions(stabilizedLeaseStructurePage);