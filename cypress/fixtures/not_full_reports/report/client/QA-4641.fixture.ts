import { _chips_is_stabilized } from './../../data_chips/chips_is_stabilized.fixture';
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4641", { templateValue:Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED });
};

export default {
    reportCreationData: reportCreationFixture(),
    textToType: "=",
    chips: _chips_is_stabilized
};