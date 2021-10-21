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
    }

    verifyBuildingDescriptor(value) {
        summaryPage.buildingDescriptor.should("have.value", value);
    }

    verifyStreetAddress(value) {
        summaryPage.streetAddress.should("have.value", value);
    }

    verifyStreetName(value) {
        summaryPage.streetName.should("have.value", value);
    }

    verifyPropertyIdentifierType(value) {
        summaryPage.propertyIdentifierType.should("have.value", value);
    }

    verifyPropertyIdentifier(value) {
        summaryPage.propertyIdentifier.should("have.value", value);
    }

    verifySiteDetails(streetAddress, censusTract, streetName, buildingDescriptor, identifierType, identifier) {
        this.verifyStreetAddress(streetAddress);
        this.verifyCensusTract(censusTract);
        this.verifyStreetName(streetName);
        this.verifyBuildingDescriptor(buildingDescriptor);
        this.verifyPropertyIdentifierType(identifierType);
        this.verifyPropertyIdentifier(identifier);
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

    editAsCompleteExport() {
        summaryPage.editCommentaryButtons.first().click();
    }
}

export default new SummaryActions();