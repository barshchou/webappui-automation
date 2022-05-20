import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4188", {
        incomeValue: Enums.INCOME_TYPE.BOTH
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
        value: "office",
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
    leaseDate: "01012022",
    baseRent: 12,
    squareFeet: 100,
    numberOfMonthsInYear: 12,
    perYear: _perYear,
    perMonth: _perMonth
};