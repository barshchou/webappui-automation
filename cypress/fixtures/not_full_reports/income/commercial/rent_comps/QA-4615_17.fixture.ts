import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4615_17", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _useRentCompField = {
    name: "use",
    value: "other" as BoweryReports.CommercialUnits.UseValues,
    type: "dropdown"
};

const _sourceOfInformationRentCompField = {
    name: "sourceOfInformation",
    value: "bowerySubject",
    type: "dropdown"
};

const _verifyFillValues = [ 
    "0", "1", "128", "255", "256", "257", 
    "EegfdgdfПвпывпвы", "#$%^&*())_!+", "     fsdfsdf    dfsd    ", 
    "<script>alert('I hacked this!')</script>"
];

const _verifyDeleteValues = [
    "{backspace}",
    "{leftArrow}{del}"
];

export default {
    fieldName: "otherUse",
    reportCreationData: _reportCreationData,
    useRentCompField: _useRentCompField,
    verifyFillValues: _verifyFillValues,
    verifyDeleteValues: _verifyDeleteValues,
    sourceOfInformationRentCompField: _sourceOfInformationRentCompField
};