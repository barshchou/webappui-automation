import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

const _baseChip =  [
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
];

const _baseChipsAsCompleted = [
    {
        suggestionName: 'Current Residential Unit Count',
        typeSuggestValue: 'Current Residential',
        verifySuggest: '3',
        verifyExport: '3'
    },
    {
        suggestionName: 'Current Commercial Unit Count',
        typeSuggestValue: 'Current Commercial',
        verifySuggest: '2',
        verifyExport: '2'
    },
    {
        suggestionName: 'Current Condition',
        typeSuggestValue: 'Current Condition',
        verifySuggest: 'condition',
        verifyExport: 'condition'
    },
    {
        suggestionName: 'As Complete Residential Unit Count',
        typeSuggestValue: 'As Complete Residential',
        verifySuggest: '0',
        verifyExport: '0'
    },
    {
        suggestionName: 'As Complete Commercial Unit Count',
        typeSuggestValue: 'As Complete Commercial',
        verifySuggest: '1',
        verifyExport: '1'
    },
    {
        suggestionName: 'As Stabilized Condition',
        typeSuggestValue: 'As Stabilized',
        verifySuggest: 'in condition',
        verifyExport: 'in condition'
    }
];

const _baseChipsAsIsAsStabilized = [
    {
        suggestionName: 'Residential Unit Count',
        typeSuggestValue: 'Residentia',
        verifySuggest: '3',
        verifyExport: '3'
    },
    {
        suggestionName: 'Commercial Unit Count',
        typeSuggestValue: 'Commercial Unit',
        verifySuggest: '2',
        verifyExport: '2'
    },
    {
        suggestionName: 'Condition',
        typeSuggestValue: 'Conditio',
        verifySuggest: 'in  condition',
        verifyExport: 'condition'
    }
];

const _asCompletedChips = [ { ..._baseChip, ..._baseChipsAsCompleted } ];
const _asIsAsStabilizedChips = [ { ..._baseChip, ..._baseChipsAsIsAsStabilized } ];

export default {
    reportCreationDataAsIs: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    reportCreationDataAsStablized: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    reportCreationDataAsComplete: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfCommercialUnits: 2,
    numberOfResidentialUnits: 3,
    narrativeSuggestion:"=",
    verifyListValue: "Unchanged Renovations",
    verifyAreaValue: "Upon renovation, the subject unit count and gross building area will remain unchanged.",
    chips: _baseChip,
    asCompletedChips: _asCompletedChips,
    asIsAsStabilizedChips: _asIsAsStabilizedChips
};