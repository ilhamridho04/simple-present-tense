// eslint.config.js
export default [
    {
        ignores: ['node_modules/'] // Ignore node_modules
    },
    {
        files: ['**/*.js'], // Apply ESLint to all JS files
        languageOptions: {
            ecmaVersion: 'latest', // Use latest ECMAScript features
            sourceType: 'module'
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off'
        }
    }
];
