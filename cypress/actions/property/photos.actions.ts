import BaseActions from "../base/base.actions";
import photosPage from "../../pages/property/photos.page";
import { getUploadFixturesArrayFromFolder } from "../../../utils/fixtures.utils";

class PhotosActions extends BaseActions{

    /**
     *
     * @param {Readonly<{section: string, photosFolder: string, photosFileNames: Array<string>}>} photosData
     * @returns {PhotosActions}
     */
    uploadPhotosBySectionName(photosData) {
        photosPage.getUploadInputByName(photosData.section)
            .attachFile(getUploadFixturesArrayFromFolder(photosData.photosFolder, photosData.photosFileNames));
        this.verifyProgressBarNotExist();
        photosPage.getUploadedPhotosByName(photosData.section).first().scrollIntoView();
        photosPage.getUploadedPhotosByName(photosData.section).should("have.length", photosData.photosFileNames.length);
        return this;
    }

    /**
     * @param {Readonly<{sectionOldName: string, section: string}>} photosData
     * @returns {PhotosActions}
     */
    editSectionName(photosData) {
        photosPage.getSectionNameEditButtonByName(photosData.sectionOldName).click();
        photosPage.getCurrentEditInputBySectionName(photosData.sectionOldName).clear().type(photosData.section);
        photosPage.getCurrentEditInputBySectionName(photosData.section).should("exist");
        photosPage.editSectionSave.click();
        return this;
    }
}

export default new PhotosActions();