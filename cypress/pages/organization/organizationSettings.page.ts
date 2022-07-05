import { BoweryAutomation } from "../../types/boweryAutomation.type";
import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class OrganizationSettingsPage extends BasePage{
    treasuryBondsRateInput(bondType: BoweryReports.BondTypes) { return cy.get(`[name="surveyOfCompetitiveRates.${bondType}.rate"]`); }

    treasuryBondsLastUpdated(bondType: BoweryReports.BondTypes) { return cy.get(`[data-qa="surveyOfCompetitiveRates.${bondType}.lastUpdated-date-picker"]>input`);}
}

export default new OrganizationSettingsPage();