import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _removedBuildingCompsColumn = [
    {
        name: "#",
        value: null
    },
    {
        name: "Address",
        value: null
    },
    {
        name: "Sub-Type",
        value: [ "Low-Rise", "Mid-Rise", "High-Rise" ]
    },
    {
        name: "Elevator",
        value: [ "Yes", "No" ]
    },
    {
        name: "# Units",
        value: null
    },
    {
        name: "Unit Types",
        value: null
    },
    {
        name: "Avg Rent",
        value: null
    },
    {
        name: "Dist.",
        value: null
    },
    {
        name: "As of Date",
        value: null
    },
    {
        name: "Actions",
        value: [ "Show Details", "Add", "X" ]
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4416"),
    removedBuildingCompsColumn: _removedBuildingCompsColumn
};