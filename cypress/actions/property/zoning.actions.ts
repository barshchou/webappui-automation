import zoningPage from "../../pages/property/zoning.page";
import { numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class ZoningActions extends BaseActionsExt<typeof zoningPage> {

    enterZoneNameByZoneNumber(name: string, number = 0): ZoningActions {
        zoningPage.getSubjectZoneNameInputByZoneNumber(number).clear().type(name).should("have.value", name);
        return this;
    }

    enterZoneNames(names: Array<string>): ZoningActions {
        names.forEach((name, i) => {
            this.enterZoneNameByZoneNumber(name, i);
        });
        return this;
    }

    verifySiteArea(areaToBe: number): ZoningActions {
        const textToBe = numberWithCommas(areaToBe);
        zoningPage.siteAreaCell.should("have.text", textToBe);
        return this;
    }

    verifyCity(cityToBe: string): ZoningActions {
        zoningPage.cityCell.should("have.text", cityToBe);
        return this;
    }

    verifyPropertyIdentification(zoningInformationData: Readonly<{siteArea: number, city: string}>): ZoningActions {
        this.verifySiteArea(zoningInformationData.siteArea)
            .verifyCity(zoningInformationData.city);
        return this;
    }

    verifyPropIdentificationCommentary(commentary: string): ZoningActions {
        zoningPage.propIdentificationCommentary.should("contain.text", commentary);
        return this;
    }

    verifyIntroductionCommentary(commentary: string): ZoningActions {
        zoningPage.summaryIntroductionComm.should("have.text", commentary);
        return this;
    }

    clickUsesTab(): ZoningActions {
        zoningPage.usesTab.scrollIntoView().click();
        return this;
    }

    checkCheckboxByQaAttr(attribute: string): ZoningActions {
        zoningPage.getCheckboxByQaAttr(attribute).check().should("have.value", "true");
        return this;
    }

    choosePermittedPropertyUse(attribute: string): ZoningActions {
        zoningPage.permittedUseDropdown.click();
        this.checkCheckboxByQaAttr(attribute);
        zoningPage.propertyUseHeader.click();
        return this;
    }

    chooseCurrentPropertyUse(attribute: string): ZoningActions {
        zoningPage.currentUseDropdown.click();
        this.checkCheckboxByQaAttr(attribute);
        zoningPage.propertyUseHeader.click();
        return this;
    }

    chooseIsConformingAllowableUses(value = "true"): ZoningActions {
        zoningPage.isConfirmingAllowableUsesRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    private getTextForCommentaryFromNamesArray(namesArray: Array<string>, propertyName: string): string {
        let textToBe = "";
        let lastTextPart = `${propertyName}s`;
        if (propertyName === "property") {
            lastTextPart = propertyName;
        }
        switch (namesArray.length) {
            case 1:
                textToBe = ` ${namesArray[0]} ${propertyName}`;
                break;
            case 2:
                textToBe = ` ${namesArray[0]} and ${namesArray[1]} ${lastTextPart}`;
                break;
            default:
                for (let i = 0; i < namesArray.length; i++) {
                    if (i === namesArray.length - 1) {
                        textToBe += ` and ${namesArray[i]} ${lastTextPart}`;
                    } else {
                        textToBe += ` ${namesArray[i]},`;
                    }
                }
        }
        return textToBe;
    }

    verifyConformingUseCommentary(zoningUsesData: Readonly<{zonesNames: Array<string>, 
        isConformable: boolean, permittedUses: Array<string>,
        currentUses: Array<string>, streetAddress: string}>): ZoningActions {
        const zonesTextToBe = this.getTextForCommentaryFromNamesArray(zoningUsesData.zonesNames, "zone");
        const conformableEnding = zoningUsesData.zonesNames.length === 1 ? "s" : "";
        const conformableText = zoningUsesData.isConformable 
            ? `, which permit${conformableEnding} ` 
            : ` include${conformableEnding} `;
        const permittedUsesText = this.getTextForCommentaryFromNamesArray(zoningUsesData.permittedUses, "use");
        const currentUsesText = this.getTextForCommentaryFromNamesArray(zoningUsesData.currentUses, "property");
        const conformingText = zoningUsesData.isConformable ? "conforming" : "non-conforming";
        const commentaryObject = { zones: zonesTextToBe, conformable: conformableText, permittedUses: permittedUsesText,
            currentUses: currentUsesText, conforming: conformingText, address: zoningUsesData.streetAddress };
        zoningPage.conformingUseCommentary.should("have.text", this.getConformingUseCommentary(commentaryObject));
        return this;
    }

    private getConformingUseCommentary(commentaryObject): string {
        return `The land uses in the${commentaryObject.zones}${commentaryObject.conformable}` +
            `${commentaryObject.permittedUses} as of right. ${commentaryObject.address} `+
            `is a${commentaryObject.currentUses}, and upon completion of the renovations ` +
            `will be ${commentaryObject.conforming} with regards to the allowable uses.`;
    }

    clickBulkTab(): ZoningActions {
        zoningPage.bulkTab.click();
        return this;
    }

    deleteRowByRegulationValue(value: string): ZoningActions {
        zoningPage.getRowCancelButtonByRegulationValue(value).click();
        return this;
    }

    deleteRowsByRegulationValues(values: Array<string>): ZoningActions {
        values.forEach(value => {
            this.deleteRowByRegulationValue(value);
        });
        return this;
    }

    enterValueByRegName(regulationName: string, actualValue: string | number): ZoningActions {
        zoningPage.getActualInputByRegulationValue(regulationName).should("exist").clear().type(`${actualValue}`)
            .should("have.value", actualValue);
        return this;
    }

    enterRequiredValueByRegName(regulationName: string, requiredValue: string | number): ZoningActions {
        zoningPage.getRequiredInputByRegulationValue(regulationName).should("exist").clear().type(`${requiredValue}`)
            .should("have.value", requiredValue);
        return this;
    }

    chooseStatusByRegulationName(regulationName: string, statusValue: string): ZoningActions {
        zoningPage.getStatusDropdownByRegValue(regulationName).click();
        zoningPage.getDropdownOptionByValue(statusValue).click();
        return this;
    }

    addBulkRegulation(newRegulationData: Readonly<{name: string, actualValue: string | number, 
        requiredValue: string | number, statusValue: string}>): ZoningActions {
        zoningPage.addRegulationButton.click();
        zoningPage.addedEmptyRegulationName.type(newRegulationData.name);
        this.enterValueByRegName(newRegulationData.name, newRegulationData.actualValue)
            .enterRequiredValueByRegName(newRegulationData.name, newRegulationData.requiredValue)
            .chooseStatusByRegulationName(newRegulationData.name, newRegulationData.statusValue);
        return this;
    }

    editAllDataByRegName(regulationData: Readonly<{name: string, actualValue: string | number, 
        requiredValue: string | number, statusValue: string}>): ZoningActions {
        this.enterValueByRegName(regulationData.name, regulationData.actualValue)
            .enterRequiredValueByRegName(regulationData.name, regulationData.requiredValue)
            .chooseStatusByRegulationName(regulationData.name, regulationData.statusValue);
        return this;
    }

    editListRegulationsDataByNames(regulationsData: Array<Readonly<{name: string, actualValue: string | number, 
        requiredValue: string | number, statusValue: string}>>): ZoningActions {
        regulationsData.forEach(data => {
            this.editAllDataByRegName(data);
        });
        return this;
    }

    verifyComplyingCommentary(commentaryToBe: string): ZoningActions {
        zoningPage.complyingCommentary.should("have.text", commentaryToBe);
        return this;
    }

    clickParkingTab(): ZoningActions {
        zoningPage.parkingTab.click();
        return this;
    }

    verifyParkingResidentialUnits(unitsNumber: number | string): ZoningActions {
        zoningPage.parkingResidentialUnits.should("have.text", unitsNumber);
        return this;
    }

    verifyActualParkingSpaces(spacesToBe: number | string): ZoningActions {
        zoningPage.actualParkingSpaces.should("have.text", spacesToBe);
        return this;
    }

    enterRequiredParkingSpaces(number: string | number): ZoningActions {
        zoningPage.requiredParkingInput.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    chooseIsConformingWithParkingRequirements(isConforming: string): ZoningActions {
        zoningPage.isConformingWithParkingRequirements.check(isConforming);
        this.verifyRadioIsChecked(isConforming);
        return this;
    }

    private verifyRadioIsChecked(value: string) {
        zoningPage.getElementToCheckRadio(value).should("exist");
    }

    verifyParkingConformityCommentary(zoningParkingData: Readonly<{requiredParkingPlaces: number, 
        numberOfParkingPlaces: number, isConforming: string}>): ZoningActions {
        const requiredText = zoningParkingData.requiredParkingPlaces === 0 
            ? "no" 
            : `${zoningParkingData.requiredParkingPlaces}`;
        const availableText = zoningParkingData.numberOfParkingPlaces === 0 
            ? "no" 
            : `${zoningParkingData.numberOfParkingPlaces}`;
        const conformingText = zoningParkingData.isConforming === "true" 
            ? "complying" 
            : "non-complying";
        zoningPage.parkingConformityCommentary.should("have.text",
            this.getParkingConformityCommentary(requiredText, availableText, conformingText));
        return this;
    }

    private getParkingConformityCommentary(requiredText, availableText, conformingText): string {
        return `Based on the subject’s current zoning regulations, ${requiredText} parking spaces are required` +
            ` on the subject property. The subject has ${availableText} available and is ${conformingText} with` +
            " regards to parking regulations.";
    }

}

export default new ZoningActions(zoningPage);
