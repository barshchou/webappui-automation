import { getTodayDateString } from "../../../../../utils/date.utils";
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5998-99_6012_33-34", {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac
    });
};

const date = getTodayDateString("/", false);

const appraiserName = "Matt Roman";

const inspectorName = "Robocop Inspector";

const test = "Robocop Inspector has made a personal inspection of the property that is the subject of this report on 08/23/22. Brandon Gollotti, Robocop Automation and Matt Roman have not made a personal inspection of the property that is the subject of this report.";

const certificationInspectionComment = `${inspectorName} has made a personal inspection of the` + 
` property that is the subject of this report on ${date}. Brandon Gollotti, Robocop Automation` + 
` and ${appraiserName} have not made a personal inspection of the property that is the subject of this report.`;

const certificationAssistanceComment = `${inspectorName} provided significant real property appraisal` + 
" assistance to  the person signing this certification.";

const validationText = "This appraiser / inspector isn't in the system. Please select 'External Inspector' ";

export default {
    reportCreationData: reportCreationFixture(),
    appraiserName,
    inspectorName,
    validationText,
    certificationInspectionComment,
    certificationAssistanceComment,
    test
};