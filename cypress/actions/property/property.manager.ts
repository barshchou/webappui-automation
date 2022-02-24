import summaryActions from "./summary.actions";
import marketActions from "./market.actions";
import historyActions from "./history.actions";
import descriptionActions from "./description.actions";
import siteDescriptionActions from "./siteDescription.actions";
import mapsActions from "./maps.actions";
import utilitiesActions from "./utilities.actions";
import amenitiesActions from "./amenities.actions";
import photosActions from "./photos.actions";
import zoningActions from "./zoning.actions";
import renovationsActions from "./renovations.actions";
import residentialUnitsActions from "./residentialUnits.actions";
import commercialUnitsActions from "./commercialUnits.actions";

export default {
    Summary: summaryActions,
    Market: marketActions,
    History: historyActions,
    Description: descriptionActions,
    SiteDescription: siteDescriptionActions,
    Maps: mapsActions,
    Utilities: utilitiesActions,
    Amenities: amenitiesActions,
    Photos: photosActions,
    Zoning: zoningActions,
    Renovations: renovationsActions,
    ResidentialUnits: residentialUnitsActions,
    CommercialUnits: commercialUnitsActions
};