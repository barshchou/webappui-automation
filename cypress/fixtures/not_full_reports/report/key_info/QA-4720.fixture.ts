import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4720", {
        templateValue: Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};



export default {
    reportCreationData: reportCreationFixture(),
    chips: [
        {
            suggestionName: 'As Complete Commercial Unit Count',
            typeSuggestValue: 'Commercial',
            verifySuggest: '1',
            verifyExport: '1'
        }, // propertyInformation.commercialUnits.commercialUnitCount
        {
            suggestionName: 'As Complete Residential Unit Count',
            typeSuggestValue: 'Residential',
            verifySuggest: '0',
            verifyExport: '0'
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
            verifySuggest: '962',
            verifyExport: '962'
        }, // block
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
        }, // propertyInformation.commercialUnits.currentCommercialUnitCount
        {
            suggestionName: 'Current Condition',
            typeSuggestValue: 'Condition',
            verifySuggest: 'in  condition',
            verifyExport: 'in  condition'
        },
        {
            suggestionName: 'Current Residential Unit Count',
            typeSuggestValue: 'Residential',
            verifySuggest: '0',
            verifyExport: '0'
        }, // propertyInformation.propertySummary.current.residentialUnitCount
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
        }, // propertyInformation.commercialUnits.commercialSquareFootage
        {
            suggestionName: 'Property Type',
            typeSuggestValue: 'Propert',
            verifySuggest: 'mixed-use',
            verifyExport: 'mixed-use'
        }, // propertyType
        {
            suggestionName: 'Site Area',
            typeSuggestValue: 'Sit',
            verifySuggest: '753,175',
            verifyExport: '753,175'
        }, // propertyInformation.propertySummary.siteArea
        {
            suggestionName: 'Street Address',
            typeSuggestValue: 'Stree',
            verifySuggest: '462 1st Avenue',
            verifyExport: '462 1st Avenue'
        }, // address
        {
            suggestionName: 'Lot',
            typeSuggestValue: 'Lo',
            verifySuggest: '100',
            verifyExport: '100'
        }, // lot
        {
            suggestionName: 'Street Name',
            typeSuggestValue: 'Stree',
            verifySuggest: '1st Avenue',
            verifyExport: '1st Avenue'
        }, // propertyInformation.propertySummary.streetName
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