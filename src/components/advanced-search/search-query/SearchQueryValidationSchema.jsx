import * as Yup from 'yup';

const SearchQueryValidationSchema = Yup.object().shape({
  searchFields: Yup.array().of(
    Yup.object().shape({
      data: Yup.string().trim().required('Search criteria cannot be empty for any field'),
    }),
  ),
});

export default SearchQueryValidationSchema;
