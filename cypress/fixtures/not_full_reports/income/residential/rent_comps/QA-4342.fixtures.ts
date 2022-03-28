import ReportDataCreator from "../../../../data_creator/reportData.creator";

const uncategorizedDataFixture = () => {
    return {
        compData: {
            address: "246 East 33rd Street, Manhattan, New York", bedrooms: 3, rooms: 5, monthly: 13500,
            sourceInfoCheck: "Streeteasy", squareFootage: "3,000", rentPSF: "$54", bathrooms: 3
        },
        minValue: 13500,
        averageValue: 13500,
        maxValue: 13500,
        subjectColumnText: "Subject$0$0$0",
        devForecastLabel: "Developer's Forecast",
        devForecastText: "Subject Developer's Forecast$0$0$0",
        bathroomsLabel: "Bathrooms"
    };
};

const bedroomCategoryFixture = () => {
    return {
        numberOfUnits: 1,
        bedroomsNumber: 3,
        rentType: "Market Rate",
        compData: {
            address: "246 East 33rd Street, Manhattan, New York", bedrooms: 3, rooms: 5, monthly: 13500,
            sourceInfoCheck: "Streeteasy"
        },
        subjectColumnText: "Subject Market Rate$0$0$0"
    };
};

export const uncategorizedData = () => {
    return Object.freeze(uncategorizedDataFixture());
};

export const bedroomCategoryData = () => {
    return Object.freeze(bedroomCategoryFixture());
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4342"),
    includePerRoomCheckbox: "Include Per Room Analysis in Report",
    uncategorizedData: uncategorizedData(),
    bedroomCategory: bedroomCategoryData()
};