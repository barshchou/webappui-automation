import infoActions from "./info.actions";
import createNewClientActions from "./createNewClient.actions";
import organizationClientsActions from "./organizationClients.actions";
import organizationActions from "./organization.actions";
import createNewUserActions from "./createNewUser.actions";
import organizationUsersActions from "./organizationUsers.actions";
import organizationEditUserActions from "./organizationEditUser.actions";

export default {
    Info: infoActions,
    CreateNewClient: createNewClientActions,
    CreateNewUser: createNewUserActions,
    OrganizationClients: organizationClientsActions,
    Organization: organizationActions,
    OrganizationUsers: organizationUsersActions,
    OrganizationEditUser: organizationEditUserActions
};