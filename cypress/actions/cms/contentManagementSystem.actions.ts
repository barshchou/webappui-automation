import BaseActionsExt from "../base/base.actions.ext";
import contentManagementSystemPage from "../../pages/cms/contentManagementSystem.page";

class ContentManagementSystemActions extends BaseActionsExt<typeof contentManagementSystemPage> {
    verifyCmsSubHeaderDisplayed(): ContentManagementSystemActions {
        contentManagementSystemPage.cmsGlobalHeader.should('exist');
        return this;
    }

    verifyGlobalIconDisplayed(): ContentManagementSystemActions {
        contentManagementSystemPage.cmsGlobalIcon.should('exist');
        return this;
    }

    openLetterOfTransmittalPage(): ContentManagementSystemActions {
        contentManagementSystemPage.letterOfTransmittalNav.click();
        return this;
    }

    openSWOTAnalysisPage(): ContentManagementSystemActions {
        contentManagementSystemPage.SWOTAnalysisNav.click();
        return this;
    }

    openIncomeCapitalizationApproachPage(): ContentManagementSystemActions {
        contentManagementSystemPage.incomeCapitalizationApproachNav.click();
        return this;
    }

    openCertificationPage(): ContentManagementSystemActions {
        contentManagementSystemPage.certificationNav.click();
        return this;
    }
}

export default new ContentManagementSystemActions(contentManagementSystemPage);
