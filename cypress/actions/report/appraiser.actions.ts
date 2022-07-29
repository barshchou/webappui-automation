import appraiserPage from "../../pages/report/appraiser.page";
import { _ReportTitles } from "../../enums/pages_titles";
import BaseActionsExt from "../base/base.actions.ext";

class AppraiserActions extends BaseActionsExt<typeof appraiserPage> {

    verifyPageOpened(): AppraiserActions {
        appraiserPage.pageHeader.should("exist").and("contain.text", _ReportTitles.APPRAISERS);
        return this;
    }

    searchAndAddAppraiser(appraiserName: string): AppraiserActions {
        appraiserPage.btnAddAppraiserInspector.click();
        appraiserPage.searchAppraiserTextField.clear()
            .type(appraiserName).should('have.value', appraiserName);
        this.Page.getAppraiserOptionFromList().click();
        this.Page.formAddButton().click();
        return this;
    }

    verifySignCheckbox(appraiserFullName: string, enabled: boolean): AppraiserActions {
        appraiserPage.appraiserSignCheckbox(appraiserFullName).should('have.value', `${enabled}`);
        return this;
    }
}

export default new AppraiserActions(appraiserPage);