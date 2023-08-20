const validationMessages = {
  // General Required Field
  required: () => ({ key: 'validations:common.required' }),

  // General Invalid
  invalid: (name) => ({ key: 'validations:common.invalid', values: { name } }),

  // Numbers
  invalidNumber: () => ({ key: 'validations:common.invalidNumber' }),
  minNumber: (min) => ({ key: 'validations:common.tooLow', values: { min } }),
  maxNumber: (max) => ({ key: 'validations:common.tooHigh', values: { max } }),
  mustBeIntegerNumber: () => ({ key: 'validations:common.integer' }),

  // Characters
  minChars: (min) => ({ key: 'validations:common.tooShort', values: { min } }),
  maxChars: (max) => ({ key: 'validations:common.tooLong', values: { max } }),

  // Selects
  invalidSelect: () => ({ key: 'validations:common.select' }),

  search: {
    required: () => ({ key: 'validations:search.required' }),
    invalidWildcards: () => ({ key: 'validations:search.wildcards' }),
    specialChars: () => ({ key: 'validations:search.specialChars' }),
    tooLong: () => ({ key: 'validations:search.tooLong' }),
    invalidAdvanced: () => ({ key: 'validations:search.invalidAdvanced' }),
    consecutiveAsteric: () => ({ key: 'validations:search.consecutiveAsteric' }),
  },
};

export default validationMessages;
