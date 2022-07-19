import { _chips_is_stabilized } from './../../data_chips/chips_is_stabilized.fixture';
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4640"),
    textToType: "=",
    chips: _chips_is_stabilized
};