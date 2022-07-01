import { BoweryAutomation } from "../../types/boweryAutomation.type";
import BasePage from "../base/base.page";

class OrganizationSettingsPage extends BasePage{
    get treasuryBondsRateInput() { return cy.get('[name="surveyOfCompetitiveRates.tenYearTreasuryBond.rate"]'); }

    get treasuryBondsLastUpdated() { return cy.get('[data-qa="surveyOfCompetitiveRates.tenYearTreasuryBond.lastUpdated-date-picker"]>input'); }
}

export default new OrganizationSettingsPage();