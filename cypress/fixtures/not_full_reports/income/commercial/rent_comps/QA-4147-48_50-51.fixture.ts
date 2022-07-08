import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4147-48_50-51", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    coordinates1: [ 
        { elem: 0, left: 380, top: 500 },
        { elem: 1, left: 200, top: 400 },
        { elem: 2, left: 400, top: 70 }
    ],
    coordinates: [ 
        { left: 400, top: 250 },
        { left: 550, top: 350 },
        { left: 650, top: 250 }
    ]
};