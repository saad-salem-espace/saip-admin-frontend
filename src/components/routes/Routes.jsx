import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { lazy } from 'react';
import appRoutes from './routes.json';
import AuthenticatedRoute from '../AuthenticatedRoute';

const SearchResults = lazy(() => import('components/search-results/SearchResults'));
const WorkstreamSearch = lazy(() => import('components/workstream-search/WorkstreamSearch'));
const Dashboard = lazy(() => import('components/examiner-dashboard/ExaminerDashboard'));
const Admin = lazy(() => import('components/admin-dashboard/AdminDashboard'));

const Routes = () => (
  <ReactRoutes>
    <Route path={appRoutes.home} element={<WorkstreamSearch />} />
    <Route path={appRoutes.search} element={<SearchResults />} />
    <Route element={<AuthenticatedRoute />}>
      <Route path={appRoutes.dashboard} element={<Dashboard />} />
      <Route path={appRoutes.admin} element={<Admin />} />
    </Route>
  </ReactRoutes>
);

export default Routes;
