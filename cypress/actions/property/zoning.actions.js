import BaseActions from "../base/base.actions";
import zoningPage from "../../pages/property/zoning.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class ZoningActions extends BaseActions{
    enterZoneNameByZoneNumber(name, number = 0) {
        zoningPage.getSubjectZoneNameInputByZoneNumber(number).clear().type(name).should("have.value", name);
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
}

export default new ZoningActions();