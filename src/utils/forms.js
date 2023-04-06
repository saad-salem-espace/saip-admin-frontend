/**
 * Construct form data from array of objects
 * @param data {{string: any}}
 * @return FormData
 */
const constructFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
    console.log(key, value);
  });
  return formData;
};

// eslint-disable-next-line import/prefer-default-export
export { constructFormData };
