import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            rooms: 5,
            monthlyRent: 500.01,
            leaseStatus: Enums.LEASE_STATUS.vacant,
            rentType: Enums.RENT_TYPE.marketRate
        },
        {
            rooms: 10,
            monthlyRent: 701,
            leaseStatus: Enums.LEASE_STATUS.occupied,
            rentType: Enums.RENT_TYPE.rentStabilized
        },
        {
            rooms: 5,
            monthlyRent: 12345,
            leaseStatus: Enums.LEASE_STATUS.employee,
            rentType: Enums.RENT_TYPE.rentControlled
        },
        {
            rooms: 4,
            monthlyRent: 125,
            leaseStatus: Enums.LEASE_STATUS.employee,
            rentType: Enums.RENT_TYPE.section8
        },
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4238-39_41-42", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        incomeValue: Enums.INCOME_TYPE.residential
    }),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    columnName: "Rent/Room",
    residentialUnits: rentRollResidentialUnitsFixture()
};