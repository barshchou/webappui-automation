import BaseActions from "../../base/base.actions";
import rentCompsMapPage from "../../../pages/income/residential/rentCompsMap.page";
import {getUploadFixture} from "../../../../utils/fixtures.utils";

class RentCompsMapActions extends BaseActions{

    /**
     *
     * @param {string} filePath
     * @returns {RentCompsMapActions}
     */
    uploadCompMap(filePath) {
        rentCompsMapPage.mapImageInput.attachFile(getUploadFixture(filePath));
        rentCompsMapPage.mapImage.should("have.attr", "title");
        return this;
    }
}

export default new RentCompsMapActions();