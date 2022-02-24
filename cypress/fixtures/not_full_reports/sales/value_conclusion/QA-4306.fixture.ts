import Enums from "../../../../enums/enums";
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
        lessEntrepreneurialProfitPopUp: "Entrepreneurial profit is equal to 12% of the sum of all of the line items above, " +
            "$500.00, which totals to $60.00"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportSpecificConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE, "4306"),
    rentRollData: Object.freeze(rentRollFixture()),
    generalData: Object.freeze(generalDataFixture())
};