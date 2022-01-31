import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "AddNewCompFormTests");
};

const commonDataFixture = () => {
    return {
        searchAddress: "230 Park Avenue, New-York, USA",
        unitNumber: "someTest196Numb",
        unitTypes: ["Typical", "Duplex", "Triplex", "Simplex", "Penthouse", "Loft", "Garden Style", "Basement", "Garage"],
        monthlyRent: 3000,
        squareFootage: 95,
        infoSources: ["bowerySubject", "externalDatabase", "other"],
        numberOfBedrooms: 5,
        numberOfRooms: 7,
        amenitiesQaAttr: ["none", "backyard", "balcony", "roof", "terrace", "buildingLaundry", "unitLaundry"],
        sourceOfInfoSubject: "Bowery Subject"
    };
};

const id76Fixture = () => {
    return {
        sourceName: "some source name"
    };
};

const id77Fixture = () => {
    return {
        sourceUrl: "https://test-url.com"
    };
};

const id79Fixture = () => {
    return {
        numberOfBathOk: 3.5,
        numberOfBathWrong: 2.1
    };
};

const id80Fixture = () => {
    return {
        internalNotes: "This is test notes for internal notes test field"
    };
};

export const commonData = () => {
    return Object.freeze(commonDataFixture());
};

export const id76Data = () => {
    return Object.freeze(id76Fixture());
};

export const id77Data = () => {
    return Object.freeze(id77Fixture());
};

export const id79Data = () => {
    return Object.freeze(id79Fixture());
};

export const id80Data = () => {
    return Object.freeze(id80Fixture());
};

export default {
    reportCreationData: reportCreationFixture(),
    commonData: commonData(),
    id76: id76Data(),
    id77: id77Data(),
    id79: id79Data(),
    id80: id80Data()
};