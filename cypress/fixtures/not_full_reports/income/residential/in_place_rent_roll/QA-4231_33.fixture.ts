import enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

type rentRollResidentialUnitsFixture = Array<{
    monthlyRent: number,
    bedRooms: number | string,
    rooms: number | string,
    unitNumber: number
}>

const rentRollResidentialUnitsFixture = () :rentRollResidentialUnitsFixture => {
    return [
        {
            monthlyRent: 500.01,
            bedRooms: 2,
            rooms: 5,
            unitNumber: 4
        },
        {
            monthlyRent: 701,
            bedRooms: 5.5,
            rooms: 10.5,
            unitNumber: 8
        },
        {
            monthlyRent: 12345,
            bedRooms: "fdsf",
            rooms: "fdff",
            unitNumber: 65645643634
        },
        {
            monthlyRent: 125,
            bedRooms: 0,
            rooms: 2,
            unitNumber: 14
        },
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4231_33", {
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: enums.INCOME_TYPE.residential
    }),
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture(),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    initialValue: 2
};