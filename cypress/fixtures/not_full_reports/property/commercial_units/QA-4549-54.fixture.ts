import enums from "../../../../enums/enums";
import reportDataCreator from "../../../../fixtures/data_creator/reportData.creator";

const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 2;
const _buildingName = 'Test Building Name QA-4549-54';
const _grossBuildingArea = 5999;
const _siteArea = 735000;
const _currentNumberOfCommercialUnits = 5;
const _currentNumberOfResidentialUnits = 4;

const _baseChip = () => {
    return [
        {
            suggestionName: 'Block',
            typeSuggestValue: 'Bloc',
            verifySuggest: '962',
            verifyExport: '962'
        }, 
        {
            suggestionName: 'Building Name',
            typeSuggestValue: 'Buildin',
            verifySuggest: _buildingName,
            verifyExport: _buildingName
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
            verifySuggest: _grossBuildingArea,
            verifyExport: _grossBuildingArea
        }, 
        {
            suggestionName: 'Site Area',
            typeSuggestValue: 'Sit',
            verifySuggest: _siteArea,
            verifyExport: _siteArea
        }, 
        {
            suggestionName: 'Street Address',
            typeSuggestValue: 'Street',
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
}; 

const _baseChipsAsCompleted = () => {
    return [
        {
            suggestionName: 'Current Residential Unit Count',
            typeSuggestValue: 'Residential',
            verifySuggest: _numberOfCommercialUnits,
            verifyExport: _numberOfCommercialUnits
        },
        {
            suggestionName: 'Current Commercial Unit Count',
            typeSuggestValue: 'Commercial',
            verifySuggest: _numberOfResidentialUnits,
            verifyExport: _numberOfResidentialUnits
        },
        {
            suggestionName: 'Current Condition',
            typeSuggestValue: 'Condition',
            verifySuggest: 'in  condition',
            verifyExport: 'in  condition'
        },
        {
            suggestionName: 'As Complete Residential Unit Count',
            typeSuggestValue: 'Residential',
            verifySuggest: _currentNumberOfResidentialUnits,
            verifyExport: _currentNumberOfResidentialUnits
        },
        {
            suggestionName: 'As Complete Commercial Unit Count',
            typeSuggestValue: 'Commercial',
            verifySuggest: _currentNumberOfCommercialUnits,
            verifyExport: _currentNumberOfCommercialUnits
        },
        {
            suggestionName: 'As Stabilized Condition',
            typeSuggestValue: 'Conditio',
            verifySuggest: 'in  condition',
            verifyExport: 'condition'
        }
    ];
};

const _baseChipsAsIsAsStabilized = () => {
    return [
        {
            suggestionName: 'Residential Unit Count',
            typeSuggestValue: 'Residentia',
            verifySuggest: _numberOfResidentialUnits,
            verifyExport: _numberOfResidentialUnits
        },
        {
            suggestionName: 'Commercial Unit Count',
            typeSuggestValue: 'Commerci',
            verifySuggest: _numberOfCommercialUnits,
            verifyExport: _numberOfCommercialUnits
        },
        {
            suggestionName: 'Condition',
            typeSuggestValue: 'Conditio',
            verifySuggest: 'in  condition',
            verifyExport: 'condition'
        }
    ];
};

const _asIsAsStabilizedChips = _baseChip().concat(_baseChipsAsIsAsStabilized());
const _asCompletedChips = _baseChip().concat(_baseChipsAsCompleted());

export default {
    reportCreationDataAsIs: reportDataCreator.getReportData("4549-54", {
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    reportCreationDataAsStablized: reportDataCreator.getReportData("4549-54", {
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    reportCreationDataAsComplete: reportDataCreator.getReportData("4549-54", {
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfCommercialUnits: _numberOfCommercialUnits,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    asIschips: _asIsAsStabilizedChips,
    asStabilizedChips: _asIsAsStabilizedChips,
    asCompletedChips: _asCompletedChips,
    currentNumberOfCommercialUnits: _currentNumberOfCommercialUnits,
    currentNumberOfResidentialUnits: _currentNumberOfResidentialUnits,
    grossBuildingArea: _grossBuildingArea,
    siteArea: _siteArea,
    buildingName: _buildingName,
};
