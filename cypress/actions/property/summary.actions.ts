import summaryPage from "../../pages/property/summary.page";
import BaseActions from "../base/base.actions";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class SummaryActions extends BaseActions {

    verifyThatPageIsOpened(): this {
        summaryPage.headerSection.should("be.visible");
        cy.url().then(url => {
            let orlObj = new URL(url);
            cy.log("Check whether current URL ends with '/property-summary'");
            cy.wrap(orlObj.pathname.endsWith("/property-summary")).should("be.true");
        });
        return this;
    }

    enterNumberOfResUnits(number: number): this {
        summaryPage.numberOfResUnitsInput.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    enterNumberOfCommercialUnits(number = 1): this {
        summaryPage.numberOfCommercialUnitsInput.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    verifyCensusTract(value) {
        summaryPage.censusTractField.should("have.value", value);
        return this;
    }

    verifyBuildingDescriptor(value) {
        summaryPage.buildingDescriptor.should("have.value", value);
        return this;
    }

    verifyStreetAddress(value) {
        summaryPage.streetAddress.should("have.value", value);
        return this;
    }

    verifyStreetName(value) {
        summaryPage.streetName.should("have.value", value);
        return this;
    }

    verifyPropertyIdentifierType(value) {
        summaryPage.propertyIdentifierType.should("have.value", value);
        return this;
    }

    verifyPropertyIdentifier(value) {
        summaryPage.propertyIdentifier.should("have.value", value);
        return this;
    }

    /**
     * @param {Readonly<{streetAddress: string, censusTract: string, streetName: string, buildingDescriptor: string,
     * identifierType: string, identifier: string}>} siteDetails
     * @returns {SummaryActions}
     */
    verifySiteDetails(siteDetails: Readonly<{
            streetAddress: string; censusTract: string; streetName: string; buildingDescriptor: string;
            identifierType: string; identifier: string;
        }>): this {
        this.verifyStreetAddress(siteDetails.streetAddress)
            .verifyCensusTract(siteDetails.censusTract)
            .verifyStreetName(siteDetails.streetName)
            .verifyBuildingDescriptor(siteDetails.buildingDescriptor)
            .verifyPropertyIdentifierType(siteDetails.identifierType)
            .verifyPropertyIdentifier(siteDetails.identifier);
        return this;
    }

    enterYearBuilt(year: number): SummaryActions {
        summaryPage.yearBuilt.clear().type(`${year}`).should("have.value", year);
        return this;
    }

    enterSiteArea(area: number | string): SummaryActions {
        if (isHasDecimalPartMoreNumberOfDigits(area, 4)) {
            area = cutDecimalPartToNumberOfDigits(area, 4);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.siteArea.clear().type(`${area}`).should("have.value", textToBe);
        return this;
    }

    enterGrossBuildingArea(area: number | string): SummaryActions {
        const valueToBe = typeof area === "string" ? area : numberWithCommas(area);
        summaryPage.grossBuildingArea.clear().type(`${area}`).should("have.value", valueToBe);
        return this;
    }

    /**
     * @param {string | number} gbaToBe
     * @returns {SummaryActions}
     */
    verifyGrossBuildingArea(gbaToBe: string | number): this {
        const valueToBe = typeof gbaToBe === "string" ? gbaToBe : numberWithCommas(gbaToBe);
        summaryPage.grossBuildingArea.should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number | string} number
     * @returns {SummaryActions}
     */
    enterFloorsNumber(number: number): this {
        summaryPage.floorsNumber.clear().type(number.toString()).should("have.value", number);
        return this;
    }

    /**
     *
     * @returns {SummaryActions}
     */
    clickWalkUpTypeButtons(): this {
        summaryPage.walkUpTypeButtons.each(button => {
            cy.wrap(button).click();
        });
        return this;
    }

    /**
     *
     * @param {number | string} area
     * @returns {SummaryActions}
     */
    enterCurrentGrossBuildingArea(area: number): this {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.currentGrossBuildingArea.clear().type(area.toString()).should("have.value", textToBe);
        return this;
    }

    /**
     *
     * @param {number | string} number
     * @returns {SummaryActions}
     */
    enterCurrentNumberOfResUnits(number: number): this {
        summaryPage.currentNumberOfResUnits.clear().type(number.toString()).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {number | string} number
     * @returns {SummaryActions}
     */
    enterCurrentFloorsNumber(number: number): this {
        summaryPage.currentFloorsNumber.clear().type(number.toString()).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {string} newText
     * @returns {SummaryActions}
     */
    editAsCompleteExport(newText: string): this {
        summaryPage.editCommentaryButtons.first().click();
        summaryPage.textBox.clear().type(newText);
        summaryPage.textBox.should("contain.text", newText);
        summaryPage.saveExportEditButton.click();
        return this;
    }

    /**
     * @param {Readonly<{grossArea: number, numberOfUnits: number, floorsNumber: number}>} description
     * @returns {SummaryActions}
     */
    fillAsCompleteBuildingDescription(description: Readonly<{ grossArea: number; numberOfUnits: number; floorsNumber: number; }>): this {
        this.enterGrossBuildingArea(description.grossArea)
            .enterNumberOfResUnits(description.numberOfUnits)
            .enterFloorsNumber(description.floorsNumber);
        return this;
    }

    /**
     *
     * @param {Readonly<{grossArea: number, numberOfUnits: number, floorsNumber: number}>} description
     * @returns {SummaryActions}
     */
    fillCurrentBuildDescription(description: Readonly<{ grossArea: number; numberOfUnits: number; floorsNumber: number; }>): this {
        this.enterCurrentGrossBuildingArea(description.grossArea)
            .enterCurrentNumberOfResUnits(description.numberOfUnits)
            .enterCurrentFloorsNumber(description.floorsNumber);
        return this;
    }
}

export default new SummaryActions();