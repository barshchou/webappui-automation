import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import chipsDataCreator from '../../../data_creator/chipsData.creator';
import enums from '../../../../enums/enums';
import { BoweryReports } from "../../../../types/boweryReports.type";

export const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4718", {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    });
};

const buildingName = 'Test Building Name QA-4718';

const _chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName
};

const chipNames = [ 
    "Interest Appraised As Is Market Value Selection", 
    "Interest Appraised" 
];

export default {
    reportCreationData: reportCreationFixture(),
    chips: chipsDataCreator.getChipsData(_chipsOptions, enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    buildingName,
    propertyRightsAppraisedTitle: Enums.PAGES_TEXTBOX_NAMES.propertyRightsAppraised,
    definitionOfMarketValueTitle: Enums.PAGES_TEXTBOX_NAMES.definitionOfMarketValue,
    propertyRightsSection: Enums.EXPORT_TITLES.propertyRightsAppraised,
    definitionOfMarketValueSection: Enums.EXPORT_TITLES.definitionOfMarketValue,
    chipNames
};