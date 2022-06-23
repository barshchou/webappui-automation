class LaunchDarkly {
    private readonly apiKey: string

    private readonly projectKey: string;

    private readonly featureFlagKey: string = '';

    userName: string;
    
    constructor(config?) {
        if (config) {
            this.apiKey = config.apiKey;
            this.projectKey = config.projectKey;
            this.featureFlagKey = config.featureFlagKey;
        }
    }

    async getFeatureFlagsByName() {
        const res = await fetch(
            `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}/${this.featureFlagKey}`,
            {
                 method: 'GET',
                 headers: {
                    Authorization: this.apiKey
                }
            }
        );
        const data = await res.text();
        return data;
    }


    async getAllFeatureFlags() {
        const res = await fetch(
            `https://app.launchdarkly.com/api/v2/flags/${this.projectKey}`,
            {
                 method: 'GET',
                 headers: {
                    Authorization: this.apiKey
                }
            }
        );
        const data = await res.text();
        return data;
    }


    async updateFeatureFlagsByName() {
        const res = await fetch(
            `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${featureFlagKey}`,
            {
                 method: 'PATCH',
                 headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.apiKey
                },
                body: JSON.stringify({
                    patch: [
                      {
                        op: 'replace',
                        path: '/description',
                        value: 'New description for this flag'
                      }
                    ]
                }) 
            }
        );
        const data = await res.text();
        return data;
    }
}

export default new LaunchDarkly();