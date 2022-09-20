import routesUtils from "./routes.utils";
import Enums from "../enums/enums";

const routes = {
    subjectProperty: `${routesUtils.subjectPropertyData}`,
    siteDetails: `${routesUtils.subjectPropertyData}#${Enums.SUBJECT_PROPERTY_DATA_SECTIONS.siteDetails}`,
    propertyDescription: `${routesUtils.subjectPropertyData}#${Enums
        .SUBJECT_PROPERTY_DATA_SECTIONS.propertyDescription}`,
    propertyHistory: `${routesUtils.subjectPropertyData}#${Enums.SUBJECT_PROPERTY_DATA_SECTIONS.propertyHistory}`,
    propertyPhotos: `${routesUtils.subjectPropertyData}#${Enums.SUBJECT_PROPERTY_DATA_SECTIONS.propertyPhotos}`
} as const;

export default routes;