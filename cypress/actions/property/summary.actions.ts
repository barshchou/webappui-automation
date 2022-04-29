import summaryPage from "../../pages/property/summary.page";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class SummaryActions extends BaseActionsExt <typeof summaryPage> {

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

    verifySiteDetails(siteDetails: Readonly<{
            streetAddress: string; censusTract: string; streetName: string; buildingDescriptor: string;
            identifierType: string; identifier: string;
        }>): SummaryActions {
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

    verifyGrossBuildingArea(gbaToBe: string | number): SummaryActions {
        const valueToBe = typeof gbaToBe === "string" ? gbaToBe : numberWithCommas(gbaToBe);
        summaryPage.grossBuildingArea.should("have.value", valueToBe);
        return this;
    }

    enterFloorsNumber(number: number | string): SummaryActions {
        summaryPage.floorsNumber.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    clickWalkUpTypeButtons(): SummaryActions {
        summaryPage.walkUpTypeButtons.each(button => {
            cy.wrap(button).click();
        });
        return this;
    }

    enterCurrentGrossBuildingArea(area: number | string): SummaryActions {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        summaryPage.currentGrossBuildingArea.clear().type(`${area}`).should("have.value", textToBe);
        return this;
    }

    enterCurrentNumberOfResUnits(number: number | string): SummaryActions {
        summaryPage.currentNumberOfResUnits.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    enterCurrentFloorsNumber(number: number | string): SummaryActions {
        summaryPage.currentFloorsNumber.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    editAsCompleteExport(newText: string): SummaryActions {
        summaryPage.editCommentaryButtons.first().click();
        summaryPage.textBox.clear().type(newText);
        summaryPage.textBox.should("contain.text", newText);
        summaryPage.saveExportEditButton.click();
        return this;
    }

    fillAsCompleteBuildingDescription(description: Readonly<{ grossArea: number; numberOfUnits: number; floorsNumber: number; }>): SummaryActions {
        this.enterGrossBuildingArea(description.grossArea)
            .enterNumberOfResUnits(description.numberOfUnits)
            .enterFloorsNumber(description.floorsNumber);
        return this;
    }

    fillCurrentBuildDescription(description: Readonly<{ grossArea: number; numberOfUnits: number; floorsNumber: number; }>): SummaryActions {
        this.enterCurrentGrossBuildingArea(description.grossArea)
            .enterCurrentNumberOfResUnits(description.numberOfUnits)
            .enterCurrentFloorsNumber(description.floorsNumber);
        return this;
    }
}

export default new SummaryActions(summaryPage);