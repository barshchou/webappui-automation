import createNewUserPage from "../../pages/organization/createNewUser.page";
import BaseActionsExt from "../base/base.actions.ext";

class CreateNewUserActions extends BaseActionsExt<typeof createNewUserPage>{
    
}

export default new CreateNewUserActions(createNewUserPage);