import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _removedBuildingCompsColumns = [
    {
        name: "#",
        selector: "index",
        text: "1"
    },
    {
        name: "Address",
        selector: "address",
        text: "508 Broadway, New York, NY 10012"
    },
    {
        name: "Sub-Type",
        selector: "subType",
        text: "Mid-Rise"
    },
    {
        name: "Elevator",
        selector: "elevator",
        text: "No"
    },
    {
        name: "# Units",
        selector: "units",
        text: "4"
    },
    {
        name: "Unit Types",
        selector: "bedroomCounts",
        text: "-"
    },
    {
        name: "Avg Rent",
        selector: "avg-rent",
        text: "$0.00"
    },
    {
        name: "Dist.",
        selector: "distance",
        text: "2.0m"
    },
    {
        name: "As of Date",
        selector: "asOfDate",
        text: "-"
    }
];

const _removedBuildingCompsTableButtons = [ "SHOW DETAILS", "Add" ];

export default {
    reportCreationData: ReportDataCreator.getReportData("4416"),
    removedBuildingCompsColumns: _removedBuildingCompsColumns,
    actionsHeader: "Actions",
    removedBuildingCompsTableButtons: _removedBuildingCompsTableButtons
};