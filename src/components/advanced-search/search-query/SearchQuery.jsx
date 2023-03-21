import { useTranslation } from 'react-i18next';
import { Formik, Form, FieldArray } from 'formik';
import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import PropTypes from 'prop-types';
import { parseSingleQuery } from 'utils/searchQueryParser';
import Button from 'components/shared/button/Button';
import ErrorMessage from 'components/shared/error-message/ErrorMessage';
import { createSearchParams, useNavigate } from 'react-router-dom';
import SearchFieldWithButtons from './search-field/SearchFieldWIthButtons';
import SearchQueryValidationSchema from './SearchQueryValidationSchema';

function SearchQuery({
  workstreamId, firstIdentifierStr, defaultCriteria, onChangeSearchQuery,
}) {
  const { cachedRequests } = useContext(CacheContext);
  const { t } = useTranslation('search');
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${workstreamId}/identifiers` });
  const [defaultIdentifier, setDefaultIdentifier] = useState(null);
  const [defaultCondition, setDefaultCondition] = useState(null);
  const [firstIdentifier, setFirstIdentifier] = useState(null);
  const [firstCondition, setFirstCondition] = useState(null);
  const navigate = useNavigate();
  const operators = ['and', 'or', 'not'].map((operator) => ({
    operator: operator.toUpperCase(),
    displayName: t(`operators.${operator}`),
  }));
  const maximumSearchFields = process.env.REACT_APP_MAXIMUM_FIELDS || 25;

  useEffect(() => {
    setDefaultIdentifier(searchIdentifiers?.data[0]);
    setFirstIdentifier(searchIdentifiers?.data.find(
      (element) => element.identiferStrId === firstIdentifierStr,
    ));
  }, [searchIdentifiers]);

  useEffect(() => {
    setDefaultCondition(defaultIdentifier?.identifierOptions?.[0]);
    setFirstCondition(firstIdentifier?.identifierOptions?.[0]);
  }, [defaultIdentifier, firstIdentifier]);

  const parseQuery = (values, isQuery) => {
    let finalQuery = '';

    values.searchFields.forEach((value, index) => {
      finalQuery += parseSingleQuery(value, index, isQuery);
    });

    return finalQuery;
  };

  const onSubmit = (values) => {
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        workstreamId,
        q: parseQuery(values, true),
        page: 1,
      })}`,
    });
  };

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={SearchQueryValidationSchema}
        validateOnChange
        onSubmit={onSubmit}
        validateOnBlur={false}
        initialValues={{
          searchFields: [{
            id: 1, data: defaultCriteria, identifier: firstIdentifier, condition: firstCondition, operator: '',
          }],
        }}
      >
        {({
          values, setFieldValue, errors, setValues, touched, setErrors, setTouched,
        }) => (
          <Form onChange={onChangeSearchQuery(parseQuery(values, true))}>
            <FieldArray name="searchFields">
              {({ push, remove }) => (
                <div>
                  {
                 values.searchFields.map((value, index) => (
                   <SearchFieldWithButtons
                     key={value.id}
                     order={index}
                     namePrefix={`searchFields.${index}`}
                     handleRemove={() => remove(index)}
                     searchIdentifiers={searchIdentifiers?.data}
                     identifierValue={value.identifier}
                     onChangeIdentifier={(identifier) => {
                       setFieldValue(`searchFields.${index}.identifier`, identifier);
                       setFieldValue(`searchFields.${index}.condition`, identifier?.identifierOptions?.[0]);
                       setFieldValue(`searchFields.${index}.data`, '');
                     }}
                     operators={operators}
                     conditionValue={value.condition}
                     onChangeCondition={(condition) => setFieldValue(`searchFields.${index}.condition`, condition)}
                     error={touched.searchFields?.[index] && errors.searchFields?.[index]}
                     onChangeDate={(date) => { setFieldValue(`searchFields.${index}.data`, date); }}
                   />
                 ))
               }
                  {
                      values.searchFields.length >= parseInt(maximumSearchFields, 10)
                        ? <ErrorMessage msg={t('searchFieldValidationMsg')} className="mb-2 mt-4" />
                        : null
                  }
                  <Button
                    variant="outline-primary"
                    className="mb-2 mt-2"
                    size="sm"
                    onClick={() => {
                      const newField = {
                        id: Math.max(...values.searchFields.map((o) => o.id)) + 1,
                        data: '',
                        identifier: defaultIdentifier,
                        condition: defaultCondition,
                        operator: 'AND',
                      };
                      if (values.searchFields.length < maximumSearchFields) push(newField);
                    }}
                    text={(
                      <>
                        <FontAwesomeIcon icon={faCirclePlus} className="me-4" />
                        {t('addSearchField')}
                      </>
                    )}
                  />
                  <div className="border-top d-flex justify-content-end pt-4 pb-8 mt-6">
                    <Button
                      variant="outline-primary"
                      className="me-4"
                      size="sm"
                      onClick={() => {
                        setValues({
                          searchFields: [{
                            id: Math.max(...values.searchFields.map((o) => o.id)) + 1, data: '', identifier: defaultIdentifier, condition: defaultCondition, operator: '',
                          }],
                        });
                        setErrors({});
                        setTouched({});
                      }}
                      text={t('clear')}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      size="sm"
                      // onClick={() => {}} /* to be changed to submit */
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
  firstIdentifierStr: PropTypes.string.isRequired,
  defaultCriteria: PropTypes.string.isRequired,
  onChangeSearchQuery: PropTypes.func,
};

SearchQuery.defaultProps = {
  onChangeSearchQuery: () => {},
};

export default SearchQuery;
