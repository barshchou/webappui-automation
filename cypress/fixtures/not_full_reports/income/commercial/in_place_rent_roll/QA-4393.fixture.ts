import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress().setReportNumber("4393")
        .setTemplateValue(Enums.TEMPLATE_TYPE.FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_IS);
};

const generalFixture = () => {
    return {
        numberOfUnits: 3,
        squareFeetList: [200, 358, 190.5],
        leaseStatusesList: ["Occupied", "Vacant", "Occupied"],
        monthlyRents: [550.5, 100, 999]
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture())
};