/* eslint-disable max-len */
import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4200-03"),
    links: {
        prodLink: "https://docs.google.com/spreadsheets/d/1AqdrQtMkJaiZKiaY0S0U-741_QCXeqesHRujlpLTRtA/edit#gid=707609080",
        othersLink: "https://docs.google.com/spreadsheets/d/169M9MMz-sKQ1TMjIN1mLM1nvLwDJCNx7KF89Dis2NqM/edit?usp=sharing"
    },
    numberOfUnits: 0,
    numberOfUnitsToChange: 1,
    csvFileName: "not_full_reports/Rent_Roll_CSV.csv",
    csvNumberOfUnits: 23,
    xlsxFileName: "not_full_reports/Rent_Roll_XLSX.xlsx",
    checkboxLabels: [ "Include Per Room Analysis in Report", "Developer's Forecast" ]
};