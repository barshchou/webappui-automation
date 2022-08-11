import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class OrganizationSettingsPage extends BasePage {
    bondsRateInput(bondType: BoweryReports.BondTypes) { 
        return cy.get(`[name="surveyOfCompetitiveRates.${bondType}.rate"]`); 
    }

    bondsLastUpdated(bondType: BoweryReports.BondTypes) { 
        return cy.get(`[data-qa="surveyOfCompetitiveRates.${bondType}.lastUpdated-date-picker"]>input`); 
    }

    bondsHeading(bondType: string) { return cy.xpath(`//*[h6[.='${bondType}']]/following-sibling::div[1]`); }

    bondsTooltip(bondType: string) { return this.bondsHeading(bondType).find('p'); }

    bondsIcon(bondType: string) { return this.bondsHeading(bondType).find('svg'); }

    get mortgageComponentIntroductionCommentary() { 
        return cy.xpath("//*[h6[.='Mortgage Component Introduction']]//following::*[@data-slate-string][1]"); 
    }

    get verifySurveyOfCompetitiveRatesDiscussion() { 
        return cy.xpath("//*[h6[.='Survey of Competitive Rates Discussion']]//following::*[@data-slate-editor][1]"); 
    }

    get minMortgageRate() { return cy.get('[name="surveyOfCompetitiveRates.suggestedMortgage.minRate"]'); }

    get maxMortgageRate() { return cy.get('[name="surveyOfCompetitiveRates.suggestedMortgage.maxRate"]'); }

    get complianceParagraphEditButton() { 
        return cy.xpath("//h6[.='Compliance Paragraph']//following::button[.='Edit'][1]"); 
    }

    get complianceParagraphDiscussion() { 
        return cy.xpath("//*[h6[.='Compliance Paragraph']]//following::div[@data-slate-editor][1]"); 
    }

    get complianceParagraphDiscussionSaveButton() { 
        return cy.xpath("//*[h6[.='Compliance Paragraph']]/following::button[.='Save'][1]"); 
    }

    get complianceParagraphModifiedLabel() { 
        return cy.xpath("//*[h6[.='Compliance Paragraph']]/following::*[@ui='indicator'][1]"); 
    }

    get saveButtonGlobal() { return cy.xpath("//button[@type='submit']"); }

    get successModal() { return cy.xpath("//*[contains(text(), 'Success')]"); }

    get successModalCloseButton() { return cy.xpath("//*[contains(text(), 'Success')]//following::button[1]"); }

    certificationBulletPointEditButton(index = 1) { 
        return cy.xpath(`//h6[.='Certification Bullet Point ${index}']//following::button[.='Edit'][1]`); 
    }

    certificationBulletPointDiscussion(index = 1) { 
        return cy.xpath(`//h6[.='Certification Bullet Point ${index}']//following::div[@data-slate-editor][1]`); 
    }

    certificationBulletPointDiscussionSaveButton(index = 1) { 
        return cy.xpath(`//*[h6[.='Certification Bullet Point ${index}']]/following::button[.='Save'][1]`); 
    }
}

export default new OrganizationSettingsPage();