import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from '../../../../enums/enums';
import chipsDataCreator from "../../../data_creator/chipsData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";

export const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4720", {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const _buildingName = 'Test Building Name QA-4720';

const _chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: _buildingName,
};

export default {
    reportCreationData: reportCreationFixture(),
    chips: chipsDataCreator.getChipsData(_chipsOptions, enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE),
    buildingName: _buildingName,
    propertyRightsAppraisedTitle: Enums.PAGES_TEXTBOX_NAMES.propertyRightsAppraised,
    definitionOfMarketValueTitle: Enums.PAGES_TEXTBOX_NAMES.definitionOfMarketValue,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.introduction ]
};