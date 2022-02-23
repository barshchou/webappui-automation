import BaseActions from "../base/base.actions";
import residentialUnitsPage from "../../pages/property/residentialUnits.page";

class ResidentialUnitsActions extends BaseActions{

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseKitchenCondition(value) {
        residentialUnitsPage.kitchenConditionRadio.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     * @private
     * @param {string} value
     */
    verifyRadioIsChecked(value) {
        residentialUnitsPage.getElementToCheckRadio(value).should("exist");
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseKitchenFlooring(value) {
        residentialUnitsPage.kitchenFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseCounterTops(value) {
        residentialUnitsPage.counterTops.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseCabinetry(value) {
        residentialUnitsPage.cabinetry.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseStovetops(value) {
        residentialUnitsPage.stovetops.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseRefrigerators(value) {
        residentialUnitsPage.refrigerators.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, counterTops: string, cabinetry: string, stovetops: string,
     * refrigerators: string}>} kitchenConditionData
     * @returns {ResidentialUnitsActions}
     */
    fillKitchenDescription(kitchenConditionData) {
        this.chooseKitchenCondition(kitchenConditionData.condition)
            .chooseKitchenFlooring(kitchenConditionData.flooring)
            .chooseCounterTops(kitchenConditionData.counterTops)
            .chooseCabinetry(kitchenConditionData.cabinetry)
            .chooseStovetops(kitchenConditionData.stovetops)
            .chooseRefrigerators(kitchenConditionData.refrigerators);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, counterTops: string, cabinetry: string, stovetops: string,
     * refrigerators: string}>} bathroomConditionData
     * @returns {ResidentialUnitsActions}
     */
    verifyKitchenConditionCommentary(bathroomConditionData) {
        const commentaryObject = {
            condition: bathroomConditionData.condition.toLowerCase(),
            flooring: bathroomConditionData.flooring.toLowerCase(),
            counterTops: bathroomConditionData.counterTops.toLowerCase(),
            cabinetry: bathroomConditionData.cabinetry.toLowerCase(),
            stovetops: bathroomConditionData.stovetops.replace("/", " ").toLowerCase(),
            refrigerators: bathroomConditionData.refrigerators.toLowerCase()
        };
        residentialUnitsPage.kitchenConditionCommentary.should("have.text",
            this.getKitchenConditionCommentary(commentaryObject));
        return this;
    }

    /**
     * @private
     * @param {{condition: string, flooring: string, counterTops: string, cabinetry: string, stovetops: string,
     * refrigerators: string}} bathroomConditionData
     * @returns {string}
     */
    getKitchenConditionCommentary(bathroomConditionData) {
        return `The units will feature ${bathroomConditionData.condition} ` +
            "quality kitchen finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${bathroomConditionData.flooring} flooring, ${bathroomConditionData.counterTops} ` +
            `counter tops, ${bathroomConditionData.cabinetry} cabinets, ${bathroomConditionData.stovetops} stovetops,` +
            ` and ${bathroomConditionData.refrigerators} refrigerators.`;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseBathroomCondition(value) {
        residentialUnitsPage.bathroomCondition.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseBathroomFlooring(value) {
        residentialUnitsPage.bathroomFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseBathroomTub(value) {
        residentialUnitsPage.bathroomTub.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseSink(value) {
        residentialUnitsPage.sink.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseToilet(value) {
        residentialUnitsPage.toilet.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, tub: string, sink: string, toilet: string}>} bathroomConditionData
     * @returns {ResidentialUnitsActions}
     */
    fillBathroomDescription(bathroomConditionData) {
        this.chooseBathroomCondition(bathroomConditionData.condition)
            .chooseBathroomFlooring(bathroomConditionData.flooring)
            .chooseBathroomTub(bathroomConditionData.tub)
            .chooseSink(bathroomConditionData.sink)
            .chooseToilet(bathroomConditionData.toilet);
        return this;
    }
    /**
     * @param {Readonly<{condition: string, flooring: string, tub: string, sink: string, toilet: string}>} bathroomConditionData
     * @returns {ResidentialUnitsActions}
     */
    verifyBathroomCommentary(bathroomConditionData) {
        const commentaryObject = {
            condition: bathroomConditionData.condition.toLowerCase(),
            flooring: bathroomConditionData.flooring.toLowerCase(),
            tub: bathroomConditionData.tub.replace("/", " ").replace("-", " ").toLowerCase(),
            sink: bathroomConditionData.sink.replace("-", " ").toLowerCase(),
            toilet: bathroomConditionData.toilet.replace("-", " ").toLowerCase()
        };
        residentialUnitsPage.bathroomConditionCommentary.should("have.text",
            this.getBathroomCommentary(commentaryObject));
        return this;
    }

    /**
     * @private
     * @param {{condition: string, flooring: string, tub: string, sink: string, toilet: string}} bathroomConditionData
     * @returns {string}
     */
    getBathroomCommentary(bathroomConditionData) {
        return `The units will feature ${bathroomConditionData.condition} quality bathroom finishes relative to typical ` +
            `units in similar walk-up buildings in the subject's area. The units will contain ${bathroomConditionData.flooring} flooring,` +
            ` ${bathroomConditionData.tub} tubs, ${bathroomConditionData.sink} sinks, and ${bathroomConditionData.toilet} toilets.`;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseBedroomCondition(value) {
        residentialUnitsPage.bedroomCondition.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseBedroomFlooring(value) {
        residentialUnitsPage.bedroomFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseBedroomWalls(value) {
        residentialUnitsPage.bedroomWalls.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, walls: string}>} bedroomConditionData
     * @returns {ResidentialUnitsActions}
     */
    fillBedroomDescription(bedroomConditionData) {
        this.chooseBedroomCondition(bedroomConditionData.condition)
            .chooseBedroomFlooring(bedroomConditionData.flooring)
            .chooseBedroomWalls(bedroomConditionData.walls);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, walls: string}>} bedroomConditionData
     * @returns {ResidentialUnitsActions}
     */
    verifyBedroomCommentary(bedroomConditionData) {
        const commentaryObject = {
            condition: bedroomConditionData.condition.toLowerCase(),
            flooring: bedroomConditionData.flooring.toLowerCase(),
            walls: bedroomConditionData.walls.replace("-", " ").toLowerCase()
        };
        residentialUnitsPage.bedroomCommentary.should("have.text", this.getBedroomCommentary(commentaryObject));
        return this;
    }

    /**
     * @private
     * @param {{condition: string, flooring: string, walls: string}} bedroomConditionData
     * @returns {string}
     */
    getBedroomCommentary(bedroomConditionData) {
        return `The units will feature ${bedroomConditionData.condition} quality ` +
            "bedroom finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${bedroomConditionData.flooring} flooring, and ${bedroomConditionData.walls} walls.`;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseLivingRoomCondition(value) {
        residentialUnitsPage.livingRoomCondition.check(value);
        this.verifyRadioIsChecked(value);
        return  this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseLivingRoomFlooring(value) {
        residentialUnitsPage.livingRoomFlooring.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseLivingRoomWalls(value) {
        residentialUnitsPage.livingRoomWalls.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, walls: string}>} livingRoomConditionData
     * @returns {ResidentialUnitsActions}
     */
    fillLivingRoomDescription(livingRoomConditionData) {
        this.chooseLivingRoomCondition(livingRoomConditionData.condition)
            .chooseLivingRoomFlooring(livingRoomConditionData.flooring)
            .chooseLivingRoomWalls(livingRoomConditionData.walls);
        return this;
    }

    /**
     *
     * @param {Readonly<{condition: string, flooring: string, walls: string}>} livingRoomCondition
     * @returns {ResidentialUnitsActions}
     */
    verifyLivingRoomCommentary(livingRoomCondition) {
        const commentaryObject = {
            condition: livingRoomCondition.condition.toLowerCase(),
            flooring: livingRoomCondition.flooring.toLowerCase(),
            walls: livingRoomCondition.walls.replace("-", " ").toLowerCase()
        };
        residentialUnitsPage.livingRoomCommentary.should("have.text", this.getLivingRoomCommentary(commentaryObject));
        return this;
    }

    /**
     * @private
     * @param {{condition: string, flooring: string, walls: string}} livingRoomCondition
     * @returns {string}
     */
    getLivingRoomCommentary(livingRoomCondition) {
        return `The units will feature ${livingRoomCondition.condition} quality ` +
            "living room finishes relative to typical units in similar walk-up buildings in the subject's area. " +
            `The units will contain ${livingRoomCondition.flooring} flooring, and ${livingRoomCondition.walls} walls.`;
    }


    /**
     *
     * @param {number | string} number
     * @returns {ResidentialUnitsActions}
     */
    enterNumberOfStairs(number) {
        residentialUnitsPage.numberOfStairsInput.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseStairsStart(value) {
        residentialUnitsPage.stairsStart.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ResidentialUnitsActions}
     */
    chooseStairsEnd(value) {
        residentialUnitsPage.stairsEnd.check(value);
        this.verifyRadioIsChecked(value);
        return this;
    }

    /**
     *
     * @param {Readonly<{numberOfStairs: string | number, stairsStart: string, stairsEnd: string}>} stairsData
     * @returns {ResidentialUnitsActions}
     */
    fillStairsDescription(stairsData) {
        this.enterNumberOfStairs(stairsData.numberOfStairs)
            .chooseStairsStart(stairsData.stairsStart)
            .chooseStairsEnd(stairsData.stairsEnd);
        return this;
    }

    /**
     *
     * @param {string} newCommentary
     * @returns {ResidentialUnitsActions}
     */
    editStairsCommentary(newCommentary) {
        residentialUnitsPage.stairsCommentaryEditButton.click();
        residentialUnitsPage.stairsCommentaryInput.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }
}

export default new ResidentialUnitsActions();
