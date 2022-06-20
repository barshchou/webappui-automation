import { loginAction } from "../../../../../actions/base/baseTest.actions";

describe("Test suite", () => {
    before("Login, create report", () => {
        loginAction();
    });

    it("Test body", () => {
        //test something
    });
});