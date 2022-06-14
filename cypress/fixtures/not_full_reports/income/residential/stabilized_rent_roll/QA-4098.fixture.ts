import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

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
    reportCreationData: ReportDataCreator.getReportData("4098"),
    residentialUnits: rentRollResidentialUnitsFixture(),
    columns: [ "Square Footage", "Rent/SF" ],
};