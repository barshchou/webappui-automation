import Enums from "../../../enums/enums";

const _leadAppraiserUsername = Cypress.env(`${Enums.USERS.webapp_lead_appraiser_username}`);
const _leadAppraiserPassword = Cypress.env(`${Enums.USERS.webapp_lead_appraiser_password}`);
const _appraiserUsername = Cypress.env(`${Enums.USERS.webapp_appraiser_username}`);
const _appraiserPassword = Cypress.env(`${Enums.USERS.webapp_appraiser_password}`);
const _inspectorUsername = Cypress.env(`${Enums.USERS.webapp_inspector_username}`);
const _inspectorPassword = Cypress.env(`${Enums.USERS.webapp_inspector_password}`);
const _adminUsername = Cypress.env(`${Enums.USERS.webapp_admin_username}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webapp_admin_password}`);

const userRoles = () => {
    return [
        {
            roleName: "Lead Appraiser",
            username: _leadAppraiserUsername,
            password: _leadAppraiserPassword
        },
        {
            roleName: "Appraiser",
            username: _appraiserUsername,
            password: _appraiserPassword
        },
        {
            roleName: "Inspector",
            username: _inspectorUsername,
            password: _inspectorPassword
        }
    ];
};

export default {
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    usersRoles: userRoles()
};