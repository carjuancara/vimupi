module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    // Eliminar puntos y coma al final de las líneas
    semi: ['error', 'never'],

    // Cambiar comillas dobles por comillas simples
    quotes: ['error', 'single']
  }
}
