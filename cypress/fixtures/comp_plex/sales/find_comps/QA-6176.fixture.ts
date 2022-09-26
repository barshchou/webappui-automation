import { CompPlex } from "../../../../types/compplex.type";

const jobSearchFilter: CompPlex.JobSearch.JobFilter = { 
    salePeriod:"lastYear", 
    propertyType:"mixedUse", 
    pricePerUnit:{ min:1000, max:700000 },
    pricePerSF:{ min:200, max:10000 },
    commercialUnits:{ min:2, max:7 },
    residentialUnits:{ min:2, max:7 },
    capRate: { min:1, max: 7 },
    isShowOnlyOnAppJobs: true
};

export default {
    jobSearchFilter
};