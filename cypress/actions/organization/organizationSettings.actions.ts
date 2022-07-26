import { _map } from './../../support/commands';
import organizationSettingsPage from "../../pages/organization/organizationSettings.page";
import { BoweryReports } from "../../types/boweryReports.type";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationSettingsActions extends BaseActionsExt<typeof organizationSettingsPage> {
    
    getTreasuryBondRateFromAPI(url: string, date: string): OrganizationSettingsActions {
        cy.request(
            {
                method: 'GET',
                url: `${url}${date}`
            }).then((response) => {
            expect(response.status).to.eq(200);
            let rate = new DOMParser().parseFromString(response.body, "text/xml")
                .getElementsByTagName("observation")[0].getAttribute("value");
            cy._mapSet("rate", rate);
        });
        return this;
    }

    getLastUpdatedDateFromUI(bondType: BoweryReports.BondTypes): OrganizationSettingsActions {
        organizationSettingsPage.bondsLastUpdated(bondType).invoke('attr', 'value').then(date => {
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
            organizationSettingsPage.bondsRateInput(bondType).invoke('attr', 'value').then((rateValueUI) => {
                cy._mapGet("rate").then((rateValueAPI) => {
                    rateValueUI = Number(rateValueUI).toFixed(2);
                    expect(rateValueUI).to.eq(rateValueAPI);
                });
            });
        });
        return this;
    }

    verifyBondsTooltipText(bondType: string, tooltipText: string): OrganizationSettingsActions {
        organizationSettingsPage.bondsTooltip(bondType).should('have.text', tooltipText);
        return this;
    }

    verifyBondsIconColor(bondType: string, color = "rgb(6, 116, 97)"): OrganizationSettingsActions {
        organizationSettingsPage.bondsIcon(bondType).should('have.css', 'color', color);
        return this;
    }

    verifyBondsTooltip(bondType: string, tooltipText: string, color = "rgb(6, 116, 97)"): OrganizationSettingsActions {
        this.verifyBondsTooltipText(bondType, tooltipText)
            .verifyBondsIconColor(bondType, color);
        return this;
    }

    verifyMortgageComponentIntroductionCommentary(textToBe: string): OrganizationSettingsActions {
        organizationSettingsPage.mortgageComponentIntroductionCommentary.invoke('text').should('deep.equal', textToBe);
        return this;
    }

    verifySurveyOfCompetitiveRatesDiscussion(bondType: BoweryReports.BondTypes): OrganizationSettingsActions {
        organizationSettingsPage.bondsRateInput(bondType).invoke('attr', 'value').then(rateValueUI => {
            _map.set("tenYearsBondsRate", rateValueUI);
        });
        organizationSettingsPage.minMortgageRate.invoke('attr', 'value').then(minMortgageRate => {
            _map.set("minMortgageRate", minMortgageRate);
        });
        organizationSettingsPage.maxMortgageRate.invoke('attr', 'value').then(maxMortgageRate => {
            _map.set("maxMortgageRate", maxMortgageRate);
        });

        organizationSettingsPage.verifySurveyOfCompetitiveRatesDiscussion.invoke('text').then(textToBe => {
            expect(textToBe).to.be.eq("Currently, 10-year treasuries are trading at "+ 
            _map.get('tenYearsBondsRate') + "% suggesting mortgage rates of roughly " + 
            _map.get('minMortgageRate') + "% to " + _map.get('maxMortgageRate') + "%. "+
            "The current mortgage market indicates a competitive interest rate, as there is strong demand "+
            "from mortgage lenders seeking stable multi-unit residential deals.");
        }); 
        return this;
    }

    updateComplianceParagraphDiscussion(text: string, clear = false): OrganizationSettingsActions {
        this.clickComplianceParagraphEditButton()
            .editComplianceParagraphDiscussionText(text, clear)
            .saveComplianceParagraphDiscussion();

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveOrganizationSettings();
        return this;
    }

    clickComplianceParagraphEditButton(): OrganizationSettingsActions {
        organizationSettingsPage.complianceParagraphEditButton.click();
        return this;
    }

    editComplianceParagraphDiscussionText(text: string, clear = false): OrganizationSettingsActions {
        if (clear) { organizationSettingsPage.complianceParagraphDiscussion.clear(); }
        organizationSettingsPage.complianceParagraphDiscussion
            .type(text)
            .should('contain.text', text);
        return this;
    }

    verifyComplianceParagraphDiscussion(textToBe: string): OrganizationSettingsActions {
        organizationSettingsPage.complianceParagraphDiscussion.should('have.text', textToBe);
        return this;
    }

    saveComplianceParagraphDiscussion(): OrganizationSettingsActions {
        organizationSettingsPage.complianceParagraphDiscussionSaveButton.click();
        organizationSettingsPage.complianceParagraphDiscussionSaveButton.should('not.exist');
        organizationSettingsPage.complianceParagraphModifiedLabel.should('be.visible');
        return this;
    }

    saveOrganizationSettings(): OrganizationSettingsActions {
        organizationSettingsPage.saveButtonGlobal.click();
        organizationSettingsPage.successModal.should('be.visible');
        organizationSettingsPage.successModal.should('not.be.visible');
        return this;
    }

    updateCertificationBulletPointDiscussion(text: string, clear = false, index = 1): OrganizationSettingsActions {
        this.clickCertificationBulletPointEditButton(index)
            .editCertificationBulletPointDiscussionText(text, clear)
            .saveCertificationBulletPointDiscussion();
        
        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveOrganizationSettings();
        return this;
    }

    clickCertificationBulletPointEditButton(index = 1): OrganizationSettingsActions {
        organizationSettingsPage.certificationBulletPointEditButton(index).click();
        return this;
    }

    editCertificationBulletPointDiscussionText(text: string, clear = false, index = 1): OrganizationSettingsActions {
        if (clear) { organizationSettingsPage.certificationBulletPointDiscussion(index).clear(); }
        organizationSettingsPage.certificationBulletPointDiscussion(index)
            .type(text)
            .should('contain.text', text);
        return this;
    }

    verifyCertificationBulletPointDiscussion(textToBe: string,  index = 1): OrganizationSettingsActions {
        organizationSettingsPage.certificationBulletPointDiscussion(index).should('have.text', textToBe);
        return this;
    }

    saveCertificationBulletPointDiscussion(index = 1): OrganizationSettingsActions {
        organizationSettingsPage.certificationBulletPointDiscussionSaveButton(index).click();
        return this;
    }
}

export default new OrganizationSettingsActions(organizationSettingsPage);
