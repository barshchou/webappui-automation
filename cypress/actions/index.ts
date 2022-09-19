import * as _BaseActions from "./base";
import * as _IncomeActions from "./income";
import * as _FinalActions from "./final";
import * as _OrganizationActions from "./organization";
import * as _PreviewEditActions from "./preview_edit";
import * as _PropertyActions from "./property";
import * as _ReportActions from "./report";
import * as _DataCollections from "./data_collections";
import _CompPlexActions from "./comp_plex/comp_plex.actions";
/**
 * ernst: refactor this class when it will be necessary
 */
import _ReviewExportActions from "./reviewExport/reviewExport.actions";
import * as _SalesActions from "./sales"; 

export const Base = _BaseActions;
export const Income = _IncomeActions;
export const Final = _FinalActions;
export const Organization = _OrganizationActions;
export const PreviewEdit = _PreviewEditActions;
export const Property = _PropertyActions;
export const Report = _ReportActions;
export const ReviewExport = _ReviewExportActions;
export const Sales = _SalesActions;
export const CompPlex = _CompPlexActions;
export const DataCollections = _DataCollections;