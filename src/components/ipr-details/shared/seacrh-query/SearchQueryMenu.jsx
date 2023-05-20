import SearchQuery from 'components/advanced-search/search-query/SearchQuery';
import './SearchQuery.scss';
import Button from 'react-bootstrap/Button';
import React, {
  useRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useSearchParams,
} from 'react-router-dom';
import CacheContext from 'contexts/CacheContext';
import { Formik, Form } from 'formik';
import useCacheRequest from 'hooks/useCacheRequest';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import highlightTextContext from '../context/highlightTextContext';

function SearchQueryMenu({
  showSearchQuery, hideSearchQueryMenu, className, children, toggleIcon,
  anchorNode,
}) {
  const { cachedRequests } = useContext(CacheContext);
  const [searchParams] = useSearchParams();
  const highlightedText = useContext(highlightTextContext);
  const activeWorkstream = '1';
  const [searchIdentifiers] = useCacheRequest(cachedRequests.workstreams, { url: `workstreams/${activeWorkstream}/identifiers` }, { dependencies: [activeWorkstream] });
  const [searchFields, setSearchFields] = useState([]);
  const [lastAnchorNode, setLastAnchorNode] = useState(null);
  const [formikFields, setFormikFields] = useState([]);
  console.log(showSearchQuery);
  useEffect(() => {
    if (highlightedText) {
      if ((searchFields.length === 1 && !searchFields[0].data) || lastAnchorNode === anchorNode) {
        if (!lastAnchorNode) setLastAnchorNode(anchorNode);
        const tempFields = searchFields;
        tempFields[searchFields.length - 1].data = highlightedText;
        setSearchFields(tempFields);
      } else {
        setSearchFields([...formikFields, {
          id: Math.floor(Math.random() * 600),
          data: highlightedText,
          identifier: searchIdentifiers.data[0],
          condition: searchIdentifiers.data[0].identifierOptions[0],
          operator: '',
        }]);
        setLastAnchorNode(anchorNode);
      }
    }
  }, [highlightedText, anchorNode]);

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

  // useEffect(() => {
  //   setFormikFields(searchFields);
  // },[searchFields])

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
                    defaultInitializers={searchFields}
                    submitRef={submitRef}
                    isAdvancedMenuOpen
                    onChangeSearchQuery={setFormikFields}
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
  anchorNode: PropTypes.instanceOf(Object).isRequired,
  toggleIcon: PropTypes.func.isRequired,
};

SearchQueryMenu.defaultProps = {
  className: '',
};

export default SearchQueryMenu;
