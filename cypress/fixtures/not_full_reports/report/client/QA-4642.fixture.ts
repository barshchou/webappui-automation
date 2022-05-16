import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _linkedChipsDropdownOptions= [
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
        suggestionName: 'Gross Building Area',
        typeSuggestValue: 'Gros',
        verifySuggest: '2,124,441',
        verifyExport: 'Gross building area'
    }, 
    {
        suggestionName: 'Lot',
        typeSuggestValue: 'Lo',
        verifySuggest: '100',
        verifyExport: '100'
    }, 
    {
        suggestionName: 'Property Type',
        typeSuggestValue: 'Propert',
        verifySuggest: 'multifamily',
        verifyExport: 'multifamily'
    }, 
    {
        suggestionName: 'Residential Unit Count',
        typeSuggestValue: 'Residentia',
        verifySuggest: '0',
        verifyExport: '0'
    }, 
    {
        suggestionName: 'Sherrif\'s Sale',
        typeSuggestValue: 'Sherri',
        verifySuggest: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.",
        verifyExport: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided."
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
        suggestionName: 'Year Built',
        typeSuggestValue: 'Yea',
        verifySuggest: '1910',
        verifyExport: '1910'
    }, 
    {
        suggestionName: 'Zone(s)',
        typeSuggestValue: 'Zone',
        verifySuggest: 'R8',
        verifyExport: 'R8'
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4642", { conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE }),
    linkedChipsDropdownOptions: _linkedChipsDropdownOptions
};