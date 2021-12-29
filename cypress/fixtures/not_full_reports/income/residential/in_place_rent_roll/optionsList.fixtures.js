const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: "freddie-mac",
        incomeValue: "mixed-use",
        conclusionValue: "AS_IS"
    };
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

const id9Fixture = () => {
    return {
        columns: ["Square Footage", "Rent PSF"]
    };
};

const id11Fixture = () => {
    return {
        column: "# Bathrooms",
        label: "Bathrooms"
    };
};

const id12Fixture = () => {
    return {
        labelAndColumn: "Outdoor Space"
    };
};

const id13Fixture = () => {
    return {
        labelAndColumn: "Unit Type"
    };
};

export const reportCreationData = () => {
    return Object.freeze(reportCreationFixture());
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

export const id9Data = () => {
    return Object.freeze(id9Fixture());
};

export const id11Data = () => {
    return Object.freeze(id11Fixture());
};

export const id12Data = () => {
    return Object.freeze(id12Fixture());
};

export const id13Data = () => {
    return Object.freeze(id13Fixture());
};

export default {
    reportCreationData: reportCreationData(),
    csvLinks: csvLinksData(),
    id3: id3Data(),
    id7: id7Data(),
    id8: id8Data(),
    id9: id9Data(),
    id11: id11Data(),
    id12: id12Data(),
    id13: id13Data()
};