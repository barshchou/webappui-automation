import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

type RentCompField = {
    name: string,
    value: string | number
};

type unitOfMeasure = "per square foot per year" | "per square foot per month";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4188", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });
};

const _rentCompFields: RentCompField[] = [
    {
        name: "baseRent",
        value: 12
    },
    {
        name: "squareFeet",
        value: 100
    },
    {
        name: "tenantName",
        value: "Test"
    },
    {
        name: "use",
        value: "office"
    },
    {
        name: "sourceOfInformation",
        value: "bowerySubject"
    }
];

const _unitsOfMeasure: unitOfMeasure[] = [ "per square foot per year", "per square foot per month" ];

export default {
    reportCreationData: reportCreationFixture(),
    address: "462 1st Avenue, New York, USA",
    rentCompFields: _rentCompFields,
    leaseDate: "01012022",
    unitsOfMeasure: _unitsOfMeasure
};