import BaseActions from "../base/base.actions";
import createCompMapPage from "../../pages/sales/createCompMap.page";
import {getUploadFixture} from "../../../utils/fixtures.utils";

class CreateCompMapActions extends BaseActions {

    uploadMap(filePath) {
        createCompMapPage.attachFileInput.attachFile(getUploadFixture(filePath));
        createCompMapPage.mapImage.should("have.attr", "title");
    }
}

export default new CreateCompMapActions();