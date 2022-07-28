import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class SiteDescriptionPage extends BasePage {
    get siteDescriptionTitle() { return cy.get("[data-qa=siteDescription]"); }

    get transportationCommEdit() { return cy.get("*[data-qa*='transportationDiscussion'] [data-qa*='edit-btn']"); }

    get transportationCommentary() { return cy.get("*[name='transportationDiscussion.commentary']"); }

    get surroundingResidentialCheckbox() { return cy.get("*[data-qa='surroundingUses.residential'] input"); }

    get siteDescriptorSiteArea() { return cy.get("*[data-qa='site-descriptor-site-area']"); }

    get siteDescriptorPropShape() { return cy.get("*[data-qa='site-descriptor-property-shape']"); }

    get siteDescriptorFrontage() { return cy.get("*[data-qa='site-descriptor-frontage']"); }

    get siteDescriptionItems() { return cy.get("*[name*=siteDescriptors][name*=name]"); }

    get floodHazardEditButton() { 
        return cy.get("*[data-qa*='floodHazardDiscussion-generated'] [data-qa*='edit-btn']"); 
    }

    get floodHazardCommentary() { return cy.get("*[name='floodHazardDiscussion.commentary']"); }

    get utilitiesItems() { return cy.get("*[name*=utilities][name*=name]"); }

    get utilitiesDescriptions() { return cy.get("*[name*=utilities][name*=description]"); }

    getGeneratedCommentary(discussion: BoweryReports.PropertyDiscussion) {
        return cy.get(`[data-qa='${discussion}Description.commentary-generated-text']`);
    }
}

export default new SiteDescriptionPage();