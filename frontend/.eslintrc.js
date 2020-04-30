module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ["plugin:react/recommended", "standard"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "no-console": "warn",
        "no-eval": "error",
        "import/first": "error",
        "react/prop-types": 1,
        "no-unused-vars": ["warn", { vars: "all" }],
    },
};
