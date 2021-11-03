import BaseActions from "../base/base.actions";
import mapsPage from "../../pages/property/maps.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits} from "../../../utils/numbers.utils";
import {getUploadFixture} from "../../../utils/fixtures.utils";

class MapsActions extends BaseActions{
    enterPropertyFrontage(frontage) {
        if (isHasDecimalPartMoreNumberOfDigits(frontage, 2)) {
            frontage = cutDecimalPartToNumberOfDigits(frontage, 2);
        }
        mapsPage.propertyFrontage.clear().type(frontage).should("have.value", frontage);
    }

    uploadZoningMap(fileName) {
        mapsPage.zoningMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.zoningMapImageToCheck.should("have.attr", "title");
    }

    uploadFloodMap(fileName) {
        mapsPage.floodMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.floodMapImageToCheck.should("have.attr", "title");
    }

    chooseCornerByValue(value) {
        mapsPage.cornerRadios.check(value).should("be.checked");
    }

    uploadTaxMap(fileName) {
        mapsPage.taxMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.taxMapImageToCheck.should("have.attr", "title");
    }

    captureSubjectMap() {
        mapsPage.subjectMapOpenWizardButton.click();
        mapsPage.subjectMapImage.should("be.visible");
        mapsPage.subjectMapCaptureScreenButton.click();
        mapsPage.subjectMapCaptureScreenButton.should("not.exist");
        mapsPage.subjectMapImageToCheck.should("be.visible");
        mapsPage.subjectMapImageToCheck.should("have.attr", "title");
    }
}

export default new MapsActions();