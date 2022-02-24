import BaseActions from "../base/base.actions";
import keyInfoPage from "../../pages/report/keyInfo.page";
import {isDateHasCorrectFormat} from "../../../utils/date.utils";
import {getUploadFixture} from "../../../utils/fixtures.utils";

class KeyInfoActions extends BaseActions {
    /**
     * @param {string} purposeValue
     * @returns {KeyInfoActions}
     */
    choosePurpose(purposeValue) {
        keyInfoPage.purposeDropdown.click();
        keyInfoPage.getPurposeOptionByValue(purposeValue).click();
        return this;
    }

    checkAsIsMarketInterestByValue(value) {
        keyInfoPage.asIsMarketInterests.check(value);
        return this;
    }

    checkAsCompleteInterestByValue(value) {
        keyInfoPage.asCompleteInterests.check(value);
        return this;
    }


    checkAsStabilizedInterestByValue(value) {
        keyInfoPage.asStabilizedInterests.check(value);
        return this;
    }

    /**
     * @param {Readonly<{asIsMarket: string, asComplete: string, asStabilized: string}>} interestAppraisedData
     * @returns {KeyInfoActions}
     */
    checkAllInterestAppraisedByValues(interestAppraisedData) {
        this.checkAsIsMarketInterestByValue(interestAppraisedData.asIsMarket)
            .checkAsCompleteInterestByValue(interestAppraisedData.asComplete)
            .checkAsStabilizedInterestByValue(interestAppraisedData.asStabilized);
        return this;
    }

    /**
     *
     * @param {Readonly<{type: string, date: string}>} date
     * @returns {KeyInfoActions}
     */
    enterDateByType(date) {
        keyInfoPage.getDateInputByQA(date.type).clear();
        if (isDateHasCorrectFormat(date.date)) {
            keyInfoPage.getDateInputByQA(date.type).type(date.date).should("have.value", date.date);
        } else {
            keyInfoPage.errorMessage.should("exist");
        }
        return this;
    }

    /**
     * @param {string} fileName
     * @returns {KeyInfoActions}
     */
    uploadFile(fileName) {
        keyInfoPage.cloudButton.should("exist").click();
        keyInfoPage.clickHereText.should("be.visible");
        keyInfoPage.uploadFileInput.should("exist").attachFile(getUploadFixture(fileName));
        keyInfoPage.uploadButton.should("be.visible").click();
        keyInfoPage.insertButton.should("not.be.disabled").click();
        const fileNameSplit = fileName.split("/");
        const fileNameToCheck = fileNameSplit[fileNameSplit.length - 1];
        keyInfoPage.inputToCheckUpload.should("have.value", fileNameToCheck);
        return this;
    }
}

export default new KeyInfoActions();