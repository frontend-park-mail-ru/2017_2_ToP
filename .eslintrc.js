module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "env": {
        "es6": true,
        "browser": true
    },
    "rules": {
        "no-underscore-dangle": 0,
        "no-param-reassign": 0,
        "prefer-const": 0,
        "no-lonely-if": 0,
        "eol-last": 0,
        "arrow-parens": ["error", "as-needed"],
        "class-methods-use-this": 0,
        "comma-dangle": [2, "never"],
        "no-console": 0,
        "no-useless-escape": 0,
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "import/no-unresolved": [2, {"commonjs": true, "amd": true}],
        "prefer-template": "error",
        "prefer-destructuring": 0,
        "object-shorthand": "error",
        "object-curly-spacing": 0,
        "indent": ["error", 4, {"FunctionDeclaration": {"body": 1, "parameters": 2}, "SwitchCase": 1}],
        "no-plusplus": 0,
        "no-unused-expressions": ["error", {"allowShortCircuit": true}],
        "no-shadow": 0,
        "no-extra-bind": 0,
        "no-useless-constructor": 0,
        "no-unused-vars": 0,
        "quote-props": 0,
        "arrow-body-style": 0,
        "padded-blocks": 0,
        "operator-assignment": 0
    }
};