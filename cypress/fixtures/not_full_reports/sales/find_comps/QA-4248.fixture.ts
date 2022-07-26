import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _compsNumber: number[] = [ 0, 1, 2 ];

export default {
    setupInterceptions:salesInterceptions,
    reportCreationData: ReportDataCreator.getReportData("4248"),
    /**
     * Selecting several sales comps for test
     */
    compsNumber: _compsNumber
};