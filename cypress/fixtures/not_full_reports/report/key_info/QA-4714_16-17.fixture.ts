import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4714_16-17"),
    chips: [
        {
            enterValue: "=F",
            listValue: "Foreclosure Sale",
            verifyTexValue: `The above transaction reflects a foreclosure sale of the property. Typically in a ` + 
            `foreclosure sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage ` + 
            `amount and legal fees ("upset costs"), delinquent taxes and water and sewer charges, foreclosure ` + 
            `sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.`
        },
        {
            enterValue: "=Sh",
            listValue: "Sherrif's Sale",
            verifyTexValue: `The above transaction reflects a Sheriff's sale of the property. Typically in a ` + 
            `Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage ` + 
            `amount and legal fees ("upset costs"), delinquent taxes and water and sewer charges, Sheriff's ` + 
            `sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.`
        },
        {
            enterValue: "=Unc",
            listValue: "Unchanged Renovations",
            verifyTexValue: "Upon renovation, the subject unit count and gross building area will remain unchanged."
        }
    ]
};