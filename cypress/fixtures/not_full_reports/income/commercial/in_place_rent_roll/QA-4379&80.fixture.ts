import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4379&80")
        .setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED).build();
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: _leaseStatus,
    newUnitsNumber: 0
};