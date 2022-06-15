import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            monthlyRent: 500.01,
            bedRooms: 2,
            rooms: 5
        },
        {
            monthlyRent: 701,
            bedRooms: 5.5,
            rooms: 10.5
        },
        {
            monthlyRent: 12345,
            bedRooms: "fdsf",
            rooms: "fdff"
        },
        {
            monthlyRent: 125,
            bedRooms: 0,
            rooms: 2
        },
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4232_33", {
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: enums.INCOME_TYPE.residential
    }),
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture(),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    initialValue: 2
};