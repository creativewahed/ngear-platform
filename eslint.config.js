// eslint.config.js - ESLint configuration for ngear-platform
export default [
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module"
        },
        rules: {
            // Basic recommended rules
            "no-unused-vars": "warn",
            "no-console": "off"
        }
    }
];