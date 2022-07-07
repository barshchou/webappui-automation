const envLaunchDarklyKeys = {
    staging: "staging",
    production: "production",
    test: "test",
    development: "development",
    local: "local"
} as const;

export default Object.freeze(envLaunchDarklyKeys);