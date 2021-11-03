import BaseActions from "../base/base.actions";
import photosPage from "../../pages/property/photos.page";
import {getUploadFixturesArrayFromFolder} from "../../../utils/fixtures.utils";

class PhotosActions extends BaseActions{
    uploadBuildingFacadePhotos(filesNames, baseFolder) {
        photosPage.buildingFacadeUploadInput.attachFile(getUploadFixturesArrayFromFolder(baseFolder, filesNames));
        this.verifyProgressBarNotExist();
        photosPage.buildingFacadePhotos.should("have.length", filesNames.length);
    }

    uploadSubjectStreetPhotos(baseFolder, filesNames) {
        photosPage.subjectStreetUploadInput.attachFile(getUploadFixturesArrayFromFolder(baseFolder, filesNames));
        this.verifyProgressBarNotExist();
        photosPage.subjectStreetPhotos.should("have.length", filesNames.length);
    }

    uploadExteriorEntrancePhotos(baseFolder, filesNames) {
        photosPage.exteriorEntranceUploadInput.attachFile(getUploadFixturesArrayFromFolder(baseFolder, filesNames));
        this.verifyProgressBarNotExist();
        photosPage.exteriorEntrancePhotos.should("have.length", filesNames.length);
    }

    uploadTypicalStairwayPhotos(baseFolder, filesNames) {
        photosPage.typicalStairwayUploadInput.attachFile(getUploadFixturesArrayFromFolder(baseFolder, filesNames));
        this.verifyProgressBarNotExist();
        photosPage.typicalStairwayPhotos.should("have.length", filesNames.length);
    }
}

export default new PhotosActions();