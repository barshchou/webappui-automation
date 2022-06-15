const _blockValue = '962';
const _grossbuildingArea = '2,124,441';
const _siteArea = '753,175';
const _lotValue = '100';
const _residentialUnit  = '0';
const _streetAddress = '462 1st Avenue';
const _streetName = '1st Avenue';

export const _chips_is_stabilized =  [
    {
        suggestionName: 'Block',
        typeSuggestValue: 'Bloc',
        verifySuggest: _blockValue,
        verifyExport: _blockValue
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
        verifySuggest: _grossbuildingArea,
        verifyExport: 'Gross building area'
    }, 
    {
        suggestionName: 'Residential Unit Count',
        typeSuggestValue: 'Residentia',
        verifySuggest: _residentialUnit,
        verifyExport: _residentialUnit
    },  
    {
        suggestionName: 'Site Area',
        typeSuggestValue: 'Sit',
        verifySuggest: _siteArea,
        verifyExport: _siteArea
    }, 
    {
        suggestionName: 'Street Address',
        typeSuggestValue: 'Stree',
        verifySuggest: _streetAddress,
        verifyExport: _streetAddress
    },
    {
        suggestionName: 'Lot',
        typeSuggestValue: 'Lo',
        verifySuggest: _lotValue,
        verifyExport: _lotValue
    },  
    {
        suggestionName: 'Street Name',
        typeSuggestValue: 'Stree',
        verifySuggest: _streetName,
        verifyExport: _streetName
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
];