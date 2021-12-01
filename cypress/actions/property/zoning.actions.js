import BaseActions from "../base/base.actions";
import zoningPage from "../../pages/property/zoning.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class ZoningActions extends BaseActions {
    enterZoneNameByZoneNumber(name, number = 0) {
        zoningPage.getSubjectZoneNameInputByZoneNumber(number).clear().type(name).should("have.value", name);
    }

    enterZoneNames(names) {
        for (let i = 0; i < names.length; i++) {
            this.enterZoneNameByZoneNumber(names[i], i);
        }
    }

    verifySiteArea(areaToBe) {
        const textToBe = numberWithCommas(areaToBe);
        zoningPage.siteAreaCell.should("have.text", textToBe);
    }

    verifyCity(cityToBe) {
        zoningPage.cityCell.should("have.text", cityToBe);
    }

    verifyPropertyIdentification(areaToBe, cityToBe) {
        this.verifySiteArea(areaToBe);
        this.verifyCity(cityToBe);
    }

    verifyPropIdentificationCommentary(siteArea, zoneName, city, identifierType, identifier) {
        const areaToBe = numberWithCommas(siteArea);
        zoningPage.propIdentificationCommentary.should("have.text",
            `The subject is situated on a ${areaToBe} square foot parcel in an ${zoneName} zone. ` +
            `It is identified in the city of ${city} tax maps as ${identifierType} ${identifier}. `);
    }

    verifyIntroductionCommentary(addressToBe, zoneName) {
        zoningPage.summaryIntroductionComm.should("have.text", `${addressToBe} is in a ${zoneName} zone. ` +
            "Below is a summary of the subject property's compliance with regard to use and bulk regulations.");
    }

    clickUsesTab() {
        zoningPage.usesTab.scrollIntoView().click();
    }

    checkCheckboxByQaAttr(attribute) {
        zoningPage.getCheckboxByQaAttr(attribute).check().should("have.value", "true");
    }

    choosePermittedPropertyUse(attribute) {
        zoningPage.permittedUseDropdown.click();
        this.checkCheckboxByQaAttr(attribute);
        zoningPage.propertyUseHeader.click();
    }

    chooseCurrentPropertyUse(attribute) {
        zoningPage.currentUseDropdown.click();
        this.checkCheckboxByQaAttr(attribute);
        zoningPage.propertyUseHeader.click();
    }

    chooseIsConformingAllowableUses(value = "true") {
        zoningPage.isConfirmingAllowableUsesRadio.check(value).should("be.checked");
    }

    getTextForCommentaryFromNamesArray(namesArray, propertyName) {
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

    verifyConformingUseCommentary(zones, isConformable, permittedUses, addressToBe, currentUses) {
        const zonesTextToBe = this.getTextForCommentaryFromNamesArray(zones, "zone");
        const conformableEnding = zones.length === 1 ? "s" : "";
        const conformableText = isConformable ? `, which permit${conformableEnding} ` : ` include${conformableEnding} `;
        const permittedUsesText = this.getTextForCommentaryFromNamesArray(permittedUses, "use");
        const currentUsesText = this.getTextForCommentaryFromNamesArray(currentUses, "property");
        const conformingText = isConformable ? "conforming" : "non-conforming";
        zoningPage.conformingUseCommentary.should("have.text",
            `The land uses in the${zonesTextToBe}${conformableText}` +
            `${permittedUsesText} as of right. ${addressToBe} is a${currentUsesText}, ` +
            `and upon completion of the renovations will be ${conformingText} with regards to the allowable uses.`);
    }

    clickBulkTab() {
        zoningPage.bulkTab.click();
    }

    deleteRowByRegulationValue(value) {
        zoningPage.getRowCancelButtonByRegulationValue(value).click();
    }

    deleteRowsByRegulationValues(values) {
        values.forEach(value => {
            this.deleteRowByRegulationValue(value);
        });
    }

    enterValueByRegName(regulationName, actualValue) {
        zoningPage.getActualInputByRegulationValue(regulationName).should("exist").clear().type(actualValue)
            .should("have.value", actualValue);
    }

    enterRequiredValueByRegName(regulationName, requiredValue) {
        zoningPage.getRequiredInputByRegulationValue(regulationName).should("exist").clear().type(requiredValue)
            .should("have.value", requiredValue);
    }

    chooseStatusByRegulationName(regulationName, statusValue) {
        zoningPage.getStatusDropdownByRegValue(regulationName).click();
        zoningPage.getDropdownOptionByValue(statusValue).click();
    }

    addBulkRegulation(bulkData) {
        zoningPage.addRegulationButton.click();
        zoningPage.addedEmptyRegulationName.type(bulkData.name);
        this.enterValueByRegName(bulkData.name, bulkData.actualValue);
        this.enterRequiredValueByRegName(bulkData.name, bulkData.requiredValue);
        this.chooseStatusByRegulationName(bulkData.name, bulkData.statusValue);
    }

    editAllDataByRegName(bulkData) {
        this.enterValueByRegName(bulkData.name, bulkData.actualValue);
        this.enterRequiredValueByRegName(bulkData.name, bulkData.requiredValue);
        this.chooseStatusByRegulationName(bulkData.name, bulkData.statusValue);
    }

    verifyComplyingCommentary(commentaryToBe) {
        zoningPage.complyingCommentary.should("have.text", commentaryToBe);
    }

    clickParkingTab() {
        zoningPage.parkingTab.click();
    }

    verifyParkingResidentalUnits(unitsNumber) {
        zoningPage.parkingResidentalUnits.should("have.text", unitsNumber);
    }

    verifyActualParkingSpaces(spacesToBe) {
        zoningPage.actualParkingSpaces.should("have.text", spacesToBe);
    }

    enterRequiredParkingSpaces(number) {
        zoningPage.requiredParkingInput.clear().type(number).should("have.value", number);
    }

    chooseIsConformingWithParkingRequirements(isConforming = "true") {
        zoningPage.isConformingWithParkingRequirements.check(isConforming).should("be.checked");
    }

    verifyParkingConformityCommentary(requiredSpacesNumber, availableParking, isConforming = "true") {
        const requiredParkingText = requiredSpacesNumber === 0 ? "no" : `${requiredSpacesNumber}`;
        const availableParkingText = availableParking === 0 ? "no" : `${availableParking}`;
        const conformingText = isConforming === "true" ? "complying" : "non-complying";
        zoningPage.parkingConformityCommentary.should("have.text",
            `Based on the subject’s current zoning regulations, ${requiredParkingText} parking spaces are required` +
            ` on the subject property. The subject has ${availableParkingText} available and is ${conformingText} with` +
            " regards to parking regulations.");
    }
}

export default new ZoningActions();
