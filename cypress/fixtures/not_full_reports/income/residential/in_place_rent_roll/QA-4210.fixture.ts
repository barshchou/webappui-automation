import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
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
    sumCurrent: Enums.RENT_ROLL_OPTIONS_CHECKBOXES.summarize, 
    verifyExport: "test",
    residentialUnits: rentRollResidentialUnitsFixture(),
    verifyText: "Rent Roll Summary by Unit Type",
    exportSectionName: Enums.EXPORT_TITLES.currentResidentialRentRoll,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.incomeCapitalizationApproach
};