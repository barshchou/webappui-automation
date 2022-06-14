import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4484_86_88-90", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _suggestionsVerificationData = [
    {
        value:"=F",
        suggestion: "Foreclosure Sale",
        verifyAreaValue: `The above transaction reflects a foreclosure sale of the property. ` +
                        `Typically in a foreclosure sale, the buyer assumes all encumbrances on the site, ` +
                        `including any outstanding mortgage amount and legal fees ("upset costs"), delinquent ` +
                        `taxes and water and sewer charges, foreclosure sale fee, and realty transfer taxes. ` +
                        `This information was requested from the owner; however, not provided.`
    },
    {
        value:"=S",
        // eslint-disable-next-line no-useless-escape
        suggestion: "Sherrif'\s Sale",
        verifyAreaValue: `The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s ` +
                        `sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees ` +
                        `("upset costs"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. ` +
                        `This information was requested from the owner; however, not provided.`
    }
];

const _chipVerificationData = [
    {
        value: "=B",
        suggestion: "Block",
        verifyAreaValue: "962"
    },
    {
        value: "=B",
        suggestion: "Building Name",
        verifyAreaValue: "buildingName"
    },
    {
        value: "=C",
        suggestion: "Commercial Unit Count",
        verifyAreaValue: "1"
    },
    {
        value: "=C",
        suggestion: "Concluded Cap Rate",
        verifyAreaValue: "0%"
    },
    {
        value: "=C",
        suggestion: "Condition",
        verifyAreaValue: "in  condition"
    },
    {
        value: "=G",
        suggestion: "Gross Building Area",
        verifyAreaValue: "2,124,441"
    },
    {
        value: "=Lo",
        suggestion: "Lot",
        verifyAreaValue: "100"
    },
    {
        value: "=P",
        suggestion: "Property Type",
        verifyAreaValue: "mixed-use"
    },
    {
        value: "=Res",
        suggestion: "Residential Unit Count",
        verifyAreaValue: "0"
    },
    {
        value: "=Si",
        suggestion: "Site Area",
        verifyAreaValue: "753,175"
    },
    {
        value: "=St",
        suggestion: "Street Address",
        verifyAreaValue: "462 1st Avenue"
    },
    {
        value: "=St",
        suggestion: "Street Name",
        verifyAreaValue: "1st Avenue"
    },
    {
        value: "=Y",
        suggestion: "Year Built",
        verifyAreaValue: "1910"
    },
    {
        value: "=Z",
        suggestion: "Zone(s)",
        verifyAreaValue: "R8"
    }
];

const _leaseStatus: BoweryReports.LeaseStatus = "Occupied";
const _chipPromptValue = "=";

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatus: _leaseStatus,
    suggestionsVerificationData: _suggestionsVerificationData,
    chipVerificationData: _chipVerificationData,
    chipPromptValue: _chipPromptValue
};