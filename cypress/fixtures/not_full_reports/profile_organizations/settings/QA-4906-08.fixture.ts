import Enums from "../../../../enums/enums";

const _adminUsername = Cypress.env(`${Enums.USERS.webapp_admin_username}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webapp_admin_password}`);

const _tooltipText = "This info has been automatically updated from the Federal Reserve Bank of St. Louis";
const _textColor = "rgb(6, 116, 97)";

const _tenYearsBonds = "10-Year Treasury Bond";
const _thirtyYearsBonds = "30-Year Treasury Bond";
const _corporateBonds = "Corporate Bonds (AAA)";

export default {
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    tooltipText: _tooltipText,
    textColor: _textColor,
    tenYearsBonds: _tenYearsBonds,
    thirtyYearsBonds: _thirtyYearsBonds,
    corporateBonds: _corporateBonds
};