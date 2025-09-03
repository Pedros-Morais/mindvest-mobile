module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test']],
      'type-case': [2, 'always', 'lower-case'],
      'subject-empty': [2, 'never'],
      'subject-case': [0],
      'header-max-length': [2, 'always', 100]
    }
  };