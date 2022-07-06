import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _randomPart = (): string => {
    return "5363-66-" + Date.now().toString();
};

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData(_randomPart(), {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _leadAppraiserFullName = "Webapp LeadAppraiser";
const _appraiserFullName = "Webapp Appraiser";
const _adminFullName = "Webapp Admin";
const _inspectorFullName = "Webapp Inspector";

const _appraisersRoles = () => {
    return [
        {
            role: Enums.USER_ROLES.admin,
            fullName: _adminFullName,
            canSignReport: true,
            testId: "[QA-5363]"
        },
        {
            role: Enums.USER_ROLES.leadAppraiser,
            fullName: _leadAppraiserFullName,
            canSignReport: true,
            testId: "[QA-5364]"
        },
        {
            role: Enums.USER_ROLES.appraiser,
            fullName: _appraiserFullName,
            canSignReport: true,
            testId: "[QA-5365]"
        },
        {
            role: Enums.USER_ROLES.inspector,
            fullName: _inspectorFullName,
            canSignReport: false,
            testId: "[QA-5366]"
        }
    ];
};

export default {
    reportCreationData: reportCreationFixture(),
    appraisersRoles: _appraisersRoles()
};