import ReportDataCreator from "../../../../data_creator/reportData.creator";

const formDataFixture = () => {
    return {
        address: "230 Park Avenue, New York, NY 10169",
        unitNumber: "someTest196Numb",
        unitType: "Typical",
        monthly: 3000,
        squareFootage: 95,
        infoSource: "bowerySubject",
        bedrooms: 5,
        rooms: 7,
        amenitiesQaAttr: [ "none", "backyard", "balcony", "roof", "terrace", "buildingLaundry", "unitLaundry" ],
        sourceInfoCheck: "Bowery Subject"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4339"),
    numberOfUnits: 2,
    rentType: "Market Rate",
    numberOfBedrooms: 5,
    includePerRoomCheckbox: "Include Per Room Analysis in Report",
    formData: Object.freeze(formDataFixture())
};