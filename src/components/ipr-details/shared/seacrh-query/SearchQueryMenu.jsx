import SearchQuery from 'components/advanced-search/search-query/SearchQuery';
import './SearchQuery.scss';
import Button from 'react-bootstrap/Button';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate } from 'react-router-dom';
import CacheContext from 'contexts/CacheContext';
import { Formik, Form } from 'formik';
import useCacheRequest from 'hooks/useCacheRequest';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseQuery } from 'utils/searchQuery';
import toastify from 'utils/toastify';
import activeWorkstreamContext from '../context/activeWorkstreamContext';

function SearchQueryMenu({
  showSearchQuery, hideSearchQueryMenu, className, children,
  validHighlight, highlightTrigger, hideFocus,
}) {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const { cachedRequests } = useContext(CacheContext);
  const activeWorkstream = useContext(activeWorkstreamContext)?.id.toString() || JSON.parse(localStorage.getItem('FocusDoc'))?.workstreamId.toString();
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${activeWorkstream}/identifiers` }, { dependencies: [activeWorkstream] });
  const [searchFields, setSearchFields] = useState([]);
  const [formikFields, setFormikFields] = useState([]);
  const maximumSearchFields = process.env.REACT_APP_MAXIMUM_FIELDS || 25;
  const onSubmit = (values) => {
    hideFocus();
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        workstreamId: activeWorkstream, sort: 'mostRelevant', q: parseQuery(values.searchFields, '', true),
      })}`,
    });
  };

  useEffect(() => {
    if (!highlightTrigger) return;

    if (!validHighlight) {
      toastify(
        'error',
        <div>
          <p className="toastifyTitle">
            {t('dashboard:board:invalidHighlight')}
          </p>
        </div>,
      );
      return;
    }

    if (formikFields.length === maximumSearchFields) {
      toastify(
        'error',
        <div>
          <p className="toastifyTitle">
            {t('dashboard:board:maximumFields')}
          </p>
        </div>,
      );
      return;
    }

    if ((formikFields.length === 1 && !formikFields[0].data)) {
      setSearchFields([{
        id: Math.floor(Math.random() * 600),
        data: window.getSelection().toString(),
        identifier: searchIdentifiers.data[0],
        condition: searchIdentifiers.data[0].identifierOptions[0],
        operator: '',
      }]);
    } else {
      setSearchFields([...formikFields, {
        id: Math.floor(Math.random() * 600),
        data: window.getSelection().toString(),
        identifier: searchIdentifiers.data[0],
        condition: searchIdentifiers.data[0].identifierOptions[0],
        operator: 'AND',
      }]);
    }

    toastify(
      'success',
      <div>
        <p className="toastifyTitle">
          {t('dashboard:board:addedToKeywordPlanner')}
        </p>
      </div>,
    );
  }, [highlightTrigger, validHighlight]);

  useEffect(() => {
    if (searchIdentifiers) {
      setSearchFields([{
        id: Math.floor(Math.random() * 600),
        data: '',
        identifier: searchIdentifiers.data[0],
        condition: searchIdentifiers.data[0].identifierOptions[0],
        operator: '',
      }]);
    }
  }, [searchIdentifiers]);

  return (
    <div className={`${className}`}>
      {children}
      {
        showSearchQuery && (
          <Formik
            validateOnChange
            enableReinitialize
            validateOnBlur={false}
          >
            {() => (
              <Form className="search-query-menu shadow rounded">
                <div className="p-8">
                  <Button
                    onClick={() => { hideSearchQueryMenu(); }}
                    variant="transparent"
                    className="text-end w-100 px-0 pb-4 pt-0 border-0"
                  >
                    <FontAwesomeIcon icon={faTimes} className="fs-base text-dark" />
                  </Button>
                  <SearchQuery
                    workstreamId={activeWorkstream}
                    firstIdentifierStr="ftxt"
                    defaultInitializers={searchFields}
                    isAdvancedMenuOpen={false}
                    onChangeSearchQuery={setFormikFields}
                    examinerView
                    submitCallback={onSubmit}
                  />
                </div>
              </Form>
            )}
          </Formik>
        )
      }
    </div>
  );
}

SearchQueryMenu.propTypes = {
  showSearchQuery: PropTypes.bool.isRequired,
  hideSearchQueryMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  validHighlight: PropTypes.bool.isRequired,
  highlightTrigger: PropTypes.number.isRequired,
  hideFocus: PropTypes.func,
};

SearchQueryMenu.defaultProps = {
  className: '',
  hideFocus: () => {},
};

export default SearchQueryMenu;
