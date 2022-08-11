import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
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
    reportCreationData: ReportDataCreator.getReportData("4242", {
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: enums.INCOME_TYPE.residential
    }),
    perRoomAnalysis: enums.RENT_ROLL_OPTIONS_CHECKBOXES.include,
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture()
};