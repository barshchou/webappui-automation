import photosPage from "../../pages/property/photos.page";
import { getUploadFixturesArrayFromFolder } from "../../../utils/fixtures.utils";
import BaseActionsExt from "../base/base.actions.ext";

class PhotosActions extends BaseActionsExt<typeof photosPage>{

    uploadPhotosBySectionName(photosData: Readonly<{section: string, photosFolder: string, photosFileNames: Array<string>}>): PhotosActions {
        photosPage.getUploadInputByName(photosData.section)
            .attachFile(getUploadFixturesArrayFromFolder(photosData.photosFolder, photosData.photosFileNames));
        this.verifyProgressBarNotExist();
        photosPage.getUploadedPhotosByName(photosData.section).first().scrollIntoView();
        photosPage.getUploadedPhotosByName(photosData.section).should("have.length", photosData.photosFileNames.length);
        return this;
    }
    
    editSectionName(photosData: Readonly<{sectionOldName: string, section: string}>): PhotosActions {
        photosPage.getSectionNameEditButtonByName(photosData.sectionOldName).click();
        photosPage.getCurrentEditInputBySectionName(photosData.sectionOldName).clear().type(photosData.section);
        photosPage.getCurrentEditInputBySectionName(photosData.section).should("exist");
        photosPage.editSectionSave.click();
        return this;
    }
}

export default new PhotosActions(photosPage);