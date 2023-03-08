import { useTranslation } from 'react-i18next';
import { Formik, Form, FieldArray } from 'formik';
import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import PropTypes from 'prop-types';
import Button from '../../shared/button/Button';
import SearchFieldWithButtons from './search-field/SearchFieldWIthButtons';

function SearchQuery({ workstreamId }) {
  const { cachedRequests } = useContext(CacheContext);
  const { t } = useTranslation('search');
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreamList, { url: `workstreams/${workstreamId}/identifiers` });
  const [defaultIdentifier, setDefaultIdentifier] = useState(null);
  const [defaultCondition, setDefaultCondition] = useState(null);

  useEffect(() => {
    setDefaultIdentifier(searchIdentifiers?.data[0]);
  }, [searchIdentifiers]);

  useEffect(() => {
    setDefaultCondition(defaultIdentifier?.identifierOptions?.[0]);
  }, [defaultIdentifier]);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          searchFields: [{
            id: 1, data: '', identifier: defaultIdentifier, condition: defaultCondition,
          }],
        }}
      >
        {({ values, resetForm, setFieldValue }) => (
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
};

export default SearchQuery;
