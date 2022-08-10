import enums from "../../../../enums/enums";

const _newCompPropertyInfoData = {
    gba: "100",
    yearBuild:"2000",
    floors: "2",
    siteArea: "100",
    residentialUnits: "2",
    buildingType: enums.COMPPLEX_ENUM._propertyInfoEnum.buildingType.elevator
};

const _newCompSaleInfoData = {
    buyerGrantee: "Test and CO",
    sellerGrantor: "Test inc",
    saleStatus: enums.SALE_STATUSES.transaction,
    deedSalePrice: "10000"
};

const _textValues = [
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ` + 
    `industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ` + 
    `and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ` + 
    `leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s ` + 
    `with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop ` + 
    `publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    "42", 
    "%&#*($#(*!@)$#", 
    "test", 
];

export default {
    condition: enums.CONDITION_VALUES.shell,
    comparableType: enums.COMPARABLE_TYPES.multifamily,
    _textValues,
    _newCompPropertyInfoData,
    _newCompSaleInfoData
};