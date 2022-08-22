import { CompPlex } from "../../../../types/compplex.type";

const jobSearchFilter: CompPlex.JobSearch.JobFilter = { 
    salePeriod:"lastYear", 
    propertyType:"mixedUse", 
    pricePerUnit:{ max:700000 },
    pricePerSF:{ min:200 },
    commercialUnits:{ min:2, max:5 },
    residentialUnits:{ min:2, max:5 },
    capRate: { min:1, max: 7 },
    isShowOnlyOnAppJobs: true
};

export default {
    jobSearchFilter
};