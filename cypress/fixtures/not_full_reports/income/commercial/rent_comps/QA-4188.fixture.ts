import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4188", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

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
        value: "office" as BoweryReports.CommercialUnits.UseValues,
        type: "dropdown"
    },
    {
        name: "sourceOfInformation",
        value: "bowerySubject",
        type: "dropdown"
    }
];

const _perYear: BoweryReports.UnitsOfMeasure = "per square foot per year";
const _perMonth: BoweryReports.UnitsOfMeasure = "per square foot per month";

export default {
    reportCreationData: reportCreationFixture(),
    address: "462 1st Avenue, New York, USA",
    rentCompFields: _rentCompFields,
    leaseDate: "01-01-2022",
    baseRent: 12,
    squareFeet: 100,
    numberOfMonthsInYear: 12,
    perYear: _perYear,
    perMonth: _perMonth
};