import UserAvatar from 'components/shared/user-avatar/UserAvatar';
import PropTypes from 'prop-types';
import { useAuth } from 'react-oidc-context';
import { calculateDifference } from 'utils/dates';
import { useTranslation } from 'react-i18next';
import ShowMore from 'components/shared/show-more/ShowMore';

function NoteView({ note }) {
  const auth = useAuth();
  const { t } = useTranslation('notes');
  return (
    <div className="bg-white rounded p-6 shadow-sm mb-4">
      <div className="d-flex align-items-center mb-4">
        <UserAvatar name={auth.user?.profile.preferred_username} size="32" className="xs-text me-4" />
        <h6 className="mb-0 text-gray-700 me-4">
          {auth.user?.profile.preferred_username}
        </h6>
        <p className="text-gray mb-0 fs-sm">
          {calculateDifference(note.createdAt)}
          {t('day')}
        </p>
      </div>
      <p className="mb-0 text-gray sm-text">
        <ShowMore lines={500}>
          {note.noteText}
        </ShowMore>
      </p>
    </div>
  );
}
NoteView.propTypes = {
  note: PropTypes.shape({
    username: PropTypes.string,
    createdAt: PropTypes.string,
    noteText: PropTypes.string,
  }).isRequired,
};

export default NoteView;
