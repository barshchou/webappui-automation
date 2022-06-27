import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            rooms: 5,
            monthlyRent: 500.01,
            leaseStatus: "Vacant",
            rentType: "Market Rate"
        },
        {
            rooms: 10,
            monthlyRent: 701,
            leaseStatus: "Occupied",
            rentType: "Rent Stabilized"
        },
        {
            rooms: 5,
            monthlyRent: 12345,
            leaseStatus: "Employee",
            rentType: "Rent Controlled"
        },
        {
            rooms: 4,
            monthlyRent: 125,
            leaseStatus: "Employee",
            rentType: "Section 8"
        },
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4238-39_41-42", {
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: enums.INCOME_TYPE.residential
    }),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture()
};