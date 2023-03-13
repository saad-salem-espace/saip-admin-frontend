import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  searchFields: Yup.array().of(
    Yup.object().shape({
      data: Yup.string().trim().required('Search criteria cannot be empty for any field'),
    }),
  ),
});

/* eslint-disable-next-line import/prefer-default-export */
export { formSchema };
