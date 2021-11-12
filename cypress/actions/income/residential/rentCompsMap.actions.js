import BaseActions from "../../base/base.actions";
import rentCompsMapPage from "../../../pages/income/residential/rentCompsMap.page";
import {getUploadFixture} from "../../../../utils/fixtures.utils";

class RentCompsMapActions extends BaseActions{
    uploadCompMap(filePath) {
        rentCompsMapPage.mapImageInput.attachFile(getUploadFixture(filePath));
        rentCompsMapPage.mapImage.should("have.attr", "title");
    }
}

export default new RentCompsMapActions();