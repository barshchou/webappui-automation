import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            monthlyRent: 500.01,
            bedRooms: 2
        },
        {
            monthlyRent: 701,
            bedRooms: 5.5
        },
        {
            monthlyRent: 12345,
            bedRooms: "fdsf"
        },
        {
            monthlyRent: 125,
            bedRooms: 0
        },
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4233", {
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: enums.INCOME_TYPE.residential
    }),
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture()
};