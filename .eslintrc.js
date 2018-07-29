module.exports = {
    // root: true,
    //parser: 'babel-eslint',
    //parserOptions: {
    //     sourceType: 'module'
    // },
    // env: {
    //     browser: true,
    // },
    // plugins: [
    //     'html'
    // ],
    extends: ['airbnb-base'],
    'rules': {
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'comma-dangle': ['error', 'only-multiline'],
        'linebreak-style': ['error', 'windows'],
        'semi': ['error', 'never'],
        'space-before-function-paren': ['error', 'always'],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-console': 'off',
        'new-cap': 'off'
    }
}
