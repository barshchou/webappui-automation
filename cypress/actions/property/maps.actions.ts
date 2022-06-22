import mapsPage from "../../pages/property/maps.page";
import { cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits } from "../../../utils/numbers.utils";
import { getUploadFixture } from "../../../utils/fixtures.utils";
import BaseActionsExt from "../base/base.actions.ext";

class MapsActions extends BaseActionsExt<typeof mapsPage>{

    enterPropertyFrontage(frontage: number): MapsActions {
        if (isHasDecimalPartMoreNumberOfDigits(frontage, 2)) {
            frontage = cutDecimalPartToNumberOfDigits(frontage, 2);
        }
        mapsPage.propertyFrontage.clear().type(`${frontage}`).should("have.value", frontage);
        return this;
    }

    uploadZoningMap(fileName: string): MapsActions {
        mapsPage.zoningMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.zoningMapImageToCheck.should("have.attr", "title");
        return this;
    }

    uploadFloodMap(fileName: string): MapsActions {
        mapsPage.floodMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.floodMapImageToCheck.should("have.attr", "title");
        return this;
    }

    chooseCornerByValue(value: string): MapsActions {
        mapsPage.cornerRadios.check(value).should("be.checked");
        return this;
    }

    uploadTaxMap(fileName: string): MapsActions  {
        mapsPage.taxMapUploadInput.should("exist").attachFile(getUploadFixture(fileName));
        mapsPage.taxMapImageToCheck.should("have.attr", "title");
        return this;
    }

    captureSubjectMap(): MapsActions {
        mapsPage.subjectMapOpenWizardButton.click();
        mapsPage.subjectMapImage.should("exist");
        mapsPage.subjectMapCaptureScreenButton.click();
        mapsPage.subjectMapCaptureScreenButton.should("not.exist");
        mapsPage.subjectMapImageToCheck.should("be.visible");
        mapsPage.subjectMapImageToCheck.should("have.attr", "title");
        return this;
    }
}

export default new MapsActions(mapsPage);