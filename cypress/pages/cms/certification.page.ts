import { ContentManagementSystem } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class CertificationPage extends BasePage {
    certificationDiscussionSection(sectionName: ContentManagementSystem.DiscussionSectionName) {
        return cy.xpath(`//h6[.='${sectionName}']//following::div[@data-slate-editor][1]`);
    }

    certificationModifiedLabel(sectionName: ContentManagementSystem.DiscussionSectionName) {
        return cy.xpath(`//h6[.='${sectionName}']/following::*[@ui='indicator'][1]`);
    }
}

export default new CertificationPage();