import ReportDataCreator from "../../../data_creator/reportData.creator";

const inspectorNames = [ 
    { 
        enterValue: "robocop inspector",
        verifyValue: "Robocop Inspector"
    },
    { 
        enterValue: "joe rogan-morning",
        verifyValue: "Joe Rogan-Morning"
    },
    { 
        enterValue: "shaquille o’neal",
        verifyValue: "Shaquille O’Neal"
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("6536"),
    inspectorNames,
};