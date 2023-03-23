import * as Yup from 'yup';
// import { DateObject } from 'react-multi-date-picker';
// import { identifierNameCategories, selectOption } from 'utils/searchQueryParser';

const option = Yup.object().shape({
  id: Yup.number().required(),
  optionName: Yup.string().trim().required(),
  optionParserName: Yup.string().trim().required(),
});

const SearchQueryValidationSchema = Yup.object().shape({
  searchFields: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      condition: option.required(),
      identifier: Yup.object().shape({
        id: Yup.number().required(),
        identiferName: Yup.string().trim().required(),
        identiferStrId: Yup.string().trim().required(),
        identifierType: Yup.string().trim().required(),
        identifierOptions: Yup.array().of(option).required(),
      }).required(),
      operator: Yup.string().oneOf(['AND', 'OR', 'NOT']),
      // Validates according to optionCategories from 'utils/searchQueryParser'
      data: Yup.mixed().required()
        .test('Is not empty', 'Invalid', (data) => (
          (!(typeof data === 'string' || data instanceof String) || data.trim())
          || (Array.isArray(data) && data.length > 0)
        )),
      // TODO to be refactored
      // .test('Is valid type', 'Invalid type', (data, { parent }) => {
      //   const selectedOption = selectOption(parent.condition.optionParserName);
      //   let schemaBuilder = Yup;
      //   let preValidatedData;
      //   if (selectedOption) {
      //     const { type, conditions } = selectedOption.selectedOption;
      //     schemaBuilder = Object.entries(conditions || {})
      //       .reduce((schema, [typeCondition, value]) =>
      //       schema[typeCondition](value), schemaBuilder[type || 'string']());
      //     const identifierType = identifierNameCategories[parent.identifier.identifierType].type;
      //     if (identifierType) {
      //       preValidatedData = Array.isArray(data) ? data : [data];
      //       if (type === 'array') {
      //         if (identifierType === DateObject) {
      //           return data?.reduce((acc, date) => acc && (date instanceof DateObject), true);
      //         }
      //         schemaBuilder.of(
      //           Yup[identifierNameCategories[parent.identifier.identifierType].type],
      //         );
      //       }
      //     } else {
      //       preValidatedData = Array.isArray(data) ? data[0] : data;
      //     }
      //     return schemaBuilder.isValidSync(preValidatedData);
      //   }
      //
      //   return false;
      // }),
    }),
  ),
});

export default SearchQueryValidationSchema;
