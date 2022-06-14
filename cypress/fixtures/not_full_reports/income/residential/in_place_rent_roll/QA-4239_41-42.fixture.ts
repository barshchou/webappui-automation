import enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            rooms: 5,
            monthlyRent: 500.01,
            leaseStatus: "Vacant",
        },
        {
            rooms: 10,
            monthlyRent: 701,
            leaseStatus: "Occupied",
        },
        {
            rooms: 3,
            monthlyRent: 12345,
            leaseStatus: "Employee",
        },
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4239_41-42", {
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: enums.INCOME_TYPE.RESIDENTIAL
    }),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture()
};