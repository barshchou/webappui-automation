import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

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
    reportCreationData: Object.freeze(reportCreationFixture()),
    rentRollData: Object.freeze(rentRollFixture()),
    generalData: Object.freeze(generalDataFixture())
};