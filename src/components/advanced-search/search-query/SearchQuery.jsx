import { useTranslation } from 'react-i18next';
import { Formik, Form, FieldArray } from 'formik';
import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import Button from '../../shared/button/Button';
import SearchFieldWithButtons from './search-field/SearchFieldWIthButtons';

function SearchQuery({ workstreamId, firstIdentifierStr, defaultCriteria }) {
  const { cachedRequests } = useContext(CacheContext);
  const { t } = useTranslation('search');
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreamList, { url: `workstreams/${workstreamId}/identifiers` });
  const [defaultIdentifier, setDefaultIdentifier] = useState(null);
  const [defaultCondition, setDefaultCondition] = useState(null);
  const [firstIdentifier, setFirstIdentifier] = useState(null);
  const [firstCondition, setFirstCondition] = useState(null);

  useEffect(() => {
    setDefaultIdentifier(searchIdentifiers?.data[0]);
    /* eslint-disable-next-line max-len */
    setFirstIdentifier(searchIdentifiers?.data.find((element) => element.identiferStrId === firstIdentifierStr));
  }, [searchIdentifiers]);

  useEffect(() => {
    setDefaultCondition(defaultIdentifier?.identifierOptions?.[0]);
    setFirstCondition(firstIdentifier?.identifierOptions?.[0]);
  }, [defaultIdentifier, firstIdentifier]);

  const formSchema = Yup.object().shape({
    searchFields: Yup.array().of(
      Yup.object().shape({
        data: Yup.string().trim().required(),
      }),
    ),
  });

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={formSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          searchFields: [{
            id: 1, data: defaultCriteria, identifier: firstIdentifier, condition: firstCondition,
          }],
        }}
      >
        {({
          values, resetForm, setFieldValue, errors,
        }) => (
          <Form>
            <FieldArray name="searchFields">
              {({ push, remove }) => (
                <div>
                  {
                 values.searchFields.map((value, index) => (
                   <SearchFieldWithButtons
                     key={value.id}
                     order={index}
                     name={`searchFields.${index}.data`}
                     handleRemove={() => remove(index)}
                     searchIdentifiers={searchIdentifiers?.data}
                     identifierValue={value.identifier}
                     onChangeIdentifier={(identifier) => {
                       setFieldValue(`searchFields.${index}.identifier`, identifier);
                       setFieldValue(`searchFields.${index}.condition`, identifier?.identifierOptions?.[0]);
                     }}
                     conditionValue={value.condition}
                     onChangeCondition={(condition) => setFieldValue(`searchFields.${index}.condition`, condition)}
                   />
                 ))
               }
                  <Button
                    variant="outline-primary"
                    className="mb-9 mt-2"
                    size="sm"
                    onClick={() => {
                      const newField = {
                        id: Math.max(...values.searchFields.map((o) => o.id)) + 1, data: '', identifier: defaultIdentifier, condition: defaultCondition,
                      };
                      push(newField);
                    }}
                    text={<>
                      <FontAwesomeIcon icon={faCirclePlus} className="me-4" />
                      {t('addSearchField')}
                      {/* eslint-disable-next-line react/jsx-indent */}
                          </>}
                  />
                  <div className="border-top d-flex justify-content-end pt-4 pb-8">
                    <Button
                      variant="outline-primary"
                      className="me-4"
                      size="sm"
                      onClick={() => resetForm()}
                      text={t('clear')}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      size="sm"
                      // onClick={onSubmit}
                      text={t('apply')}
                    />
                    {
                      errors.searchFields ? <ErrorMessage msg="Search criteria cannot be empty for any field." className="mt-2" /> : null
                    }
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
}

SearchQuery.propTypes = {
  workstreamId: PropTypes.string.isRequired,
  firstIdentifierStr: PropTypes.string.isRequired,
  defaultCriteria: PropTypes.string.isRequired,
};

export default SearchQuery;
