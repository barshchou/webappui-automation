import Enums from "../../../../enums/enums";

const _leadAppraiserUsername = Cypress.env(`${Enums.USERS.webappLeadAppraiserUsername}`);
const _leadAppraiserPassword = Cypress.env(`${Enums.USERS.webappLeadAppraiserPassword}`);
const _appraiserUsername = Cypress.env(`${Enums.USERS.webappAppraiserUsername}`);
const _appraiserPassword = Cypress.env(`${Enums.USERS.webappAppraiserPassword}`);
const _inspectorUsername = Cypress.env(`${Enums.USERS.webappInspectorUsername}`);
const _inspectorPassword = Cypress.env(`${Enums.USERS.webappInspectorPassword}`);
const _adminUsername = Cypress.env(`${Enums.USERS.webappAdminUsername}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webappAdminPassword}`);

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
    usersRoles: userRoles(),
    settingsPageTitle: "Settings"
};