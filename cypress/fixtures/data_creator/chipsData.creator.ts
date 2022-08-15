import enums from "../../enums/enums";
import { BoweryReports } from "../../types/boweryReports.type";
import { numberWithCommas } from "../../../utils/numbers.utils";

class Chips {

    private _numberOfCommercialUnits: number;

    private _numberOfResidentialUnits: number;

    private _buildingName: string;

    private _grossBuildingArea: string | number;

    private _siteArea: string | number;

    private _currentNumberOfCommercialUnits: number;

    private _currentNumberOfResidentialUnits: number;

    private _block: string;

    private _streetAddress: string;

    private _lotValue: string;

    private _streetName = '1st Avenue';

    setNumberOfCommercialUnits(numberOfCommercialUnits?: number) {
        this._numberOfCommercialUnits = numberOfCommercialUnits ?? 1;
        return this;
    }

    setNumberOfResidentialUnits(residentialUnits?: number) {
        this._numberOfResidentialUnits = residentialUnits ?? 0;
        return this;
    }

    setBuildingName(buildingName?: string) {
        this._buildingName = buildingName ?? "";
        return this;
    }

    setGrossBuildingArea(grossBuildingArea?: number) {
        const grossBuildingAreaValue = grossBuildingArea ?? "2,124,441";
        this._grossBuildingArea = typeof grossBuildingAreaValue === "string" 
            ? grossBuildingAreaValue 
            : numberWithCommas(grossBuildingArea);
        return this;
    }

    setSiteArea(siteArea?: number) {
        const siteAreaValue = siteArea ?? "753,175";
        this._siteArea = typeof siteAreaValue === "string" ? siteAreaValue : numberWithCommas(siteArea);
        return this;
    }

    setCurrentNumberOfCommercialUnits(currentCommercialUnit?: number) {
        this._currentNumberOfCommercialUnits = currentCommercialUnit ?? 5;
        return this;
    }

    setCurrentNumberOfResidentialUnits(currentResidentialUnits?: number) {
        this._currentNumberOfResidentialUnits = currentResidentialUnits ?? 4;
        return this;
    }

    setBlock(block?: string) {
        this._block = block ?? "962";
        return this;
    }

    setStreetAddress(streetAddress?: string) {
        this._streetAddress = streetAddress ?? "462 1st Avenue";
        return this;
    }

    setLotValue(lot?: string) {
        this._lotValue = lot ?? "100";
        return this;
    }

    setStreetName(streetName?: string) {
        this._streetName = streetName ?? "1st Avenue";
        return this;
    }

    build(valueConclusion: BoweryReports.ConclusionValue = enums.VALUE_CONCLUSION_TYPE.AS_IS) {
        return valueConclusion === enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE 
            ? this.asCompletedChips() 
            : this.asIsAsStabilizedChips();
    }

    getChipsData(options?: BoweryReports.ChipsCreationOptions, valueConclusion?: BoweryReports.ConclusionValue) {
               
        options?.block == undefined 
            ? this.setBlock() 
            : this.setBlock(options.block);
        options?.buildingName == undefined 
            ? this.setBuildingName() 
            : this.setBuildingName(options.buildingName);
        options?.grossBuildingArea == undefined 
            ? this.setGrossBuildingArea() 
            : this.setGrossBuildingArea(options.grossBuildingArea);
        options?.lotValue == undefined 
            ? this.setLotValue() 
            : this.setLotValue(options.lotValue);
        options?.numberOfCommercialUnits == undefined 
            ? this.setNumberOfCommercialUnits() 
            : this.setNumberOfCommercialUnits(options.numberOfCommercialUnits);
        options?.numberOfResidentialUnits == undefined 
            ? this.setNumberOfResidentialUnits() 
            : this.setNumberOfResidentialUnits(options.numberOfResidentialUnits);
        options?.siteArea == undefined 
            ? this.setSiteArea() 
            : this.setSiteArea(options.siteArea);
        options?.streetAddress == undefined 
            ? this.setStreetAddress() 
            : this.setStreetAddress(options.streetAddress);
        options?.streetName == undefined 
            ? this.setStreetName() 
            : this.setStreetName(options.streetName);
        options?.currentCommercialUnits == undefined 
            ? this.setCurrentNumberOfCommercialUnits() 
            : this.setCurrentNumberOfCommercialUnits(options.currentCommercialUnits);
        options?.currentResidentialUnits == undefined 
            ? this.setCurrentNumberOfResidentialUnits() 
            : this.setCurrentNumberOfResidentialUnits(options.currentResidentialUnits);
        
        return this.build(valueConclusion);
    }

    baseChip() {
        return [
            {
                suggestionName: 'Block',
                typeSuggestValue: 'Bloc',
                verifySuggest: this._block,
                verifyExport: this._block
            }, 
            {
                suggestionName: 'Building Name',
                typeSuggestValue: 'Buildin',
                verifySuggest: this._buildingName,
                verifyExport: this._buildingName
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
                verifySuggest: "The above transaction reflects a foreclosure sale of the property. " + 
                "Typically in a foreclosure sale, the buyer assumes all encumbrances on the site, " + 
                "including any outstanding mortgage amount and legal fees (\"upset costs\"), " + 
                "delinquent taxes and water and sewer charges, foreclosure sale fee, and realty " + 
                "transfer taxes. This information was requested from the owner; however, not provided.",
                verifyExport: 'foreclosure sale'
            }, 
            {
                suggestionName: 'Sheriff\'s Sale',
                typeSuggestValue: 'Sherri',
                verifySuggest: "The above transaction reflects a Sheriff's sale of the property. Typically in a " +
                "Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage "+
                "amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, " +
                "Sheriff's sale fee, and realty transfer taxes. This information was requested from the " +
                "owner; however, not provided.",
                verifyExport: "The above transaction reflects a Sheriff's sale of the property. " +
                "Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any " +
                "outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and " +
                "sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was " +
                "requested from the owner; however, not provided."
            },
            {
                suggestionName: 'Gross Building Area',
                typeSuggestValue: 'Gros',
                verifySuggest: this._grossBuildingArea,
                verifyExport: this._grossBuildingArea
            }, 
            {
                suggestionName: 'Site Area',
                typeSuggestValue: 'Sit',
                verifySuggest: this._siteArea,
                verifyExport: this._siteArea
            }, 
            {
                suggestionName: 'Street Address',
                typeSuggestValue: 'Street',
                verifySuggest: this._streetAddress,
                verifyExport: this._streetAddress
            },
            {
                suggestionName: 'Lot',
                typeSuggestValue: 'Lo',
                verifySuggest: this._lotValue,
                verifyExport: this._lotValue
            },  
            {
                suggestionName: 'Street Name',
                typeSuggestValue: 'Stree',
                verifySuggest: this._streetName,
                verifyExport: this._streetName
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
    }

    baseChipsAsCompleted = () => {
        return [
            {
                suggestionName: 'Current Residential Unit Count',
                typeSuggestValue: 'Residential',
                verifySuggest: this._numberOfResidentialUnits,
                verifyExport: this._numberOfResidentialUnits
            },
            {
                suggestionName: 'Current Commercial Unit Count',
                typeSuggestValue: 'Commercial',
                verifySuggest: this._numberOfCommercialUnits,
                verifyExport: this._numberOfCommercialUnits
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
                verifySuggest: this._currentNumberOfResidentialUnits,
                verifyExport: this._currentNumberOfResidentialUnits
            },
            {
                suggestionName: 'As Complete Commercial Unit Count',
                typeSuggestValue: 'Commercial',
                verifySuggest: this._currentNumberOfCommercialUnits,
                verifyExport: this._currentNumberOfCommercialUnits
            },
            {
                suggestionName: 'As Stabilized Condition',
                typeSuggestValue: 'Conditio',
                verifySuggest: 'in  condition',
                verifyExport: 'condition'
            }
        ];
    };
    
    baseChipsAsIsAsStabilized = () => {
        return [
            {
                suggestionName: 'Residential Unit Count',
                typeSuggestValue: 'Residentia',
                verifySuggest: this._numberOfResidentialUnits,
                verifyExport: this._numberOfResidentialUnits
            },
            {
                suggestionName: 'Commercial Unit Count',
                typeSuggestValue: 'Commerci',
                verifySuggest: this._numberOfCommercialUnits,
                verifyExport: this._numberOfCommercialUnits
            },
            {
                suggestionName: 'Condition',
                typeSuggestValue: 'Conditio',
                verifySuggest: 'in  condition',
                verifyExport: 'condition'
            }
        ];
    };

    asIsAsStabilizedChips() {
        return this.baseChip().concat(this.baseChipsAsIsAsStabilized());
    }

    asCompletedChips() {
        return this.baseChip().concat(this.baseChipsAsCompleted());
    }
}

export default new Chips();
