import organizationSettingsPage from "../../pages/organization/organizationSettings.page";
import { BoweryReports } from "../../types/boweryReports.type";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationSettingsActions extends BaseActionsExt<typeof organizationSettingsPage>{
    
    getTreasuryBondRateFromAPI(url: string, date: string): OrganizationSettingsActions {
        cy.request(
            {
                method: 'GET',
                url: `${url}${date}`
            }).then((response) => {
                expect(response.status).to.eq(200);
                let rate = new DOMParser().parseFromString(response.body, "text/xml").getElementsByTagName("observation")[0].getAttribute("value");
                cy._mapSet("rate", rate);
            });
        return this;
    }

    getLastUpdatedDateFromUI(bondType: BoweryReports.BondTypes): OrganizationSettingsActions{
        organizationSettingsPage.treasuryBondsLastUpdated(bondType).invoke('attr', 'value').then(date => {
            let formattedDate = new Date(date);
            const offset = formattedDate.getTimezoneOffset();
            formattedDate = new Date(formattedDate.getTime() - (offset * 60 * 1000));
            cy._mapSet('lastUpdatedDate', formattedDate.toISOString().split('T')[0]);
        });
        return this;
    }

    verifyTreasuryBondRateAgainstApi(url: string, bondType: BoweryReports.BondTypes): OrganizationSettingsActions {
        this.getLastUpdatedDateFromUI(bondType);
        cy._mapGet('lastUpdatedDate').then(date => {
            this.getTreasuryBondRateFromAPI(url, date);
            organizationSettingsPage.treasuryBondsRateInput(bondType).invoke('attr', 'value').then((rateValueUI) => {
                cy._mapGet("rate").then((rateValueAPI) => {
                    rateValueUI = Number(rateValueUI).toFixed(2);
                    expect(rateValueUI).to.eq(rateValueAPI);
                });
            });
        });
        return this;
    }
}

export default new OrganizationSettingsActions(organizationSettingsPage);