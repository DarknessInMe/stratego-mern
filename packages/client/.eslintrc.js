/* eslint-disable */

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "react/no-deprecated": ["off"],
        "no-debugger": ["error"],
        "camelcase": ["error", {
            "ignoreDestructuring": true,
            "ignoreImports": true,
            "ignoreGlobals": true,
        }],
        "eqeqeq": ["error", "always"],
        "no-empty": ["error", {
            "allowEmptyCatch": true,
        }],
        "no-eval": ["error"],
        "no-var": ["error"],
        "quotes": ["warn", "single", { 
            "allowTemplateLiterals": true,
            "avoidEscape": true,
        }],
        "semi": ["warn", "always"],
        "no-unused-vars": ["off"],
        "@typescript-eslint/no-unused-vars": ["warn", {
            varsIgnorePattern: '^_',
        }],
    },
};
