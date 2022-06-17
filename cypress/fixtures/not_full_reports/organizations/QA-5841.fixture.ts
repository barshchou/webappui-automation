import ReportDataCreator from "../../data_creator/reportData.creator";
import Enums from "../../../enums/enums";
import enums from "../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4016", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _username = enums.USERS.webapp_appraiser_username;
const _password = enums.USERS.webapp_appraiser_password;

export default {
    reportCreationData: reportCreationFixture(),
    username: _username,
    password: _password
};