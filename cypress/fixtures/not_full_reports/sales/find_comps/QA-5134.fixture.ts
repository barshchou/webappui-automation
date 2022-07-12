import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("5134", {
            incomeValue: Enums.INCOME_TYPE.both,
            conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
        }),
    /**
     * Number of sales comps which will be added for test
     */
    compsToAdd: [ 0, 1 ],
    /**
     * Selector for draggable component. Should not be moved as Page Element since
     * it's hard to extract the selector from `cy.get` method
     */
    draggableSelector: '[data-react-beautiful-dnd-drag-handle="0"]',
    /**
     * alias for sales comps check
     */
    aliasCompsBefore:"comps_before",
    aliasCompsAfter:"comps_after"
};