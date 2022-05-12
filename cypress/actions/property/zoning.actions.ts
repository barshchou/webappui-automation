import BaseActions from "../base/base.actions";
import zoningPage from "../../pages/property/zoning.page";
import { numberWithCommas } from "../../../utils/numbers.utils";

class ZoningActions extends BaseActions {

    /**
     *
     * @param {string} name
     * @param {number} number
     * @returns {ZoningActions}
     */
    enterZoneNameByZoneNumber(name, number = 0) {
        zoningPage.getSubjectZoneNameInputByZoneNumber(number).clear().type(name).should("have.value", name);
        return this;
    }

    /**
     *
     * @param {Array<string>} names
     * @returns {ZoningActions}
     */
    enterZoneNames(names) {
        names.forEach((name, i) => {
            this.enterZoneNameByZoneNumber(name, i);
        });
        return this;
    }

    /**
     *
     * @param {number} areaToBe
     * @returns {ZoningActions}
     */
    verifySiteArea(areaToBe) {
        const textToBe = numberWithCommas(areaToBe);
        zoningPage.siteAreaCell.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} cityToBe
     * @returns {ZoningActions}
     */
    verifyCity(cityToBe) {
        zoningPage.cityCell.should("have.text", cityToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{siteArea: number, city: string}>} zoningInformationData
     * @returns {ZoningActions}
     */
    verifyPropertyIdentification(zoningInformationData) {
        this.verifySiteArea(zoningInformationData.siteArea)
            .verifyCity(zoningInformationData.city);
        return this;
    }

    /**
     *
     * @param {string} commentary
     * @returns {ZoningActions}
     */
    verifyPropIdentificationCommentary(commentary) {
        zoningPage.propIdentificationCommentary.should("contain.text", commentary);
        return this;
    }

    /**
     *
     * @param {string} commentary
     * @returns {ZoningActions}
     */
    verifyIntroductionCommentary(commentary) {
        zoningPage.summaryIntroductionComm.should("have.text", commentary);
        return this;
    }

    /**
     *
     * @returns {ZoningActions}
     */
    clickUsesTab() {
        zoningPage.usesTab.scrollIntoView().click();
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {ZoningActions}
     */
    checkCheckboxByQaAttr(attribute) {
        zoningPage.getCheckboxByQaAttr(attribute).check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {ZoningActions}
     */
    choosePermittedPropertyUse(attribute) {
        zoningPage.permittedUseDropdown.click();
        this.checkCheckboxByQaAttr(attribute);
        zoningPage.propertyUseHeader.click();
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {ZoningActions}
     */
    chooseCurrentPropertyUse(attribute) {
        zoningPage.currentUseDropdown.click();
        this.checkCheckboxByQaAttr(attribute);
        zoningPage.propertyUseHeader.click();
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ZoningActions}
     */
    chooseIsConformingAllowableUses(value = "true") {
        zoningPage.isConfirmingAllowableUsesRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     * @private
     * @param {Array<string>} namesArray
     * @param {string} propertyName
     * @returns {string}
     */
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

    /**
     *
     * @param {Readonly<{zonesNames: Array<string>, isConformable: boolean, permittedUses: Array<string>,
     * currentUses: Array<string>, streetAddress: string}>} zoningUsesData
     * @returns {ZoningActions}
     */
    verifyConformingUseCommentary(zoningUsesData) {
        const zonesTextToBe = this.getTextForCommentaryFromNamesArray(zoningUsesData.zonesNames, "zone");
        const conformableEnding = zoningUsesData.zonesNames.length === 1 ? "s" : "";
        const conformableText = zoningUsesData.isConformable ? `, which permit${conformableEnding} ` : ` include${conformableEnding} `;
        const permittedUsesText = this.getTextForCommentaryFromNamesArray(zoningUsesData.permittedUses, "use");
        const currentUsesText = this.getTextForCommentaryFromNamesArray(zoningUsesData.currentUses, "property");
        const conformingText = zoningUsesData.isConformable ? "conforming" : "non-conforming";
        const commentaryObject = { zones: zonesTextToBe, conformable: conformableText, permittedUses: permittedUsesText,
            currentUses: currentUsesText, conforming: conformingText, address: zoningUsesData.streetAddress };
        zoningPage.conformingUseCommentary.should("have.text", this.getConformingUseCommentary(commentaryObject));
        return this;
    }

    /**
     * @private
     * @returns {string}
     */
    getConformingUseCommentary(commentaryObject) {
        return `The land uses in the${commentaryObject.zones}${commentaryObject.conformable}` +
            `${commentaryObject.permittedUses} as of right. ${commentaryObject.address} is a${commentaryObject.currentUses}, ` +
            `and upon completion of the renovations will be ${commentaryObject.conforming} with regards to the allowable uses.`;
    }

    /**
     *
     * @returns {ZoningActions}
     */
    clickBulkTab() {
        zoningPage.bulkTab.click();
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ZoningActions}
     */
    deleteRowByRegulationValue(value) {
        zoningPage.getRowCancelButtonByRegulationValue(value).click();
        return this;
    }

    /**
     *
     * @param {Array<string>} values
     * @return {ZoningActions}
     */
    deleteRowsByRegulationValues(values) {
        values.forEach(value => {
            this.deleteRowByRegulationValue(value);
        });
        return this;
    }

    /**
     *
     * @param {string} regulationName
     * @param {string | number} actualValue
     * @return {ZoningActions}
     */
    enterValueByRegName(regulationName, actualValue) {
        zoningPage.getActualInputByRegulationValue(regulationName).should("exist").clear().type(actualValue)
            .should("have.value", actualValue);
        return this;
    }

    /**
     *
     * @param {string} regulationName
     * @param {string | number} requiredValue
     * @return {ZoningActions}
     */
    enterRequiredValueByRegName(regulationName, requiredValue) {
        zoningPage.getRequiredInputByRegulationValue(regulationName).should("exist").clear().type(requiredValue)
            .should("have.value", requiredValue);
        return this;
    }

    /**
     *
     * @param {string} regulationName
     * @param {string} statusValue
     * @return {ZoningActions}
     */
    chooseStatusByRegulationName(regulationName, statusValue) {
        zoningPage.getStatusDropdownByRegValue(regulationName).click();
        zoningPage.getDropdownOptionByValue(statusValue).click();
        return this;
    }

    /**
     *
     * @param {Readonly<{name: string, actualValue: string | number, requiredValue: string | number,
     * statusValue: string}>} newRegulationData
     * @return {ZoningActions}
     */
    addBulkRegulation(newRegulationData) {
        zoningPage.addRegulationButton.click();
        zoningPage.addedEmptyRegulationName.type(newRegulationData.name);
        this.enterValueByRegName(newRegulationData.name, newRegulationData.actualValue)
            .enterRequiredValueByRegName(newRegulationData.name, newRegulationData.requiredValue)
            .chooseStatusByRegulationName(newRegulationData.name, newRegulationData.statusValue);
        return this;
    }

    /**
     *
     * @param {Readonly<{name: string, actualValue: string | number, requiredValue: string | number,
     * statusValue: string}>} regulationData
     * @return {ZoningActions}
     */
    editAllDataByRegName(regulationData) {
        this.enterValueByRegName(regulationData.name, regulationData.actualValue)
            .enterRequiredValueByRegName(regulationData.name, regulationData.requiredValue)
            .chooseStatusByRegulationName(regulationData.name, regulationData.statusValue);
        return this;
    }

    /**
     *
     * @param {Array<Readonly<{name: string, actualValue: string | number, requiredValue: string | number,
     * statusValue: string}>>} regulationsData
     * @return {ZoningActions}
     */
    editListRegulationsDataByNames(regulationsData) {
        regulationsData.forEach(data => {
            this.editAllDataByRegName(data);
        });
        return this;
    }

    /**
     *
     * @param {string} commentaryToBe
     * @return {ZoningActions}
     */
    verifyComplyingCommentary(commentaryToBe) {
        zoningPage.complyingCommentary.should("have.text", commentaryToBe);
        return this;
    }

    /**
     *
     * @return {ZoningActions}
     */
    clickParkingTab() {
        zoningPage.parkingTab.click();
        return this;
    }

    /**
     *
     * @param {number | string} unitsNumber
     * @return {ZoningActions}
     */
    verifyParkingResidentialUnits(unitsNumber) {
        zoningPage.parkingResidentalUnits.should("have.text", unitsNumber);
        return this;
    }

    /**
     *
     * @param {number | string} spacesToBe
     * @return {ZoningActions}
     */
    verifyActualParkingSpaces(spacesToBe) {
        zoningPage.actualParkingSpaces.should("have.text", spacesToBe);
        return this;
    }

    /**
     *
     * @param {string | number} number
     * @return {ZoningActions}
     */
    enterRequiredParkingSpaces(number) {
        zoningPage.requiredParkingInput.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {string} isConforming
     * @return {ZoningActions}
     */
    chooseIsConformingWithParkingRequirements(isConforming) {
        zoningPage.isConformingWithParkingRequirements.check(isConforming);
        this.verifyRadioIsChecked(isConforming);
        return this;
    }

    /**
     * @private
     * @param {string} value
     */
    verifyRadioIsChecked(value) {
        zoningPage.getElementToCheckRadio(value).should("exist");
    }

    /**
     *
     * @param {Readonly<{requiredParkingPlaces: number, numberOfParkingPlaces: number,
     * isConforming: string}>} zoningParkingData
     * @returns {ZoningActions}
     */
    verifyParkingConformityCommentary(zoningParkingData) {
        const requiredText = zoningParkingData.requiredParkingPlaces === 0 ? "no" : `${zoningParkingData.requiredParkingPlaces}`;
        const availableText = zoningParkingData.numberOfParkingPlaces === 0 ? "no" : `${zoningParkingData.numberOfParkingPlaces}`;
        const conformingText = zoningParkingData.isConforming === "true" ? "complying" : "non-complying";
        zoningPage.parkingConformityCommentary.should("have.text",
            this.getParkingConformityCommentary(requiredText, availableText, conformingText));
        return this;
    }

    /**
     * @private
     * @returns {string}
     */
    getParkingConformityCommentary(requiredText, availableText, conformingText) {
        return `Based on the subject’s current zoning regulations, ${requiredText} parking spaces are required` +
            ` on the subject property. The subject has ${availableText} available and is ${conformingText} with` +
            " regards to parking regulations.";
    }

}

export default new ZoningActions();
