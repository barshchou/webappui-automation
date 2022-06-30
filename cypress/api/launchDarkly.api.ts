import { Utils } from "../types/utils.type";

interface IConfig {
  apiKey: string,
  projectKey: string,
  environmentKey: Utils.EnvLaunchDarklyType
}

class LaunchDarkly {
  private readonly apiKey = Cypress.env("LAUNCH_DARKLY_AUTH_TOKEN");

  private readonly projectKey = Cypress.env("LAUNCH_DARKLY_PROJECT_KEY");

  private environmentKey: Utils.EnvLaunchDarklyType = 'staging'

  private userId = Cypress.env("USERNAME");

  private readonly headersContent = {
    'content-type': 'application/json',
    Authorization: this.apiKey,
  }

  constructor(config?: IConfig) {
    if (config) {
      this.apiKey = config.apiKey;
      this.projectKey = config.projectKey;
      this.environmentKey = config.environmentKey;
    }
  }

  getFeatureFlag(featureFlagKey: Utils.FeatureFlagKeysType) {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
      headers: this.headersContent
    }).then(resp => {
      cy.log("Feature Flag Key", resp.body);
    }).its("status").should("eq", 200);
  }

  getFeatureFlags() {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}`,
      headers: this.headersContent
    }).then(resp => {
      cy.log("Feature flags", resp.body.items);
    }).its("status").should("eq", 200);
  }

  setFeatureFlagForUser(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number, userId = this.userId) {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
      headers: this.headersContent
    }).then(resp => {
      const targets = resp.body.environments[this.environmentKey].targets;
      const existingTargetIndex = targets.findIndex(target => target.variation === variationIndex);
      if (existingTargetIndex === -1) {
        cy.log(`Adding feature flag ${featureFlagKey} for ${userId}`);

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
          headers: this.headersContent,
          body: JSON.stringify({
            patch: [ jsonPatch ]
          })
        }).its("status").should("eq", 200);
      } else {
        const jsonPatch = {
          op: 'add',
          path: `/environments/${this.environmentKey}/targets/${existingTargetIndex}/values/-`,
          value: userId,
        };

        cy.request({
          method: "PATCH",
          url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
          headers: this.headersContent,
          body: JSON.stringify({
            patch: [ jsonPatch ]
          })
        }).its("status").should("eq", 200);
      }
      cy.log(`Set ${featureFlagKey} feature flag`);
    });
  }

  removeUserTarget(featureFlagKey: Utils.FeatureFlagKeysType, variationIndex: number, userId = this.userId) {
    cy.request({
      method: "GET",
      url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
      headers: this.headersContent
    }).then(resp => {
        const targets = resp.body.environments[this.environmentKey].targets.map(el => el.values)[variationIndex];
        const userIndex = targets.indexOf(userId);

        if (userIndex === -1) {
          // Nothing to remove
          return null;
        }
        cy.log("targets", targets);
        cy.log("userIndex", userIndex);

        const jsonPatch = {
          op: 'remove',
          path: `/environments/${this.environmentKey}/targets/${variationIndex}/values/${userIndex}`,
          value: userId
        };

        cy.request({
          method: "PATCH",
          url: `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${featureFlagKey}`,
          headers: this.headersContent,
          body: JSON.stringify({
            patch: [ jsonPatch ]
          })
        }).its("status").should("eq", 200);
        
        cy.log(`User ${userId} has been deleted`);
    });
  }

}

export default new LaunchDarkly();