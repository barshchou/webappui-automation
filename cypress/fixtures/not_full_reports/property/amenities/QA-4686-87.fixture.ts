import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const inputs = [
    {
        specName: "[QA-4686]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasWasherDryer,
        inputName: Enums.AMENITIES_INPUTS.washerDryerUnits
    },
    {
        specName: "[QA-4687]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPrivatePatio,
        inputName: Enums.AMENITIES_INPUTS.privatePatioUnits
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4686-87"),
    enterValue: "Lorem Ipsum is simply dummy text he leap into. 1234567890:?;№!@#$%^&*(){}<>",
    inputs
};