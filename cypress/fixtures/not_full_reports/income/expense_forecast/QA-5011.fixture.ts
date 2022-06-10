import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../../cypress/enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5011", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});



const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 1,
  };

const _numberOfCommercialUnits = 2;
const _numberOfResidentialUnits = 1;

const rentRollResidentialUnitFixture = () : BoweryReports.ResidentialUnit => {
    return {
            rooms: 5,
            monthlyRent: 400
        };
    };


const _expensesInProFormaByDefaultArray = [
    proFormaTypes.insurace,
    proFormaTypes.electricity,
    proFormaTypes.fuel,
    proFormaTypes.waterAndSewer,
    proFormaTypes.repairAndMaintenance,
    proFormaTypes.payrollBenefits,
    proFormaTypes.generalAndAdministrative,
    proFormaTypes.legalAndProfessional,
    proFormaTypes.miscelaneous,
    proFormaTypes.managementFees,
    proFormaTypes.replacementsAndReserves,
];

const expenseForecastInsuranceFixture = (_basis: "unit" | "sf" ): BoweryReports.ForecastItem => {
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
        forecast: 30
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
        forecast: 30
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
        forecast: 30
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
        forecast: 30
    };
};

const expenseForecastManagementFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "management",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastReservesFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "reserves",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastTotalFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "total",
        basis: _basis as BoweryReports.UnitSF,
    };
};



const expenseForecastcustomFixture = (_basis: "unit" | "sf" ): BoweryReports.ForecastItem => {    // delete????
    return {
    name: "customExpenses[0]",
    basis: _basis as BoweryReports.UnitSF,
    forecast: 30
};
}

const customExpence: BoweryReports.ForecastItem = { // delete????
    name: "customExpence"
}



const expenseForecastFixtureWithUnitArray = [
    expenseForecastInsuranceFixture("unit"),
    expenseForecastElectricityFixture("unit"),
    expenseForecastFuelFixture("unit"),
    expenseForecastWaterAndSewerFixture("unit"),
    expenseForecastRepairsAndMaintenanceFixture("unit"), 
    expenseForecastPayrollAndBenefitsFixture("unit"),
    expenseForecastGeneralAndAdministrativeFixture("unit"),
    expenseForecastLegalAndProfessionalFeesFixture("unit"),
    expenseForecastMiscellaneousFixture("unit"),
    expenseForecastManagementFixture("unit"),
    expenseForecastReservesFixture("unit")
];

const expenseForecastFixtureWithPSFArray = [
    expenseForecastInsuranceFixture("sf"),
    expenseForecastElectricityFixture("sf"),
    expenseForecastFuelFixture("sf"),
    expenseForecastWaterAndSewerFixture("sf"),
    expenseForecastRepairsAndMaintenanceFixture("sf"), 
    expenseForecastPayrollAndBenefitsFixture("sf"),
    expenseForecastGeneralAndAdministrativeFixture("sf"),
    expenseForecastLegalAndProfessionalFeesFixture("sf"),
    expenseForecastMiscellaneousFixture("sf"),
    expenseForecastManagementFixture("sf"),
    expenseForecastReservesFixture("sf")
]; 


const commentariesFixture = () => {
    return {
        generated: "Operating expenses, exclusive of real estate taxes, were forecasted at $0.00 per square foot and $0 per unit. " +
        "Excluding real estate taxes, the comparables ranged from Comp totals map psf min to Comp totals map psf max per square foot and Comp totals map unit min to " +
        "Comp totals map unit max per unit. Our forecast is near the comparable range on both a per square foot and per unit basis, " +
        "as well as logically placed in relation to the historical performance of the asset. Thus, this forecast is " +
        "reasonable and will be applied in our valuation analysis.",
    };
};

const _forecastPSFnotIncluded = '$0.00';
const _forecastPerUnitnotIncluded = '$0';

export default {
    expenseForecastcustomFixture,


    reportCreationData: _reportCreationData,
    customExpence,
    buildingDescription: _buildingDescription,
    expensesInProFormaByDefaultArray: _expensesInProFormaByDefaultArray,
    // expenseForecastInsuranceFixture,
    // expenseForecastElectricityFixture,
     expenseForecastFuelFixture,
     expenseForecastTotalFixture,
    // expenseForecastWaterAndSewerFixture,
    // expenseForecastRepairsAndMaintenanceFixture, 
    // expenseForecastPayrollAndBenefitsFixture,
    // expenseForecastGeneralAndAdministrativeFixture,
    // expenseForecastLegalAndProfessionalFeesFixture,
    // expenseForecastMiscellaneousFixture,
    // expenseForecastManagementFixture,
    // expenseForecastReservesFixture
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    expenseForecastFixtureWithUnitArray,
    expenseForecastFixtureWithPSFArray,
    commentaries: Object.freeze(commentariesFixture()),
    forecastPSFnotIncluded: _forecastPSFnotIncluded,
    forecastPerUnitnotIncluded: _forecastPerUnitnotIncluded,
    rentRollresUnitFixture: rentRollResidentialUnitFixture(),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    
};