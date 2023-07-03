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
const BookmarksList = lazy(() => import('components/bookmarks/BookmarkList'));
const IprTab = lazy(() => import('components/ipr-details/IprTab'));
const MyActivity = lazy(() => import('components/my-activity/MyActivity'));
const Privacy = lazy(() => import('components/pages/Privacy'));
const Terms = lazy(() => import('components/pages/Terms'));

const AppRoutes = ({ updateFocusArea, showFocusArea }) => (
  <ReactRoutes>
    <Route path="*" element={<NotFound />} />
    <Route
      path={appRoutes.home}
      element={<WorkstreamSearch />}
    />
    <Route
      path={appRoutes.search}
      element={<SearchResults
        showFocusArea={showFocusArea}
      />}
    />
    <Route element={<AuthenticatedRoute />}>
      <Route
        path={appRoutes.dashboard}
        element={
          <Dashboard
            updateFocusArea={updateFocusArea}
            showFocusArea={showFocusArea}
          />
        }
      />
      <Route path={appRoutes.admin} element={<Admin />} />
      <Route path={appRoutes.myActivity} element={<MyActivity />} />
    </Route>
    <Route
      path={appRoutes.savedQueries}
      element={<SavedQueries />}
    />
    <Route
      path={appRoutes.viewHistory}
      element={<ViewHistory />}
    />
    <Route path={appRoutes.bookmarks} element={<BookmarksList />} />
    <Route path={appRoutes.document} element={<IprTab />} />
    <Route path={appRoutes.privacy} element={<Privacy />} />
    <Route path={appRoutes.terms} element={<Terms />} />

  </ReactRoutes>
);

AppRoutes.propTypes = {
  updateFocusArea: PropTypes.func.isRequired,
  showFocusArea: PropTypes.bool.isRequired,
};
export default AppRoutes;
