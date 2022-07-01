import Enums from "../../../../enums/enums";

const _adminUsername = Cypress.env(`${Enums.USERS.webapp_admin_username}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webapp_admin_password}`);

export default {
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
};