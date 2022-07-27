import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { Income } from "../../../../actions";
import { Alias } from "../../../../utils/alias.utils";
import expensesForecastCardNamesEnum from "../../../../enums/expense/expensesForecastCardNames.enum";


const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5013_25", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 1,
};

const _numberOfCommercialUnits = 2;
const _numberOfResidentialUnits = 1;

const rentRollResidentialUnitFixture = (): BoweryReports.ResidentialUnit => {
    return {
        rooms: 5,
        monthlyRent: 400
    };
};

const commentariesFixture = (forecastPSFTotal: string, forecastPerUnitTotal: string) => {
    return {
        generated: `Operating expenses, exclusive of real estate taxes, were forecasted at ${forecastPSFTotal} `+
        `per square foot and ${forecastPerUnitTotal} per unit. Excluding real estate taxes, the comparables ` + 
        `ranged from Comp totals map psf min to Comp totals map psf max per square foot and Comp totals ` + 
        `map unit min to Comp totals map unit max per unit. Our forecast is near the comparable range ` + 
        `on both a per square foot and per unit basis, as well as logically placed in relation to the historical ` + 
        `performance of the asset. Thus, this forecast is reasonable and will be applied in our valuation analysis.`
    };
};

const forecastPSFTotal = (psfToBe: string) => { return `$${psfToBe}`; };
const forecastPerUnitTotal = (perUnitToBe: string) => { return `$${perUnitToBe}`; };

function verifyTOEAppraisersValueLinePSF(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumPSFTOEAppraisersForecast(grossBuildingArea, resUnits, rooms);
    cy.get(`@${Alias.expenseForecastAliases.sumPSFTOEAppraisersForecast}`).then(sumPSFTOEAppraisersForecast => {
        Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
            .should('contain', forecastPSFTotal(String(sumPSFTOEAppraisersForecast)));
    });
    return this;
}

function verifyTOEAppraisersValueLinePerUnit(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumPerUnitTOEAppraisersForecast(grossBuildingArea, resUnits, rooms);
    cy.get(`@${Alias.expenseForecastAliases.sumPerUnitTOEAppraisersForecast}`).then(sumPerUnitTOEAppraisersForecast => {
        Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine
            .should('contain', forecastPerUnitTotal(String(sumPerUnitTOEAppraisersForecast)));
    });
    return this;
}

function verifyTOECommentGenerated(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumsInGeneratedComment(grossBuildingArea, resUnits, rooms);
    cy.get(`@${Alias.expenseForecastAliases.sumPerSFInComment}`).then(sumPerSFInComment => {
        cy.get(`@${Alias.expenseForecastAliases.sumPerUnitInComment}`).then(sumPerUnitInComment => {
            let textToBe = commentariesFixture(String(sumPerSFInComment), String(sumPerUnitInComment)).generated;
            Income._ExpenseForecastActions.verifyTOECommentary(textToBe);
        });
    });
    return this;
}

const _expensesInProFormaByDefaultArray = [
    proFormaTypes.insurance,
    proFormaTypes.electricity,
    proFormaTypes.fuel,
    proFormaTypes.waterAndSewer,
    proFormaTypes.repairAndMaintenance,
    proFormaTypes.payrollBenefits,
    proFormaTypes.generalAndAdministrative,
    proFormaTypes.legalAndProfessional,
    proFormaTypes.miscellaneous,
    proFormaTypes.managementFees,
    proFormaTypes.replacementsAndReserves,
];

const expensesForecastCardNamesArray = [
    expensesForecastCardNamesEnum.insurance,
    expensesForecastCardNamesEnum.electricity,
    expensesForecastCardNamesEnum.fuel,
    expensesForecastCardNamesEnum.waterAndSewer,
    expensesForecastCardNamesEnum.repairAndMaintenance,
    expensesForecastCardNamesEnum.payrollBenefits,
    expensesForecastCardNamesEnum.generalAndAdministrative,
    expensesForecastCardNamesEnum.legalAndProfessional,
    expensesForecastCardNamesEnum.miscellaneous,
    expensesForecastCardNamesEnum.managementFees,
    expensesForecastCardNamesEnum.replacementsAndReserves,
];

const expenseForecastFixture = (_name: BoweryReports.ForecastItemBasis | string, 
    basis: "unit" | "sf" | "room", forecast: number): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: basis as BoweryReports.UnitSF,
        forecast: forecast
    };
};

const expenseForecastFuelFixture = (basis: "unit" | "room" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "fuel",
        basis: basis as BoweryReports.UnitSF,
        forecast: 150
    };
};

const expenseForecastTotalFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "total",
        basis: _basis as BoweryReports.UnitSF,
    };
};

const expenseForecastFixtureArray = (basis?: "unit" | "sf"): Array<BoweryReports.ForecastItem> => {
    return [
        expenseForecastFixture('insurance', basis, 30),
        expenseForecastFixture("electricity", basis, 1451.5),
        expenseForecastFixture("fuel", basis, 150),
        expenseForecastFixture("waterAndSewer", basis, 30),
        expenseForecastFixture("repairsAndMaintenance", basis, 1880),
        expenseForecastFixture("payrollAndBenefits", basis, 30),
        expenseForecastFixture("generalAndAdministrative", basis, 543),
        expenseForecastFixture("legalAndProfessionalFees", basis, 30),
        expenseForecastFixture("miscellaneous", basis, 123.12),
        expenseForecastFixture("management", basis, 1),
        expenseForecastFixture("reserves", basis, 0.58)
    ];
};

export default {
    reportCreationData: _reportCreationData,
    buildingDescription: _buildingDescription,
    expensesInProFormaByDefaultArray: _expensesInProFormaByDefaultArray,
    expenseForecastFuelFixture,
    expenseForecastTotalFixture,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    expenseForecastFixtureArray,
    commentaries: Object.freeze(commentariesFixture),
    forecastPSFTotal,
    forecastPerUnitTotal,
    rentRollResUnitFixture: rentRollResidentialUnitFixture(),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    verifyTOECommentGenerated,
    verifyTOEAppraisersValueLinePSF,
    verifyTOEAppraisersValueLinePerUnit,
    expensesForecastCardNamesArray
};