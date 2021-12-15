import summaryPage from "../../pages/property/summary.page";
import BaseActions from "../base/base.actions";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class SummaryActions extends BaseActions {
    verifyThatPageIsOpened() {
        summaryPage.headerSection.should("be.visible");
    }

    enterNumberOfUnits(number) {
        summaryPage.numberOfUnitsInput.clear().type(number).should("have.value", number);
    }

    enterNumberOfCommercialUnits(number = 1) {
        summaryPage.numberOfCommercialUnitsInput.clear().type(number).should("have.value", number);
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
     *
     * @param {string} siteDetails.streetAddress
     * @param {string} siteDetails.censusTract
     * @param {string} siteDetails.streetName
     * @param {string} siteDetails.buildingDescriptor
     * @param {string} siteDetails.identifierType
     * @param {string} siteDetails.identifier
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

    enterYearBuilt(year) {
        summaryPage.yearBuilt.clear().type(year).should("have.value", year);
    }

    enterSiteArea(area) {
        if (isHasDecimalPartMoreNumberOfDigits(area, 4)) {
            area = cutDecimalPartToNumberOfDigits(area, 4);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.siteArea.clear().type(area).should("have.value", textToBe);
    }

    enterGrossBuildingArea(area) {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.grossBuildingArea.clear().type(area).should("have.value", textToBe);
    }

    enterFloorsNumber(number) {
        summaryPage.floorsNumber.clear().type(number).should("have.value", number);
    }

    clickWalkUpTypeButtons() {
        summaryPage.walkUpTypeButtons.each(button => {
            cy.wrap(button).click();
        });
    }

    enterCurrentGrossBuildingArea(area) {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.currentGrossBuildingArea.clear().type(area).should("have.value", textToBe);
    }

    enterCurrentNumberOfUnits(number) {
        summaryPage.currentNumberOfUnits.clear().type(number).should("have.value", number);
    }

    enterCurrentFloorsNumber(number) {
        summaryPage.currentFloorsNumber.clear().type(number).should("have.value", number);
    }

    editAsCompleteExport(newText) {
        summaryPage.editCommentaryButtons.first().click();
        summaryPage.textBox.clear().type(newText);
        summaryPage.textBox.should("have.text", newText);
        summaryPage.saveExportEditButton.click();
    }

    fillAsCompleteBuildingDescription(grossArea, numberOfUnits, floorsNumber) {
        this.enterGrossBuildingArea(grossArea);
        this.enterNumberOfUnits(numberOfUnits);
        this.enterFloorsNumber(floorsNumber);
    }

    fillCurrentBuildDescription(grossArea, numberOfUnits, floorsNumber) {
        this.enterCurrentGrossBuildingArea(grossArea);
        this.enterCurrentNumberOfUnits(numberOfUnits);
        this.enterCurrentFloorsNumber(floorsNumber);
    }
}

export default new SummaryActions();