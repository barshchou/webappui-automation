class LaunchDarkly {
  private readonly apiKey = '';

  private readonly projectKey = 'default';

  private environmentKey = 'staging'

  private featureFlagKey = '';

  private userId = 'mikita.radzkou@boweryvaluation.com';

  // constructor(config?) {
  //   this.apiKey = config.apiKey;
  //   this.projectKey = config.projectKey;
  //   this.environmentKey = config.environmentKey;
  // }

  getFeatureFlag(featureFlagKey) {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
      headers: {
        'content-type': 'application/json',
          Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829',
      }
    }).then(resp => {
      const targets = resp.body.environments[this.environmentKey].targets;
      const existingUserTargetIndex = targets.findIndex(target => target.values);
      cy.log("targets ---> ", targets);
      cy.log("existingUserTargetIndex ---> ", existingUserTargetIndex);
      cy.log(resp.body);
    }).as("getFeatureFlag");
  }

  getFeatureFlags() {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}`,
      headers: {
        'content-type': 'application/json',
        Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829'
      },
    }).then(resp => {
      cy.log(resp);
    }).as("getFeatureFlags");
  }

  setFeatureFlagForUser(featureFlagKey, userId, variationIndex) {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
      headers: {
        'content-type': 'application/json',
          Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829',
      }
    }).then(resp => {
      const targets = resp.body.environments[this.environmentKey].targets;
      const existingTargetIndex = targets.findIndex(target => target.variation === variationIndex);
      if (existingTargetIndex === -1) {
        cy.log(
          "Adding new target for feature flag '%s' variation %d with single user %s",
          featureFlagKey,
          variationIndex,
          userId,  
        );

        const jsonPatch = {
          op: 'add',
          path: `/environments/${this.environmentKey}/targets/-`,
          value: {
            variation: variationIndex,
            values: [ userId ],
          },
        };

        cy.request({
          method: "PATCH",
          url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829'
          },
          body: JSON.stringify({
            patch: [ jsonPatch ]
          })
        });
      } else {
        const existingTarget = targets[existingTargetIndex];
        cy.log(
          'Adding user %s to the existing target %o',
          userId,
          existingTarget,
        );

        const jsonPatch = {
          op: 'add',
          path: `/environments/${this.environmentKey}/targets/${existingTargetIndex}/values/-`,
          value: userId,
        };

        cy.request({
          method: "PATCH",
          url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829'
          },
          body: JSON.stringify({
            patch: [ jsonPatch ]
          })
        }); 
      }
      cy.log(`Set ${featureFlagKey} feature flag`);
    });
  }

  removeUserTarget(featureFlagKey, userId, variationIndex) {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
      headers: {
        'content-type': 'application/json',
          Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829',
      }
    }).then(resp => {
        // const targets = resp.body.environments[this.environmentKey].targets.map(el => el.values)[variationIndex];
        const targets = resp.body.environments[this.environmentKey].targets;
        const existingUserTargetIndex = targets.findIndex(target => target.values);
        const userIndex = targets.indexOf(userId);
        cy.request({
          method: "PATCH",
          url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'api-791cd945-3719-48cd-9c00-596d34a7f829'
          },
          body: JSON.stringify({
            patch: [
              {
                op: 'remove',
                path: `/environments/${this.environmentKey}/targets/${variationIndex}/values/${userIndex}`,
                value: userId
              }
            ]
          })
        });
        cy.log(`User ${userId} has been deleted`);
    }).as("removeUserTarget");
    // return this.removeUserTarget(featureFlagKey, userId, variationIndex);
  }

}

export default new LaunchDarkly();