/* eslint-disable */

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
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
        "no-invalid-regexp": ["error"],
        "no-use-before-define": ["error"],
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
        "quotes": ["error", "single", { 
            "allowTemplateLiterals": true,
            "avoidEscape": true,
        }],
        "semi": ["error", "always"],
        "no-unused-vars": ["off"],
        "@typescript-eslint/no-unused-vars": ["error"]
    }
};