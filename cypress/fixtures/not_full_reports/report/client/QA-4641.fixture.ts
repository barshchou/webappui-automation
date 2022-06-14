import { _chips_is_stabilized } from './../../data_chips/chips_is_stabilized.fixture';
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4641", { templateValue:Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED });
};

export default {
    reportCreationData: reportCreationFixture(),
    textToType: "=",
    chips: _chips_is_stabilized
};