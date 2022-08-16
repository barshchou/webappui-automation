import BasePage from "../base/base.page";

class ContentManagementSystemPage extends BasePage {
    get cmsGlobalHeader() { return cy.xpath(`//li/div[.='Global']`); }

    get cmsGlobalIcon() { return cy.get(`[aria-label='Global'] svg`); }

    get letterOfTransmittalNav() { return cy.xpath(`//div[.='Letter Of Transmittal']`); }

    get SWOTAnalysisNav() { return cy.xpath(`//div[.='SWOT Analysis']`); }

    get incomeCapitalizationApproachNav() { return cy.xpath(`//div[.='Income Capitalization Approach']`); }

    get certificationNav() { return cy.xpath(`//div[.='Certification']`); }
}

export default new ContentManagementSystemPage();
