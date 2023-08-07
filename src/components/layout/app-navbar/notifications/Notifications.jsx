import { Dropdown, Button } from 'react-bootstrap/';
import { FaRegBell, FaRegCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useState, useEffect } from 'react';
import Moment from 'moment';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Notice from './Notice';
import apiInstance from '../../../../apis/apiInstance';
import getCountApi from '../../../../apis/notifications/getCountApi';
import getListApi from '../../../../apis/notifications/getListApi';
import markAllAsReadApi from '../../../../apis/notifications/markAllAsReadApi';
import useAxios from '../../../../hooks/useAxios';
import { LONG_DATETIME_12H_FORMAT } from '../../../../constants';
import './notifications.scss';

function Notifications() {
  const { t } = useTranslation();
  const [notificationsCount, setNotificationsCount] = useState(0);
  const getCountApiConfig = getCountApi(true);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const auth = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const loadMoreItems = () => {
    const config = getListApi(currentPage, true);
    apiInstance.request(config).then((res) => {
      const notificationsList = [...notifications, ...res.data.data];
      if (currentPage === 1) setNotifications(res.data.data);
      else setNotifications(notificationsList);

      setTotalPages(res.data.pagination.totalPages);
    });
  };

  useEffect(() => {
    loadMoreItems();
  }, [currentPage]);

  const [, executeGetCount] = useAxios(getCountApiConfig, {
    manual: true,
  });

  useEffect(() => {
    if (auth.user?.profile?.sub) {
      executeGetCount().then(({ data }) => {
        setNotificationsCount(data?.data);
      });
    }
  }, []);

  useEffect(() => {
    const socket = new SockJS('/api/v1/ws-message');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/user/${auth.user?.profile?.sub}/queue/message`,
        (notificationsSize) => {
          setNotificationsCount(JSON.parse(notificationsSize.body));
        },
      );
    });
  }, []);

  const handleMarkAllAsRead = () => {
    const config = markAllAsReadApi(true);
    apiInstance.request(config).then(() => {
      loadMoreItems();
      setNotificationsCount(0);
      setShowDropdown(false);
    });
  };

  const stringToObject = (str) => {
    const keyValueArray = str.slice(1, -1).split(', ');
    const keyValueObject = {};
    keyValueArray.forEach((item) => {
      const [key, value] = item.split('=');
      keyValueObject[key] = value;
    });
    return keyValueObject;
  };
  return (
    <div className="edges-border notifications new">
      <Dropdown
        show={showDropdown}
        onToggle={handleDropdownToggle}
        onHide={() => setShowDropdown(false)}
      >
        <Dropdown.Toggle
          variant="transparent"
          className="appBtn has-icon no-arrow btn nav-link mx-auto my-lg-0 rounded border-0"
          size="lg"
          id="notifications"
          align="start"
        >
          <FaRegBell className="icon m-0" onClick={() => loadMoreItems()} />
          {notificationsCount > 0 && (
            <div className="number-notifications">{notificationsCount}</div>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="notifications-container">
            <div className="d-flex justify-content-between align-items-center mx-3">
              <span className="app-text-primary-dark font-medium">
                {t('layout:navbar.notifications.headline')}
              </span>
              <Button
                variant="link"
                className="text-decoration-none pe-0 font-regular appBtn"
                size="sm"
                onClick={() => handleMarkAllAsRead()}
              >
                {t('layout:navbar.notifications.markAllAsRead')}
                <FaRegCheckCircle className="ms-2" />
              </Button>
            </div>
            <div className="messages-container">
              {notifications.map((notification) => (
                <div>
                  <Notice
                    notificationId={notification.id}
                    fillingNo={stringToObject(notification.data)?.assignmentId}
                    workstreamId={parseInt(stringToObject(notification.data)?.workstreamId, 10)}
                    assignedDate={Moment(notification.createdAt).format(
                      LONG_DATETIME_12H_FORMAT,
                    )}
                    newDocument={
                      notification.key === 'Assignment_added'
                    }
                    assigned={
                      notification.key === 'Assignment_added'
                    }
                    unAssigned={
                      notification.key === 'Assignment_removed'
                    }
                    seen={notification.read}
                    onHide={() => setShowDropdown(false)}
                  />
                </div>
              ))}
            </div>
            {currentPage < totalPages && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="d-block mx-auto text-decoration-none border-top w-100 p-3 rounded-0 font-regular appBtn"
              >
                {t('common:loadMore')}
              </Button>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Notifications;
