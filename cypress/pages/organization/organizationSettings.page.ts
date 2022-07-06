import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class OrganizationSettingsPage extends BasePage{
    bondsRateInput(bondType: BoweryReports.BondTypes) { return cy.get(`[name="surveyOfCompetitiveRates.${bondType}.rate"]`); }

    bondsLastUpdated(bondType: BoweryReports.BondTypes) { return cy.get(`[data-qa="surveyOfCompetitiveRates.${bondType}.lastUpdated-date-picker"]>input`);}

    bondsHeading(bondType: string) {return cy.xpath(`//*[h6[.='${bondType}']]/following-sibling::div[1]`);}

    bondsTooltip(bondType: string) {return this.bondsHeading(bondType).find('p');}

    bondsIcon(bondType: string) {return this.bondsHeading(bondType).find('svg');}

    get surveyOfCompetitiveRatesCommentary() {return cy.xpath("//*[h6[.='Mortgage Component Introduction']]//following::*[@data-slate-string][1]");}
}

export default new OrganizationSettingsPage();