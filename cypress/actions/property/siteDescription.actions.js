import BaseActions from "../base/base.actions";
import siteDescriptionPage from "../../pages/property/siteDescription.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class SiteDescriptionActions extends BaseActions{
    editTransportationDiscussionCommentary(newCommentary) {
        siteDescriptionPage.transportationCommEdit.click();
        siteDescriptionPage.transportationCommentary.type(newCommentary).clear()
            .type(newCommentary).should("have.text", newCommentary);
    }

    checkSurroundingResidental() {
        siteDescriptionPage.surroundingResidentalCheckbox.check().should("have.value", "true");
    }

    verifySiteArea(areaToBe) {
        const areaWithCommas = numberWithCommas(areaToBe);
        siteDescriptionPage.siteDescriptorSiteArea.should("have.text", `${areaWithCommas} square feet`);
    }

    verifyPropertyShape(shapeToBe) {
        siteDescriptionPage.siteDescriptorPropShape.should("have.text", shapeToBe);
    }

    verifyPropertyFrontage(frontageToBe) {
        siteDescriptionPage.siteDescriptorFrontage.should("contain.text", `${frontageToBe} ft`);
    }

    verifySiteDescriptionItems(itemsToBe) {
        siteDescriptionPage.siteDescriptionItems.then(items => {
            for (let i = 0; i < items.length; i++) {
                cy.wrap(items[i]).should("have.value", itemsToBe[i]);
            }
        });
    }

    editFloodHazardCommentary(newCommentary) {
        siteDescriptionPage.floodHazardEditButton.click();
        siteDescriptionPage.floodHazardCommentary.clear().type(newCommentary).should("have.text", newCommentary);
    }

    verifyUtilitiesItems(itemsToBe) {
        siteDescriptionPage.utilitiesItems.then(items => {
            for (let i = 0; i < items.length; i++) {
                cy.wrap(items[i]).should("have.value", itemsToBe[i]);
            }
        });
    }

    verifyUtilitiesDescriptions(description) {
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
    }
}

export default new SiteDescriptionActions();