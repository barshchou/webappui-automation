import { _chips_complete } from './../../data_chips/chips_complete.fixture';
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4720", {
        templateValue: Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    chips: _chips_complete
};