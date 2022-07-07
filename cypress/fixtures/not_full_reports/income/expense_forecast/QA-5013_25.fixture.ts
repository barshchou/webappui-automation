import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { Income } from "../../../../actions";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5011_12", {
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

const forecastPSFTotal = (psfToBe: string) => { return `$${psfToBe}`;};
const forecastPerUnitTotal = (perUnitToBe: string) => { return `$${perUnitToBe}`;};

function verifyTOEAppraisersValueLinePSF(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumPSFTOEAppraisersForecast(grossBuildingArea, resUnits, rooms);
    cy.get(`@sumPSFTOEAppraisersForecast`).then(sumPSFTOEAppraisersForecast => {
        Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', forecastPSFTotal(String(sumPSFTOEAppraisersForecast)));
    });
    return this;
}

function verifyTOEAppraisersValueLinePerUnit(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumPerUnitTOEAppraisersForecast(grossBuildingArea, resUnits, rooms);
    cy.get(`@sumPerUnitTOEAppraisersForecast`).then(sumPerUnitTOEAppraisersForecast => {
        Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', forecastPSFTotal(String(sumPerUnitTOEAppraisersForecast)));
    });
    return this;
}

function verifyTOECommentGenerated(grossBuildingArea: number, resUnits = 0, rooms = 0) {
    Income._ExpenseForecastActions.sumsInGeneratedComment(grossBuildingArea, resUnits, rooms);
    cy.get(`@sumPerSFInComment`).then(sumPerSFInComment => {
        cy.get(`@sumPerUnitInComment`).then(sumPerUnitInComment => {
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

const expenseForecastInsuranceFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "insurance",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastElectricityFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "electricity",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 1451.5
    };
};

const expenseForecastFuelFixture = (_basis: "unit" | "room" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "fuel",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 150
    };
};

const expenseForecastWaterAndSewerFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "waterAndSewer",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastRepairsAndMaintenanceFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "repairsAndMaintenance",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 1880
    };
};

const expenseForecastPayrollAndBenefitsFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "payrollAndBenefits",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastGeneralAndAdministrativeFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "generalAndAdministrative",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 543
    };
};

const expenseForecastLegalAndProfessionalFeesFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "legalAndProfessionalFees",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastMiscellaneousFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "miscellaneous",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 123.12
    };
};

const expenseForecastManagementFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "management",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 1
    };
};

const expenseForecastReservesFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "reserves",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 0.58
    };
};

const expenseForecastTotalFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "total",
        basis: _basis as BoweryReports.UnitSF,
    };
};

const expenseForecastFixtureArray = (basis?: "unit" | "sf"): Array<BoweryReports.ForecastItem> => {
    return [ expenseForecastInsuranceFixture(basis),
    expenseForecastElectricityFixture(basis),
    expenseForecastFuelFixture(basis),
    expenseForecastWaterAndSewerFixture(basis),
    expenseForecastRepairsAndMaintenanceFixture(basis),
    expenseForecastPayrollAndBenefitsFixture(basis),
    expenseForecastGeneralAndAdministrativeFixture(basis),
    expenseForecastLegalAndProfessionalFeesFixture(basis),
    expenseForecastMiscellaneousFixture(basis),
    expenseForecastManagementFixture(basis),
    expenseForecastReservesFixture(basis) ];
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
};