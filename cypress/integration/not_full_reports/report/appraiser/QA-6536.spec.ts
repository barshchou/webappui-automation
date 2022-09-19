import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report,  } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-6536.fixture";
import { uppercaseFirstLetterEachWord } from '../../../../../utils/string.utils';

describe("The full name of a added third-party inspector is automatically capitalized", 
    { tags:[ "@report", "@appraiser" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-6536]", () => {
            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            testData.inspectorNames.forEach((val, index) => {
                cy.stepInfo(`2. Add External Inspector #${index + 1}`);
                Report._Appraiser.searchAndAddExternalInspector(val.enterValue);
            
                cy.stepInfo("3. Verify the full name of an added third-party inspector is automatically capitalized");
                Report._Appraiser.verifySignCheckbox(val.verifyValue, false);
            });
        });
    });