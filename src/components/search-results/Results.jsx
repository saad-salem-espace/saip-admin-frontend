import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Formik, Form } from 'formik';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Trans, useTranslation } from 'react-i18next';
import {
  createSearchParams, useNavigate, useSearchParams, Link,
} from 'react-router-dom';
import * as Yup from 'yup';
import Select from 'components/shared/form/select/Select';
import ToggleButton from 'components/shared/toggle-button/ToggleButton';
import saveQueryApi from 'apis/save-query/saveQueryApi';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import { pascalCase } from 'change-case';
import formStyle from 'components/shared/form/form.scss';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Button from 'react-bootstrap/Button';
import useAxios from 'hooks/useAxios';
import { useAuth } from 'react-oidc-context';
import { tableNames } from 'dbConfig';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import SharedSearch from 'components/workstream-search/shared/SharedSearch';
import emptyState from 'assets/images/search-empty-state.svg';
import EmptyState from 'components/shared/empty-state/EmptyState';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import advancedSearchApi from 'apis/search/advancedSearchApi';
import { parseSingleQuery } from 'utils/search-query/encoder';
import SearchNote from './SearchNote';
import IprDetails from '../ipr-details/IprDetails';
import './style.scss';
import { defaultConditions, parseQuery, reformatArrDecoder } from '../../utils/searchQuery';
import AdvancedSearch from '../advanced-search/AdvancedSearch';
import SearchResultCards from './search-result-cards/SearchResultCards';
import TrademarksSearchResultCards from './trademarks-search-result-cards/TrademarksSearchResultCards';
import toastify from '../../utils/toastify';
import validationMessages from '../../utils/validationMessages';

function Results() {
  // const { t, i18n } = useTranslation('search');
  // const currentLang = i18n.language;
  // const [searchParams, setSearchParams] = useSearchParams();
  //const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [isIPRExpanded, setIsIPRExpanded] = useState(false);
  // const [activeDocument, setActiveDocument] = useState(null);
  // const [isAdvancedSearch, setIsAdvancedSearch] = useState(true);
  // const [isEnabledSynonyms, setIsEnabledSynonyms] = useState(false);
  // const [activeWorkstream, setActiveWorkstream] = useState(searchParams.get('workstreamId'));
  const [isAdvancedMenuOpen, setIsAdvancedMenuOpen] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  // const [results, setResults] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [selectedView, setSelectedView] = useState({ label: t('trademarks.detailed'), value: 'detailed' });
  // const [searchFields, setSearchFields] = useState([]);
  // const [searchKeywords, setSearchKeywords] = useState('');
  // const [imageName, setImageName] = useState(null);
  // const [isImgUploaded, setIsImgUploaded] = useState(false);
  // const submitRef = useRef();
  // const [sortBy, setSortBy] = useState({ label: t('mostRelevant'), value: 'mostRelevant' });
  // const [isQuerySaved, setIsQuerySaved] = useState(false);
  // const { addInstanceToDb, getInstanceByIndex } = useIndexedDbWrapper(tableNames.savedQuery);
  // const auth = useAuth();
  // const [selectedIdentifiers, setSelectedIdentifiers] = useState([]);

  // const convertQueryStrToArr = (qStr) => {
  //   let i = 0;
  //   let qObjsIdx = 0;
  //   let qObjsPrevIdx = 0;
  //   let increment = 1;
  //   let qStartIdx = 2;
  //   let qLastIdx = -1;
  //   const qObjs = [];
  //   if (qStr) {
  //     const qStrArr = qStr.match(/("[^."]* ")|(\S*)/g).filter((str) => str !== '').filter((str) => str !== '' && str !== '"');
  //     while (i < qStrArr.length) {
  //       if (selectedIdentifiers.includes(qStrArr[i]) || i === 0) {
  //         qObjs[qObjsIdx] = {
  //           identifier: qStrArr[i],
  //           condition: qStrArr[i + 1],
  //         };
  //         if (i === 0) {
  //           qObjs[qObjsIdx].operator = '';
  //         } else {
  //           qLastIdx = i - 2;
  //           qObjs[qObjsIdx].operator = qStrArr[i - 1];
  //         }
  //         qObjsIdx += 1;

  //         increment = 2;
  //       }

  //       if (i === qStrArr.length - 1) {
  //         qLastIdx = qStrArr.length - 1;
  //       }
  //       if (qLastIdx >= qStartIdx) {
  //         qObjs[qObjsPrevIdx].data = qStrArr.slice(qStartIdx, qLastIdx + 1).join(' ');
  //         const qObjsLength = qObjs[qObjsPrevIdx].data.length;
  //         if (qObjs[qObjsPrevIdx].data.charAt(0) === '"'
  //            && qObjs[qObjsPrevIdx].data.charAt(qObjsLength - 1) === '"') {
  //           qObjs[qObjsPrevIdx].data = qObjs[qObjsPrevIdx].data.substr(1, qObjsLength - 2);
  //         }
  //         qObjsPrevIdx += 1;
  //         qStartIdx = i + 2;
  //       }
  //       i += increment;
  //       increment = 1;
  //     }
  //   }
  //   return qObjs;
  // };
  
  console.log('admin_dashboard');
  return (
    <div>
      <div>
        <h1> Admin Dashboard </h1>
      </div>
    </div>
  );
}

export default Results;
