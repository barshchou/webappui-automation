import summaryPage from "../../pages/property/summary.page";
import BaseActions from "../base/base.actions";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class SummaryActions extends BaseActions {

    /**
     *
     * @returns {SummaryActions}
     */
    verifyThatPageIsOpened() {
        summaryPage.headerSection.should("be.visible");
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {SummaryActions}
     */
    enterNumberOfUnits(number) {
        summaryPage.numberOfUnitsInput.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {SummaryActions}
     */
    enterNumberOfCommercialUnits(number = 1) {
        summaryPage.numberOfCommercialUnitsInput.clear().type(number).should("have.value", number);
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
    verifySiteDetails(siteDetails) {
        this.verifyStreetAddress(siteDetails.streetAddress)
            .verifyCensusTract(siteDetails.censusTract)
            .verifyStreetName(siteDetails.streetName)
            .verifyBuildingDescriptor(siteDetails.buildingDescriptor)
            .verifyPropertyIdentifierType(siteDetails.identifierType)
            .verifyPropertyIdentifier(siteDetails.identifier);
        return this;
    }

    /**
     * @param {string, number} year
     * @returns {SummaryActions}
     */
    enterYearBuilt(year) {
        summaryPage.yearBuilt.clear().type(year).should("have.value", year);
        return this;
    }

    /**
     *
     * @param {number, string} area
     * @returns {SummaryActions}
     */
    enterSiteArea(area) {
        if (isHasDecimalPartMoreNumberOfDigits(area, 4)) {
            area = cutDecimalPartToNumberOfDigits(area, 4);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.siteArea.clear().type(area).should("have.value", textToBe);
        return this;
    }

    /**
     *
     * @param {number, string} area
     * @returns {SummaryActions}
     */
    enterGrossBuildingArea(area) {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.grossBuildingArea.clear().type(area).should("have.value", textToBe);
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {SummaryActions}
     */
    enterFloorsNumber(number) {
        summaryPage.floorsNumber.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @returns {SummaryActions}
     */
    clickWalkUpTypeButtons() {
        summaryPage.walkUpTypeButtons.each(button => {
            cy.wrap(button).click();
        });
        return this;
    }

    /**
     *
     * @param {number, string} area
     * @returns {SummaryActions}
     */
    enterCurrentGrossBuildingArea(area) {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.currentGrossBuildingArea.clear().type(area).should("have.value", textToBe);
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {SummaryActions}
     */
    enterCurrentNumberOfUnits(number) {
        summaryPage.currentNumberOfUnits.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {SummaryActions}
     */
    enterCurrentFloorsNumber(number) {
        summaryPage.currentFloorsNumber.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {string} newText
     * @returns {SummaryActions}
     */
    editAsCompleteExport(newText) {
        summaryPage.editCommentaryButtons.first().click();
        summaryPage.textBox.clear().type(newText);
        summaryPage.textBox.should("have.text", newText);
        summaryPage.saveExportEditButton.click();
        return this;
    }

    /**
     * @param {Readonly<{grossArea: number, numberOfUnits: number, floorsNumber: number}>} description
     * @returns {SummaryActions}
     */
    fillAsCompleteBuildingDescription(description) {
        this.enterGrossBuildingArea(description.grossArea)
            .enterNumberOfUnits(description.numberOfUnits)
            .enterFloorsNumber(description.floorsNumber);
        return this;
    }

    /**
     *
     * @param {Readonly<{grossArea: number, numberOfUnits: number, floorsNumber: number}>} description
     * @returns {SummaryActions}
     */
    fillCurrentBuildDescription(description) {
        this.enterCurrentGrossBuildingArea(description.grossArea)
            .enterCurrentNumberOfUnits(description.numberOfUnits)
            .enterCurrentFloorsNumber(description.floorsNumber);
        return this;
    }
}

export default new SummaryActions();