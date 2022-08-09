import BasePage from "../base/base.page";

class ContentManagementSystemPage extends BasePage {
    get cmsGlobalHeader() { return cy.xpath(`//li/div[.='Global']`); }

    get cmsGlobalIcon() { return cy.get(`[aria-label='Global'] svg`); }
}

export default new ContentManagementSystemPage();
