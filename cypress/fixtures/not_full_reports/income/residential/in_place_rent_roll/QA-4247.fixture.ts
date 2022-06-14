
import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _conclusionValues = [ Enums.VALUE_CONCLUSION_TYPE.AS_IS, Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE ];

export const createReportData = (value) => {
    return ReportDataCreator.getReportData("4247", { conclusionValue: value });
};

const occupied: BoweryReports.LeaseStatus = "Occupied";
const vacant: BoweryReports.LeaseStatus = "Vacant";

const _leaseStatusFixture = [ occupied, vacant ] as BoweryReports.LeaseStatus[];

const _textCommentaryFixture = [
    "462 1st Avenue currently contains 2 occupied units generating $0 of total annual residential income.",
    "462 1st Avenue is currently 100% vacant. We requested the developer's projected residential rent roll, but did not receive it. The property will contain 2 studios.",
    "462 1st Avenue currently contains 1 occupied unit and 1 vacant unit generating $0 of total annual residential income.",
    "The developer's projected residential rent roll is presented below.",
    "upon completion of the construction works; the developer's projected residential rent roll is presented below."
];

export default {
    numberOfUnits: 2,
    label: "Developer's Forecast",
    leaseStatusData: _leaseStatusFixture,
    textCommentaryData: _textCommentaryFixture,
    tooltipText: "The following generated text will appear in the Income Approach's Current Residential Rent Roll.",
    conclusionValues: _conclusionValues
};