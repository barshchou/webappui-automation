import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _comment = "In July 2021, the City Council set the fiscal year 2021/22 (7/1/2021 – 6/30/2022)" + 
" property tax rates. The new tax rates were not in place for the July 1, 2021 tax bills; as such, " +
"the previous year tax rate was initially applied to the July 2021 tax bills and adjustments were " +
"then made to subsequent tax bills to reflect the change in rate for any overpayment or underpayment. " +
"The new tax rates are reflected in the second half of tax year bills, " +
"which represent a blend of the initial tax rate in place in July of 2021 and " +
"second half of the fiscal year to achieve the actual 2021/22 tax rate. " +
"For the subject, we have applied the appropriate 2021/22 fiscal year tax rate " +
"to the most recent assessed value of the property to determine its current tax liability.";

export default {
    reportCreationData: ReportDataCreator.getReportData("5182", { address: "" }),
    title: "Tax Calculation Discussion",
    commentary: _comment,
    tooltip: "The following text will appear below the Tax Liability table in your export",
    exportSectionName: Enums.EXPORT_TITLES.assessedValueAndRealEstateTaxes,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.assessedValueAndRealEstateTaxes ]
};