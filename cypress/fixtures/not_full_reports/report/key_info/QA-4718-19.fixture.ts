import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = (conclusionValue: BoweryReports.ConclusionValue, reportNumber: string) => {
    return ReportDataCreator.setAddress()
        .setReportNumber(`4718-19${reportNumber}`)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(conclusionValue).build();
};

export default {
    typesReport: [ "AS_IS", "AS_STABILIZED" ] as Array<BoweryReports.ConclusionValue>,
    chips: [
        {
            suggestionName: 'Block',
            typeSuggestValue: 'Bloc',
            verifySuggest: '962',
            verifyExport: '962'
        }, 
        {
            suggestionName: 'Building Name',
            typeSuggestValue: 'Buildin',
            verifySuggest: 'buildingName',
            verifyExport: 'Building name'
        }, 
        {
            suggestionName: 'Concluded Cap Rate',
            typeSuggestValue: 'Conclude',
            verifySuggest: '0%',
            verifyExport: 'Conclude'
        }, 
        {
            suggestionName: 'Condition',
            typeSuggestValue: 'Conditio',
            verifySuggest: 'in  condition',
            verifyExport: 'condition'
        }, 
        {
            suggestionName: 'Foreclosure Sale',
            typeSuggestValue: 'Foreclosur',
            verifySuggest: 'The above transaction reflects a foreclosure sale of the property. Typically in a foreclosure sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees ("upset costs"), delinquent taxes and water and sewer charges, foreclosure sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.',
            verifyExport: 'foreclosure sale'
        }, 
        {
            suggestionName: 'Sherrif\'s Sale',
            typeSuggestValue: 'Sherri',
            verifySuggest: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.",
            verifyExport: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided."
        },
        {
            suggestionName: 'Gross Building Area',
            typeSuggestValue: 'Gros',
            verifySuggest: '2,124,441',
            verifyExport: 'Gross building area'
        }, 
        {
            suggestionName: 'Property Type',
            typeSuggestValue: 'Propert',
            verifySuggest: 'mixed-use' || 'multifamily',
            verifyExport: 'multifamily'
        }, 
        {
            suggestionName: 'Residential Unit Count',
            typeSuggestValue: 'Residentia',
            verifySuggest: '0',
            verifyExport: '0'
        },  
        {
            suggestionName: 'Site Area',
            typeSuggestValue: 'Sit',
            verifySuggest: '753,175',
            verifyExport: '753,175'
        }, 
        {
            suggestionName: 'Street Address',
            typeSuggestValue: 'Stree',
            verifySuggest: '462 1st Avenue',
            verifyExport: '462 1st Avenue'
        },
        {
            suggestionName: 'Lot',
            typeSuggestValue: 'Lo',
            verifySuggest: '100',
            verifyExport: '100'
        },  
        {
            suggestionName: 'Street Name',
            typeSuggestValue: 'Stree',
            verifySuggest: '1st Avenue',
            verifyExport: '1st Avenue'
        }, 
        {
            suggestionName: 'Unchanged Renovations',
            typeSuggestValue: 'Unchange',
            verifySuggest: 'Upon renovation, the subject unit count and gross building area will remain unchanged.',
            verifyExport: 'Upon renovation, the subject unit count and gross building area will remain unchanged.'
        },
        {
            suggestionName: 'Zone(s)',
            typeSuggestValue: 'Zone',
            verifySuggest: 'R8',
            verifyExport: 'R8'
        }, 
    ]
};