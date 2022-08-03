import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4147-49_50-51", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _coordinates = [
    { x: 400, y: 250 },
    { x: 550, y: 350 },
    { x: 650, y: 250 }
];

const _editCoordinates = [
    { x: 380, y: 75 },
    { x: 200, y: 100 },
    { x: 400, y: 50 }
];

export default {
    reportCreationData: reportCreationFixture(),
    coordinates: _coordinates,
    editCoordinates: _editCoordinates,
    verifyDraftValue: 514,
    verifyDrewValue: 755
};