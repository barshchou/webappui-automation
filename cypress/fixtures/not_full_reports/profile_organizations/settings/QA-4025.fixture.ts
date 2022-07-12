import Enums from "../../../../enums/enums";
import bondTypesEnum from "../../../../enums/organization/bondTypes.enum";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('4025', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _adminUsername = Cypress.env(`${Enums.USERS.webapp_admin_username}`);
const _adminPassword = Cypress.env(`${Enums.USERS.webapp_admin_password}`);

const _ticker10YearsBonds = bondTypesEnum.tenYearTreasuryBond;
const _tenYearsBondType = Object.keys(bondTypesEnum)[Object.values(bondTypesEnum).indexOf(_ticker10YearsBonds)] as BoweryReports.BondTypes;

export default {
    reportCreationData: reportCreationFixture(),
    adminUsername: _adminUsername,
    adminPassword: _adminPassword,
    tenYearsBondType: _tenYearsBondType
};