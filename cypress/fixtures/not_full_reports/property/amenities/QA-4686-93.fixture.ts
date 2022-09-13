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
    {
        specName: "[QA-4688]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPrivateBalcony,
        inputName: Enums.AMENITIES_INPUTS.privateBalconyUnits
    },
    {
        specName: "[QA-4689]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPrivateTerrace,
        inputName: Enums.AMENITIES_INPUTS.privateTerraceUnits
    },
    {
        specName: "[QA-4690]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPrivateRoofArea,
        inputName: Enums.AMENITIES_INPUTS.privateRoofAreaUnits
    },
    {
        specName: "[QA-4691]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPrivateDeck,
        inputName: Enums.AMENITIES_INPUTS.privateDeckUnits
    },
    {
        specName: "[QA-4692]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPrivateBackyard,
        inputName: Enums.AMENITIES_INPUTS.privateBackyardUnits
    },
    {
        specName: "[QA-4693]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasOtherUnitAmenity,
        inputName: Enums.AMENITIES_INPUTS.otherUnits
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4686-93"),
    enterValue: "Lorem Ipsum is simply dummy text he leap into. 1234567890:?;№!@#$%^&*(){}<>",
    inputs
};