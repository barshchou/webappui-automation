import ReportDataCreator from "../../data_creator/reportData.creator";
import Enums from "../../../enums/enums";
import ClientCreationData from "../../data_creator/clientData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5841", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _username = Enums.USERS.webapp_lead_appraiser_username;
const _password = Enums.USERS.webapp_lead_appraiser_password;

export default {
    reportCreationData: reportCreationFixture(),
    clientCreationData: ClientCreationData.getDefaultClientData(),
    username: _username,
    password: _password
};