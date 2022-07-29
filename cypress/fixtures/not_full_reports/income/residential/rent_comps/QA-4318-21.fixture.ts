import ReportDataCreator from "../../../../data_creator/reportData.creator";

const formDataFixture = () => {
    return {
        address: "230 Park Avenue, New York, New York",
        unitNumber: "someTest196Numb",
        unitTypes: [ "Typical", "Duplex", "Triplex", "Simplex", "Penthouse", 
            "Loft", "Garden Style", "Basement", "Garage", "Townhome" ],
        monthly: 30000,
        squareFootage: 9500,
        infoSources: [ "bowerySubject", "externalDatabase", "other" ],
        bedrooms: 5555,
        rooms: 9999,
        numberOfBathOk: 3.5,
        numberOfBathWrong: 2.1,
        amenitiesQaAttr: [ "none", "backyard", "balcony", "roof", "terrace", "buildingLaundry", "unitLaundry" ],
        sourceInfoCheck: "Bowery Subject",
        cityDistrict: "Manhattan",
        wrongFormatDate: "48-55-2222",
        sourceUrl: "https://test-url.com",
        sourceName: "some source name",
        internalNotes: "This is test notes for internal notes test field"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4318-21"),
    formData: Object.freeze(formDataFixture())
};