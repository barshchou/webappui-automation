import appraiserPage from "../../pages/report/appraiser.page";
import { _ReportTitles } from "../../enums/pages_titles";
import BaseActionsExt from "../base/base.actions.ext";
import Enums from "../../enums/enums";
import mapKeysUtils from "../../utils/mapKeys.utils";
import { Alias } from "../../utils/alias.utils";

class AppraiserActions extends BaseActionsExt<typeof appraiserPage> {

    verifyPageOpened(): AppraiserActions {
        appraiserPage.pageHeader.should("exist").and("contain.text", _ReportTitles.APPRAISERS);
        return this;
    }

    searchAndAddAppraiser(appraiserName: string, isExternal = false): AppraiserActions {
        appraiserPage.btnAddAppraiserInspector.click();
        if (isExternal) {
            appraiserPage.modalExternalInspectorRadio.check().should("be.checked");
            appraiserPage.searchAppraiserTextField.clear()
                .type(appraiserName).should('have.value', appraiserName);
            this.Page.formAddButton().click();
        } else {
            appraiserPage.searchAppraiserTextField.clear()
                .type(appraiserName).should('have.value', appraiserName);
            this.Page.getAppraiserOptionFromList().click();
            this.Page.formAddButton().click();
        }
        return this;
    }

    searchAndAddExternalInspector(inspectorName: string): AppraiserActions {
        appraiserPage.btnAddAppraiserInspector.click();
        appraiserPage.searchAppraiserTextField.clear()
            .type(inspectorName).should('have.value', inspectorName);
        appraiserPage.modalExternalInspectorRadio.click();
        appraiserPage.formAddButton().click();
        return this;
    }
 
    verifySignCheckbox(appraiserFullName: string, enabled: boolean): AppraiserActions {
        appraiserPage.appraiserSignCheckbox(appraiserFullName).should('have.value', `${enabled}`);
        return this;
    }

    verifyPersonallyInspectedCheckbox(appraiserName: string, enabled: boolean): AppraiserActions {
        appraiserPage.personallyInspectedCheckbox(appraiserName).should('have.value', `${enabled}`);
        return this;
    }

    checkPersonallyInspected(appraiserName: string, isCheck = true): AppraiserActions {
        const locator =  appraiserPage.personallyInspectedCheckbox(appraiserName);
        isCheck ? locator.check().should("have.value", `${isCheck}`) 
            : locator.uncheck().should("have.value", `${isCheck}`);
        return this;
    }

    checkSignReport(appraiserName: string, isCheck = true): AppraiserActions {
        const locator = appraiserPage.appraiserSignCheckbox(appraiserName);
        isCheck ? locator.check().should("have.value", `${isCheck}`) 
            : locator.uncheck().should("have.value", `${isCheck}`);
        return this;
    }

    removeAppraiser(appraiserName: string): AppraiserActions {
        appraiserPage.removeAppraiserBtn(appraiserName).click().should("not.exist");
        return this;
    }

    verifyCertificationAssistanceCommentary(): AppraiserActions {
        appraiserPage.getAllNamesWithCheckSignReportCheckboxes(false).each(item => {
            appraiserPage.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.certificationAssistance)
                .should("include.text", item.text());
        });
        return this;
    }

    verifyCertificationInspectionCommentary(): AppraiserActions {
        appraiserPage.getAllNamesWithCheckPersonallyInspectedReportCheckboxes(true).each(item => {
            appraiserPage.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.certificationInspection)
                .should("include.text", item.text());
        });
        return this;
    }

    tryToAddWrongAppraiser(inspectorName: string): AppraiserActions {
        appraiserPage.btnAddAppraiserInspector.click();
        appraiserPage.searchAppraiserTextField.clear()
            .type(inspectorName).should('have.value', inspectorName);
        appraiserPage.hintText
            .should("have.text", "This appraiser / inspector isn't in the system. Please select 'External Inspector' ");
        appraiserPage.searchAppraiserTextField.clear().blur();
        appraiserPage.formCancelButton().click();
        return this;
    }

    interceptAppraisersRequest() {
        cy._mapGet(mapKeysUtils.reportId).then(reportId => {
            cy.intercept("PATCH", `/report/${reportId}`).as(Alias.reportId);
        });
    }

    verifyAppraisersFromRequest() {
        cy.wait(`@${Alias.reportId}`, { timeout: 10000 }).then(( { response } ) => {
            const appraisersArray = response.body.new.previewAndEdit.certification.appraisers;
            appraisersArray.forEach(({ fullName }) => {
                appraiserPage.appraiserSignCheckbox(fullName).should('exist');
            });
        });
        return this;
    }

    verifyAppraiserStateCertification(name: string, verifyValue: string) {
        appraiserPage.stateCertificationByAppraiserName(name).should("include.text", verifyValue);
        return this;
    }
}

export default new AppraiserActions(appraiserPage);