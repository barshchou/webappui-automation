import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            footage: 100,
            monthlyRent: 123.01,
            leaseStatus: enums.LEASE_STATUS.occupied,
            rentType: enums.RENT_TYPE.rentControlled
        },
        {
            footage: 100,
            monthlyRent: 321.01,
            leaseStatus: enums.LEASE_STATUS.occupied,
            rentType: enums.RENT_TYPE.marketRate
        }
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("6167-68"),
    residentialUnits: rentRollResidentialUnitsFixture(),
    rentControlledDiscussion: "The maximum rent increases for rent-controlled tenants will be set at the average "+
        "of the five most recent Rent Guidelines Board annual rent increases for one-year rent-stabilized renewals, "+
        "which is currently 1.4%.",
    rentTypeIncrease: [ 1.014, 1 ], //1st rent controlled, 2nd market rent
    potentialGrossSection: enums.EXPORT_TITLES.potentialGrossResidentialIncome,
    rentControlledSection: enums.EXPORT_TITLES.rentControlledIncreases 
};