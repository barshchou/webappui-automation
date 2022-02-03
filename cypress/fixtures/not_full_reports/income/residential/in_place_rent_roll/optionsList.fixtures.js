import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "ResRentRollOptions");
};

const csvLinksFixture = () => {
    return {
        prodLink: "https://docs.google.com/spreadsheets/d/1AqdrQtMkJaiZKiaY0S0U-741_QCXeqesHRujlpLTRtA/edit#gid=707609080",
        othersLink: "https://docs.google.com/spreadsheets/d/169M9MMz-sKQ1TMjIN1mLM1nvLwDJCNx7KF89Dis2NqM/edit?usp=sharing"
    };
};

const id3Fixture = () => {
    return {
        numberOfUnits: 0,
        numberOfUnitsToChange: 1,
        csvFileName: "not_full_reports/Rent_Roll_CSV.csv",
        csvNumberOfUnits: 23,
        xlsxFileName: "not_full_reports/Rent_Roll_XLSX.xlsx",
        rentType: "Market Rate",
    };
};

const id7Fixture = () => {
    return {
        column: "Rent Forecast",
        forecastLabel: "Developer's Forecast",
    };
};

const id8Fixture = () => {
    return {
        summarizeLabel: "Summarize current rent roll"
    };
};

const id11Fixture = () => {
    return {
        column: "# Bathrooms",
        label: "Bathrooms"
    };
};

export const csvLinksData = () => {
    return Object.freeze(csvLinksFixture());
};

export const id3Data = () => {
    return Object.freeze(id3Fixture());
};

export const id7Data = () => {
    return Object.freeze(id7Fixture());
};

export const id8Data = () => {
    return Object.freeze(id8Fixture());
};

export const id11Data = () => {
    return Object.freeze(id11Fixture());
};

export default {
    reportCreationData: reportCreationFixture(),
    csvLinks: csvLinksData(),
    id3: id3Data(),
    id7: id7Data(),
    id8: id8Data(),
    id11: id11Data()
};