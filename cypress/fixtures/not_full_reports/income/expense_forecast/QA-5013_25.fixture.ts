import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { Income } from "../../../../actions";
import { Alias } from "../../../../utils/alias.utils";


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
        generated: `Operating expenses, exclusive of real estate taxes, were forecasted at ${forecastPSFTotal} per square foot and ${forecastPerUnitTotal} per unit. ` +
            `Excluding real estate taxes, the comparables ranged from Comp totals map psf min to Comp totals map psf max per square foot and Comp totals map unit min to ` +
            `Comp totals map unit max per unit. Our forecast is near the comparable range on both a per square foot and per unit basis, ` +
            `as well as logically placed in relation to the historical performance of the asset. Thus, this forecast is ` +
            `reasonable and will be applied in our valuation analysis.`,
    };
};

const forecastPSFTotal = (psfToBe: string) => { return psfToBe === '0' ? '$0.00' : `$${psfToBe}`; };
const forecastPerUnitTotal = (perUnitToBe: string) => { return perUnitToBe === '0' ? '$0' : `$${perUnitToBe}`; };

function verifyTOEAppraisersValueLinePSF(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumPSFTOEAppraisersForecast(grossBuildingArea, resUnits, rooms);
    cy.get(`@${Alias.expenceForecastAliases.sumPSFTOEAppraisersForecast}`).then(sumPSFTOEAppraisersForecast => {
        Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', forecastPSFTotal(String(sumPSFTOEAppraisersForecast)));
    });
    return this;
}

function verifyTOEAppraisersValueLinePerUnit(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumPerUnitTOEAppraisersForecast(grossBuildingArea, resUnits, rooms);
    cy.get(`@${Alias.expenceForecastAliases.sumPerUnitTOEAppraisersForecast}`).then(sumPerUnitTOEAppraisersForecast => {
        Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', forecastPerUnitTotal(String(sumPerUnitTOEAppraisersForecast)));
    });
    return this;
}

function verifyTOECommentGenerated(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumsInGeneratedComment(grossBuildingArea, resUnits, rooms);
    cy.get(`@${Alias.expenceForecastAliases.sumPerSFInComment}`).then(sumPerSFInComment => {
        cy.get(`@${Alias.expenceForecastAliases.sumPerUnitInComment}`).then(sumPerUnitInComment => {
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

const expenseForecastInsuranceFixtureUltimate = (fixture: BoweryReports.ForecastItem, _basis: "unit" | "sf" | "room"): BoweryReports.ForecastItem => {
    return {
        name: fixture.name,
        basis: _basis as BoweryReports.UnitSF,
        forecast: fixture.forecast
    };
};

const expenseForecastInsuranceFixture: BoweryReports.ForecastItem = {
        name: "insurance",
        forecast: 30
};

const expenseForecastElectricityFixture: BoweryReports.ForecastItem = {
        name: "electricity",
        forecast: 1451.5
};

const expenseForecastFuelFixture: BoweryReports.ForecastItem = {
        name: "fuel",
        forecast: 150
};

const expenseForecastWaterAndSewerFixture: BoweryReports.ForecastItem = {
        name: "waterAndSewer",
        forecast: 30
};

const expenseForecastRepairsAndMaintenanceFixture: BoweryReports.ForecastItem = {
        name: "repairsAndMaintenance",
        forecast: 1880
};

const expenseForecastPayrollAndBenefitsFixture: BoweryReports.ForecastItem = {
        name: "payrollAndBenefits",
        forecast: 30
};

const expenseForecastGeneralAndAdministrativeFixture: BoweryReports.ForecastItem = {
        name: "generalAndAdministrative",
        forecast: 543
};

const expenseForecastLegalAndProfessionalFeesFixture: BoweryReports.ForecastItem = {
        name: "legalAndProfessionalFees",
        forecast: 30
};

const expenseForecastMiscellaneousFixture: BoweryReports.ForecastItem = {
        name: "miscellaneous",
        forecast: 123.12
};

const expenseForecastManagementFixture: BoweryReports.ForecastItem = {
        name: "management",
        forecast: 1
};

const expenseForecastReservesFixture: BoweryReports.ForecastItem = {
        name: "reserves",
        forecast: 0.58
};

const expenseForecastTotalFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "total",
        basis: _basis as BoweryReports.UnitSF,
    };
};

const expenseForecastFixtureArray = (): Array<BoweryReports.ForecastItem> => {
    return [ expenseForecastInsuranceFixture,
    expenseForecastElectricityFixture,
    expenseForecastFuelFixture,
    expenseForecastWaterAndSewerFixture,
    expenseForecastRepairsAndMaintenanceFixture,
    expenseForecastPayrollAndBenefitsFixture,
    expenseForecastGeneralAndAdministrativeFixture,
    expenseForecastLegalAndProfessionalFeesFixture,
    expenseForecastMiscellaneousFixture,
    expenseForecastManagementFixture,
    expenseForecastReservesFixture ];
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
    expenseForecastInsuranceFixtureUltimate,
};