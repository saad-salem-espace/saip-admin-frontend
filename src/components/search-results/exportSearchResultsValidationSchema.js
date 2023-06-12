import * as Yup from 'yup';

const exportSearchResultsValidationSchema = Yup.object().shape({
  allSelected: Yup.boolean().required(),
  selectedCards: Yup.object().test(
    'any true',
    'Any value must be true',
    (obj) => Object.values(obj).some((value) => value === true),
  ),
});

export default exportSearchResultsValidationSchema;
