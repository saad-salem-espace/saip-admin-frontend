module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'header-max-length': [2, 'always', 80],
    'subject-empty': [0],
    'type-case': [0],
    'function-rules/header-case': [2, 'always', (parsed) => (parsed.raw && parsed.raw.match(/^([A-Z][\dA-Z-]{0,10}-\d{0,6}):/) ? [true] : [false, 'header must be in the following format <JIRA-TASK-ID>: <commit message>'])],
    'type-max-length': [0],
    'type-empty': [0],
    'type-enum': [0],
  },
};
