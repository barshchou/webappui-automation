import { _chips_is_stabilized } from './../../data_chips/chips_is_stabilized.fixture';
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4718", {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    chips: _chips_is_stabilized
};