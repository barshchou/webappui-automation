import BaseActions from "../base/base.actions";
import keyInfoPage from "../../pages/report/keyInfo.page";
import {isDateHasCorrectFormat} from "../../../utils/date.utils";

class KeyInfoActions extends BaseActions {
    choosePurpose(purposeValue) {
        keyInfoPage.purposeDropdown.click();
        keyInfoPage.getPurposeOptionByValue(purposeValue).click();
    }

    checkAsIsMarketInterestByValue(value) {
        keyInfoPage.asIsMarketInterests.check(value);
    }

    checkAsCompleteInterestByValue(value) {
        keyInfoPage.asCompleteInterests.check(value);
    }


    checkAsStabilizedInterestByValue(value) {
        keyInfoPage.asStabilizedInterests.check(value);
    }

    checkAllInterestAppraisedByValues(values) {
        this.checkAsIsMarketInterestByValue(values[0]);
        this.checkAsCompleteInterestByValue(values[1]);
        this.checkAsStabilizedInterestByValue(values[2]);
    }

    enterDateByType(date, dateType) {
        keyInfoPage.getDateInputByQA(dateType).clear();
        if (isDateHasCorrectFormat(date)) {
            keyInfoPage.getDateInputByQA(dateType).type(date).should("have.value", date);
        } else {
            keyInfoPage.errorMessage.should("exist");
        }
    }

    uploadFile(fileName) {
        keyInfoPage.cloudButton.should("exist").click();
        keyInfoPage.clickHereText.should("be.visible");
        keyInfoPage.uploadFileInput.should("exist").attachFile({filePath: fileName, encoding: "base64"});
        keyInfoPage.uploadButton.should("be.visible").click();
        keyInfoPage.insertButton.should("not.be.disabled").click();
        keyInfoPage.inputToCheckUpload.should("have.value", fileName);
    }
}

export default new KeyInfoActions();