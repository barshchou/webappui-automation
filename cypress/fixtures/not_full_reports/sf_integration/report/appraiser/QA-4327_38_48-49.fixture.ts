import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData(Enums.SALESFORCE_JOBS.withoutFreddieMac, { 
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac, 
        incomeValue: Enums.INCOME_TYPE.both, 
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE }, true);
};

const appraisers = [
    {
        name: "Robocop Automation",
        isPersonallyInspected: false
    },
    {
        name: "Rose Carrillo",
        isPersonallyInspected: false
    },
    {
        name: "Sherif Elshoubri",
        isPersonallyInspected: false
    },
    {
        name: "Tim Lam",
        isPersonallyInspected: true
    },
];

const _sectionsToExport: BoweryReports.SectionsToIncludeInExport[] = [
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.coverPage,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.certificationSection
];

export default {
    reportCreationData: reportCreationFixture(),
    appraisers,
    sectionsToExport: _sectionsToExport
};