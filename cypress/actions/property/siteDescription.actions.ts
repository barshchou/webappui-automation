import BaseActions from "../base/base.actions";
import siteDescriptionPage from "../../pages/property/siteDescription.page";
import { numberWithCommas } from "../../../utils/numbers.utils";

class SiteDescriptionActions extends BaseActions{

    /**
     *
     * @param {string} newCommentary
     * @return {SiteDescriptionActions}
     */
    editTransportationDiscussionCommentary(newCommentary) {
        siteDescriptionPage.transportationCommEdit.click();
        siteDescriptionPage.transportationCommentary.type(newCommentary).clear()
            .type(newCommentary).should("have.text", newCommentary);
        return this;
    }

    /**
     *
     * @return {SiteDescriptionActions}
     */
    checkSurroundingResidential() {
        siteDescriptionPage.surroundingResidentalCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {number} areaToBe
     * @return {SiteDescriptionActions}
     */
    verifySiteArea(areaToBe) {
        const areaWithCommas = numberWithCommas(areaToBe);
        siteDescriptionPage.siteDescriptorSiteArea.should("have.text", `${areaWithCommas} square feet`);
        return this;
    }

    /**
     *
     * @param {string} shapeToBe
     * @return {SiteDescriptionActions}
     */
    verifyPropertyShape(shapeToBe) {
        siteDescriptionPage.siteDescriptorPropShape.should("have.text", shapeToBe);
        return this;
    }

    /**
     *
     * @param {number} frontageToBe
     * @return {SiteDescriptionActions}
     */
    verifyPropertyFrontage(frontageToBe) {
        siteDescriptionPage.siteDescriptorFrontage.should("contain.text", `${frontageToBe} ft`);
        return this;
    }

    /**
     *
     * @param {Array<string>} itemsToBe
     * @returns {SiteDescriptionActions}
     */
    verifySiteDescriptionItems(itemsToBe) {
        siteDescriptionPage.siteDescriptionItems.then(items => {
            for (let i = 0; i < items.length; i++) {
                cy.wrap(items[i]).should("have.value", itemsToBe[i]);
            }
        });
        return this;
    }

    /**
     *
     * @param {string} newCommentary
     * @returns {SiteDescriptionActions}
     */
    editFloodHazardCommentary(newCommentary) {
        siteDescriptionPage.floodHazardEditButton.click();
        siteDescriptionPage.floodHazardCommentary.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }

    /**
     *
     * @param {Array<string>} itemsToBe
     * @returns {SiteDescriptionActions}
     */
    verifyUtilitiesItems(itemsToBe) {
        siteDescriptionPage.utilitiesItems.then(items => {
            for (let i = 0; i < items.length; i++) {
                cy.wrap(items[i]).should("have.value", itemsToBe[i]);
            }
        });
        return this;
    }

    /**
     *
     * @param {string} description
     * @returns {SiteDescriptionActions}
     */
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
        return this;
    }
}

export default new SiteDescriptionActions();