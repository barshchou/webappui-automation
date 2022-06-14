import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

export const reportCreationData = (val: number) => {
    return ReportDataCreator.getReportData(`4210_${val}`);
};

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            footage: 100,
            monthlyRent: 500.01,
            leaseStatus: "Vacant",
        },
        {
            footage: 200,
            monthlyRent: 701,
            leaseStatus: "Occupied",
        },
        {
            footage: 300,
            monthlyRent: 423.45,
            leaseStatus: "Occupied",
        }
    ];
};

export default {
    sumCurrent: "Summarize current rent roll", 
    verifyExport: "test",
    residentialUnits: rentRollResidentialUnitsFixture(),
    verifyText: "Rent Roll Summary by Unit Type"
};