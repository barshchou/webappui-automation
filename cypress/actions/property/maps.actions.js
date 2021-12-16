import BaseActions from "../base/base.actions";
import mapsPage from "../../pages/property/maps.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits} from "../../../utils/numbers.utils";
import {getUploadFixture} from "../../../utils/fixtures.utils";

class MapsActions extends BaseActions{

    /**
     *
     * @param {number} frontage
     * @return {MapsActions}
     */
    enterPropertyFrontage(frontage) {
        if (isHasDecimalPartMoreNumberOfDigits(frontage, 2)) {
            frontage = cutDecimalPartToNumberOfDigits(frontage, 2);
        }
        mapsPage.propertyFrontage.clear().type(frontage).should("have.value", frontage);
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @returns {MapsActions}
     */
    uploadZoningMap(fileName) {
        mapsPage.zoningMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.zoningMapImageToCheck.should("have.attr", "title");
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @returns {MapsActions}
     */
    uploadFloodMap(fileName) {
        mapsPage.floodMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.floodMapImageToCheck.should("have.attr", "title");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {MapsActions}
     */
    chooseCornerByValue(value) {
        mapsPage.cornerRadios.check(value).should("be.checked");
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @returns {MapsActions}
     */
    uploadTaxMap(fileName) {
        mapsPage.taxMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.taxMapImageToCheck.should("have.attr", "title");
        return this;
    }

    /**
     *
     * @returns {MapsActions}
     */
    captureSubjectMap() {
        mapsPage.subjectMapOpenWizardButton.click();
        mapsPage.subjectMapImage.should("exist");
        mapsPage.subjectMapCaptureScreenButton.click();
        mapsPage.subjectMapCaptureScreenButton.should("not.exist");
        mapsPage.subjectMapImageToCheck.should("be.visible");
        mapsPage.subjectMapImageToCheck.should("have.attr", "title");
        return this;
    }
}

export default new MapsActions();