import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';

function Bookmarks() {
  const { t } = useTranslation('search');
  const [showButtons, setShowButtons] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
  };

  // const handleButtonClick = () => {
  //   // handle button click here
  // };
  return (
    <div className="bookmark-container position-relative">
      <AppTooltip
        placement="top"
        tooltipId={t('search:ipr.addBookmarks')}
        tooltipContent={t('search:ipr.addBookmarks')}
        tooltipTrigger={
          <Button
            variant="naked"
            className="appBtn me-2 nude-btn-has-menu"
            onClick={() => setShowButtons(!showButtons)}
          >
            {bookmarked ? <FaBookmark className="fs-22 app-text-primary-dark" /> : <FaRegBookmark className="fs-22" />}
            { showButtons && (
              <div className="bookmark-dropdown position-absolute nude-menu-options">
                <Button
                  onClick={handleBookmarkClick}
                >
                  <FaRegBookmark className="me-2 fs-base adjust-align" />
                  {t('search:ipr.addBookmarks')}
                </Button>
                <Button
                  onClick={handleBookmarkClick}
                >
                  <span className="icon-focus fs-base me-2" />
                  {t('search:addtoFocusArea')}
                </Button>
              </div>
            )}
          </Button>
          }
      />
    </div>
  );
}

export default Bookmarks;
