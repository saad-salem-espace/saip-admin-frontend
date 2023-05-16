import SearchQuery from 'components/advanced-search/search-query/SearchQuery';
import './SearchQuery.scss';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Button from 'react-bootstrap/Button';
import React, {
  useRef,
} from 'react';
import Image from 'react-bootstrap/Image';
import {
  useSearchParams,
} from 'react-router-dom';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import addIcon from '../../../../assets/images/icons/add.svg';

function SearchQueryMenu({ ShowSearchQueryMenu, showSearchQuery }) {
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
    <div className="search-query-wrapper">
      <AppTooltip
        className="w-auto"
        placement="top"
        tooltipContent="Add to keyword planner"
        tooltipTrigger={
          <div>
            <Button
              variant="primary"
              className="px-2 py-1"
              onClick={() => ShowSearchQueryMenu(true)}
            >
              <Image src={addIcon} />
            </Button>
          </div>
        }
      />
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
              <Form className="search-query-menu shadow" onSubmit={handleSubmit}>
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
              </Form>
            )}
          </Formik>
        )
      }
    </div>
  );
}

SearchQueryMenu.propTypes = {
  ShowSearchQueryMenu: PropTypes.func.isRequired,
  showSearchQuery: PropTypes.bool.isRequired,
};

export default SearchQueryMenu;
