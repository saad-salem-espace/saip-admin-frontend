import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { lazy } from 'react';
import appRoutes from './routes.json';

const SearchResults = lazy(() => import('components/search-results/SearchResults'));
const PatentsSearch = lazy(() => import('components/patents-search/PatentsSearch'));

const Routes = () => (
  <ReactRoutes>
    <Route path={appRoutes.home} element={<PatentsSearch />} />
    <Route path={appRoutes.search} element={<SearchResults />} />
  </ReactRoutes>
);

export default Routes;
