import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { lazy } from 'react';
import PropTypes from 'prop-types';
import appRoutes from './routes.json';
import AuthenticatedRoute from '../AuthenticatedRoute';

const SearchResults = lazy(() => import('components/search-results/SearchResults'));
const WorkstreamSearch = lazy(() => import('components/workstream-search/WorkstreamSearch'));
const Dashboard = lazy(() => import('components/examiner-dashboard/ExaminerDashboard'));
const Admin = lazy(() => import('components/admin-dashboard/AdminDashboard'));
const SavedQueries = lazy(() => import('components/saved-queries/SavedQueries'));
const NotFound = lazy(() => import('errors/error-pages/NotFoundError'));
const ViewHistory = lazy(() => import('components/view-history/ViewHistory'));

const Routes = ({ updateFocusArea, showFocusArea, updateWorkStreamId }) => (
  <ReactRoutes>
    <Route path="*" element={<NotFound />} />
    <Route
      path={appRoutes.home}
      element={<WorkstreamSearch updateWorkStreamId={updateWorkStreamId} />}
    />
    <Route
      path={appRoutes.search}
      element={
        <SearchResults
          showFocusArea={showFocusArea}
          updateWorkStreamId={updateWorkStreamId}
        />
      }
    />
    <Route element={<AuthenticatedRoute />}>
      <Route
        path={appRoutes.dashboard}
        element={
          <Dashboard
            updateFocusArea={updateFocusArea}
            showFocusArea={showFocusArea}
            updateWorkStreamId={updateWorkStreamId}
          />
        }
      />
      <Route path={appRoutes.admin} element={<Admin />} />
    </Route>
    <Route
      path={appRoutes.savedQueries}
      element={<SavedQueries updateWorkStreamId={updateWorkStreamId} />}
    />
    <Route
      path={appRoutes.viewHistory}
      element={<ViewHistory updateWorkStreamId={updateWorkStreamId} />}
    />
  </ReactRoutes>
);

Routes.propTypes = {
  updateFocusArea: PropTypes.func.isRequired,
  showFocusArea: PropTypes.bool.isRequired,
  updateWorkStreamId: PropTypes.func.isRequired,
};
export default Routes;
