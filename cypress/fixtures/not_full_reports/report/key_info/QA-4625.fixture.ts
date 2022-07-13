import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = () => {
    return ReportDataCreator.setAddress()
    .setReportNumber("2200018572", true)
    .setTemplateValue(Enums.TEMPLATE_TYPE.notFreddieMac)
    .setIncomeValue(Enums.INCOME_TYPE.both)
    .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

const _LOESourceStrings: string[] = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAgVBMVEX//////v/6+",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAk1BMVEX//////v/9",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAk1BMVEX//////v/8",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAqFBMVEX//////v/8",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAqFBMVEX//////v/8",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAArlBMVEX//////v/9",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAmVBMVEX//////v/6",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEX//////v/6+",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB98AAAovCAMAAADZ/qXKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAkFBMVEX//////v/6+"
];

export default {
    reportCreationData: reportCreationFixture(),
    verifyValue: "78-80 Saint Marks Place__New York, NY 10003 - Bowery EL - signed.pdf",
    LOESourceStrings: _LOESourceStrings
};