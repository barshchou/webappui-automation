import BaseActions from "../base/base.actions";
import photosPage from "../../pages/property/photos.page";
import {getUploadFixturesArrayFromFolder} from "../../../utils/fixtures.utils";

class PhotosActions extends BaseActions{
    uploadPhotosBySectionName(sectionName, baseFolder, filesNames) {
        photosPage.getUploadInputByName(sectionName).attachFile(getUploadFixturesArrayFromFolder(baseFolder, filesNames));
        this.verifyProgressBarNotExist();
        photosPage.getUploadedPhotosByName(sectionName).first().scrollIntoView();
        photosPage.getUploadedPhotosByName(sectionName).should("have.length", filesNames.length);
    }

    editSectionName(oldName, newName) {
        photosPage.getSectionNameEditButtonByName(oldName).click();
        photosPage.getCurrentEditInputBySectionName(oldName).clear().type(newName);
        photosPage.getCurrentEditInputBySectionName(newName).should("exist");
        photosPage.editSectionSave.click();
    }
}

export default new PhotosActions();