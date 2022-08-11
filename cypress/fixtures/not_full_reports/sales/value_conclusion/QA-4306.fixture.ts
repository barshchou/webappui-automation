import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const rentRollFixture = () => {
    return {
        bedrooms: 1,
        rentType: "Market Rate",
        leaseStatus: "Occupied",
        monthlyRent: 2000
    };
};

const generalDataFixture = () => {
    return {
        numberOfUnits: 1,
        lessBuyoutCost: 500,
        appraiserConclusion: 6,
        lessEntrepreneurialProfit: 12,
        lessEntrepreneurialProfitPopUp: 
            "Entrepreneurial profit is equal to 12% of the sum of all of the line items above, " +
            "$500.00, which totals to $60.00"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4306", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    rentRollData: Object.freeze(rentRollFixture()),
    generalData: Object.freeze(generalDataFixture()),
    valueConclusionKeyAsComplete: Object.keys(Enums.VALUE_CONCLUSION_NAME)[2] as BoweryReports.ValueConclusionKeys,
    valueConclusionKeyAsStabilized: Object.keys(Enums.VALUE_CONCLUSION_NAME)[1] as BoweryReports.ValueConclusionKeys,
};