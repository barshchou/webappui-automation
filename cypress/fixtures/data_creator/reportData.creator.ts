import Enums from "../../enums/enums";

let ReportCreationData = function (address, isSalesForcePull = false, number, templateValue, incomeValue, conclusionValue) {
    this.address = address;
    this.isSalesForcePull = isSalesForcePull,
    this.reportNumber = number;
    this.templateValue = templateValue;
    this.incomeValue = incomeValue;
    this.conclusionValue = conclusionValue;
};

class ReportCreator {

    address: string;

    isSalesForcePull: boolean;

    reportNumber: string;

    templateValue: string;

    incomeValue: string;

    conclusionValue: string;

    setSalesForcePull(isSalesForcePull: BoweryReports.isSalesForcePull) {
        this.isSalesForcePull = isSalesForcePull;
        return this;
    }

    setAddress(address?) {
        this.address = address ?? "462 1st Avenue, New York, USA";
        return this;
    }

    setReportNumber(testNumber: string, isSaleForcePull?: BoweryReports.isSalesForcePull) {
        this.isSalesForcePull = (isSaleForcePull == undefined ? false : isSaleForcePull);
        this.reportNumber = this.isSalesForcePull ? `${testNumber}` : `TestAutoReport-QA-${testNumber}`;
        return this;
    }

    setTemplateValue(templateValue?) {
        this.templateValue = templateValue ?? Enums.TEMPLATE_TYPE.FREDDIE_MAC;
        return this;
    }

    setIncomeValue(incomeValue?) {
        this.incomeValue = incomeValue ?? Enums.INCOME_TYPE.RESIDENTIAL;
        return this;
    }

    setConclusionValue(conclusionValue?: BoweryReports.ConclusionValue | string) {
        this.conclusionValue = conclusionValue ?? Enums.VALUE_CONCLUSION_TYPE.AS_IS;
        return this;
    }

    build() {
        return new
        ReportCreationData(this.address, this.isSalesForcePull, this.reportNumber, this.templateValue, this.incomeValue, this.conclusionValue);
    }

    getReportData(testNumber: string, isSaleForcePull = false, options?: BoweryReports.ReportCreationOptions){
        this.isSalesForcePull = isSaleForcePull;

        if(options?.incomeValue){
            this.setIncomeValue(options.incomeValue);
        }
        
        if(options?.conclusionValue){
            this.setConclusionValue(options.conclusionValue);
        }
        if(options?.isSalesForcePull){
            this.isSalesForcePull = options.isSalesForcePull;
        }
        return this.setReportNumber(testNumber, this.isSalesForcePull).setAddress().setTemplateValue().build();
    }
}

export default new ReportCreator();