import appraiserPage from "../../pages/report/appraiser.page";
import { _ReportTitles } from "../../enums/pages_titles";
import BaseActionsExt from "../base/base.actions.ext";

class AppraiserActions extends BaseActionsExt<typeof appraiserPage> {

    verifyPageOpened(): AppraiserActions {
        appraiserPage.pageHeader.should("exist").and("contain.text", _ReportTitles.APPRAISERS);
        return this;
    }

    searchAndAddAppraiser(appraiserName: string): AppraiserActions {
        cy.contains("Add appraiser / inspector").click();
        appraiserPage.searchAppraiserTextField.clear()
            .type(appraiserName).should('have.value', appraiserName);
        cy.get('[data-option-index="0"]').should("be.visible").click();
        appraiserPage.formAddButton().click();
        return this;
    }

    verifySignCheckbox(appraiserFullName: string, enabled: boolean): AppraiserActions {
        appraiserPage.appraiserSignCheckbox(appraiserFullName).should('have.value', `${enabled}`);
        return this;
    }
}

export default new AppraiserActions(appraiserPage);