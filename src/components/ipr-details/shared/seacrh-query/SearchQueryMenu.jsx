import SearchQuery from 'components/advanced-search/search-query/SearchQuery';
import './SearchQuery.scss';
import Button from 'react-bootstrap/Button';
import React, {
  useRef,
} from 'react';
import {
  useSearchParams,
} from 'react-router-dom';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchQueryMenu({
  showSearchQuery, hideSearchQueryMenu, className, children, toggleIcon,
}) {
  const [searchParams] = useSearchParams();

  const searchResultParams = {
    workstreamId: searchParams.get('workstreamId'),
    query: searchParams.get('q'),
    ...(searchParams.get('imageName') && { imageName: searchParams.get('imageName') }),
    ...(searchParams.get('enableSynonyms') && { enableSynonyms: searchParams.get('enableSynonyms') }),
  };
  const submitRef = useRef();
  const onSubmit = () => {

  };
  return (
    <div className={`search-query-wrapper ${className}`}>
      {children}
      {
        showSearchQuery && (
          <Formik
            onSubmit={onSubmit}
            validateOnChange
            enableReinitialize
            validateOnBlur={false}
            innerRef={submitRef}
          >
            {({
              handleSubmit,
            }) => (
              <Form className="search-query-menu shadow rounded" onSubmit={handleSubmit}>
                <div className="p-8">
                  <Button
                    onClick={() => { hideSearchQueryMenu(); toggleIcon(); }}
                    variant="transparent"
                    className="text-end w-100 px-0 pb-4 pt-0 border-0"
                  >
                    <FontAwesomeIcon icon={faTimes} className="fs-base text-dark" />
                  </Button>
                  <SearchQuery
                    workstreamId="1"
                    firstIdentifierStr={searchResultParams.identifierStrId}
                    defaultInitializers={[{
                      id: 1,
                      data: '',
                      identifier: '',
                      condition: '',
                      operator: '',
                    }]}
                    submitRef={submitRef}
                    isAdvancedMenuOpen
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
  toggleIcon: PropTypes.func.isRequired,
};

SearchQueryMenu.defaultProps = {
  className: '',
};

export default SearchQueryMenu;
