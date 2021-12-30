const DEFAULT_WAIT_TIME = 7000;

/**
 * Due to WEB-3873 bug we have to wait for some time before creating new report
 * @param {number} timeInMilisec
 */
export const waitForTime = (timeInMilisec = DEFAULT_WAIT_TIME) => {
    cy.wait(timeInMilisec);
};