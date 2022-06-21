import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4393", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    });
};

const leaseStatusesFixture: BoweryReports.LeaseStatus[] = [ "Occupied", "Vacant", "Occupied" ];

const generalFixture = () => {
    return {
        numberOfUnits: 3,
        squareFeetList: [ 200, 358, 190.5 ],
        leaseStatusesList: [ "Occupied", "Vacant", "Occupied" ],
        monthlyRents: [ 550.5, 100, 999 ]
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture()),
    leaseStatusesList: leaseStatusesFixture
};