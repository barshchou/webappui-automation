import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("4383").setAddress()
        .setTemplateValue(Enums.TEMPLATE_TYPE.FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseOccupied: "Occupied",
    leaseVacant: "Vacant",
    tenantName: "Test tenant name"
};