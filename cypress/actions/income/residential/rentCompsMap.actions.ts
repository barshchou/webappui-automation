import rentCompsMapPage from "../../../pages/income/residential/rentCompsMap.page";
import { getUploadFixture } from "../../../../utils/fixtures.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class RentCompsMapActions extends BaseActionsExt<typeof rentCompsMapPage> {

    uploadCompMap(filePath: string): RentCompsMapActions {
        rentCompsMapPage.mapImageInput.attachFile(getUploadFixture(filePath));
        rentCompsMapPage.mapImage.should("have.attr", "title");
        return this;
    }
}

export default new RentCompsMapActions(rentCompsMapPage);