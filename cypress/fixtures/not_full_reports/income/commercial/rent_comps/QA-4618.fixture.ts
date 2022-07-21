import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4618", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _address = "462 1st Avenue, New York, USA";
const _leaseDate = "01-01-2022";
const _compGroup = "QA_4618_Comp_Group";
const _otherUse = "TestUseOther";
const _monthly: BoweryReports.UnitsOfMeasure = "monthly";

const _rentCompFields: BoweryReports.RentCompField[] = [
    {
        name: "baseRent",
        value: "12",
        type: "input"
    },
    {
        name: "squareFeet",
        value: "100",
        type: "input"
    },
    {
        name: "tenantName",
        value: "Test",
        type: "input"
    },
    {
        name: "use",
        value: "other" as BoweryReports.CommercialUnits.UseValues,
        type: "dropdown"
    },
    {
        name: "otherUse",
        value: _otherUse,
        type: "input"
    },
    {
        name: "sourceOfInformation",
        value: "bowerySubject",
        type: "dropdown"
    }
];

export default {
    address: _address,
    reportCreationData: _reportCreationData,
    rentCompFields: _rentCompFields,
    leaseDate: _leaseDate,
    compGroup: _compGroup,
    compsAmount: 1, 
    otherUse: _otherUse,
    unitMeasureMonthly: _monthly
};