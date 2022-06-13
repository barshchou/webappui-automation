const _blockValue = '962';
const _grossbuildingArea = '2,124,441';
const _siteArea = '753,175';
const _lotValue = '100';
const _residentialUnit  = '0';
const _commercialUnit  = '1';
const _streetAddress = '462 1st Avenue';
const _streetName = '1st Avenue';

export const _chips_complete = [
    {
        suggestionName: 'As Complete Commercial Unit Count',
        typeSuggestValue: 'Commercial',
        verifySuggest: _commercialUnit,
        verifyExport: _commercialUnit
    },
    {
        suggestionName: 'As Complete Residential Unit Count',
        typeSuggestValue: 'Residential',
        verifySuggest: _residentialUnit,
        verifyExport: _residentialUnit
    },
    {
        suggestionName: 'As Stabilized Condition',
        typeSuggestValue: 'Conditio',
        verifySuggest: 'in  condition',
        verifyExport: 'condition'
    },  
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
        suggestionName: 'Current Commercial Unit Count',
        typeSuggestValue: 'Commercial',
        verifySuggest: '1',
        verifyExport: '1'
    },
    {
        suggestionName: 'Current Condition',
        typeSuggestValue: 'Condition',
        verifySuggest: 'in  condition',
        verifyExport: 'in  condition'
    },
    {
        suggestionName: 'Current Residential Unit Count',
        typeSuggestValue: 'Residential',
        verifySuggest: _residentialUnit,
        verifyExport: _residentialUnit
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