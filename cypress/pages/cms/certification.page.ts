import BasePage from "../base/base.page";

class CertificationPage extends BasePage {
    certificationDiscussionSection(sectionName: string) {
        return cy.xpath(`//h6[.='${sectionName}']//following::div[@data-slate-editor][1]`);
    }
}

export default new CertificationPage();