import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4391", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const leaseStatusesFixture: BoweryReports.LeaseStatus[] = [ "Occupied", "Vacant", "Occupied" ];

const generalFixture = () => {
    return {
        numberOfUnits: 3,
        squareFeetList: [ 200, 358, 190.5 ],
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture()),
    leaseStatusesList: leaseStatusesFixture
};