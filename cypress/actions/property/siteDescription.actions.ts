import siteDescriptionPage from "../../pages/property/siteDescription.page";
import { numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

class SiteDescriptionActions extends BaseActionsExt<typeof siteDescriptionPage> {

    editTransportationDiscussionCommentary(newCommentary: string): SiteDescriptionActions {
        siteDescriptionPage.transportationCommEdit.click();
        siteDescriptionPage.transportationCommentary.type(newCommentary).clear()
            .type(newCommentary).should("have.text", newCommentary);
        return this;
    }

    checkSurroundingResidential(): SiteDescriptionActions {
        siteDescriptionPage.surroundingResidentialCheckbox.check().should("have.value", "true");
        return this;
    }

    verifySiteArea(areaToBe: number): SiteDescriptionActions {
        const areaWithCommas = numberWithCommas(areaToBe);
        siteDescriptionPage.siteDescriptorSiteArea.should("have.text", `${areaWithCommas} square feet`);
        return this;
    }

    verifyPropertyShape(shapeToBe: string): SiteDescriptionActions {
        siteDescriptionPage.siteDescriptorPropShape.should("have.text", shapeToBe);
        return this;
    }

    verifyPropertyFrontage(frontageToBe: number): SiteDescriptionActions {
        siteDescriptionPage.siteDescriptorFrontage.should("contain.text", `${frontageToBe} ft`);
        return this;
    }

    verifySiteDescriptionItems(itemsToBe: Array<string>): SiteDescriptionActions {
        siteDescriptionPage.siteDescriptionItems.then(items => {
            for (let i = 0; i < items.length; i++) {
                cy.wrap(items[i]).should("have.value", itemsToBe[i]);
            }
        });
        return this;
    }

    editFloodHazardCommentary(newCommentary: string): SiteDescriptionActions {
        siteDescriptionPage.floodHazardEditButton.click();
        siteDescriptionPage.floodHazardCommentary.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }

    verifyUtilitiesItems(itemsToBe: Array<string>): SiteDescriptionActions {
        siteDescriptionPage.utilitiesItems.then(items => {
            for (let i = 0; i < items.length; i++) {
                cy.wrap(items[i]).should("have.value", itemsToBe[i]);
            }
        });
        return this;
    }

    verifyUtilitiesDescriptions(description: string): SiteDescriptionActions {
        siteDescriptionPage.utilitiesDescriptions.then(elements => {
            for (let i = 0; i < elements.length; i++) {
                let textToCheck = "City";
                if (i >= 2) {
                    cy.wrap(elements[i]).clear().type(description);
                    textToCheck = description;
                }
                cy.wrap(elements[i]).should("have.text", textToCheck);
            }
        });
        return this;
    }
    
    verifyGeneratedCommentary(discussion: BoweryReports.PropertyDiscussion, textToBe: string): SiteDescriptionActions {
        siteDescriptionPage.getGeneratedCommentary(discussion)
            .should("have.text", textToBe);
        return this;
    }
}

export default new SiteDescriptionActions(siteDescriptionPage);