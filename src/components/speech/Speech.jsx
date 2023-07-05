import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from 'components/shared/button/Button';
import { GrFormClose } from 'react-icons/gr';
import { BsMic } from 'react-icons/bs';
import Select from 'components/shared/form/select/Select';
import './speech.scss';

import {
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

const Speech = ({
  className,
  getSpeechValue,
  speechClassName,
}) => {
  const { t, i18n } = useTranslation('search');
  const [isRecording, setIsRecording] = useState(false);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [isStopDisabled, setIsStopDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState({ });
  const currentLang = i18n.language;
  useEffect(() => {
    setSelectedOption({
      label: currentLang === 'ar' ? t('speech.arabic') : t('speech.english'),
      value: currentLang === 'ar' ? 'ar-SA' : 'en-UK',
    });
  }, [currentLang]);
  const [show, setShow] = useState();

  try {
    const recognition = new (window.SpeechRecognition
      || window.webkitSpeechRecognition)();
    const startRecored = () => {
      if (!isRecording) {
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedOption;
        recognition.start();
        recognition.onstart = () => {
          setIsRecording(true);
          setIsStartDisabled(true);
          setIsStopDisabled(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
          setIsStartDisabled(false);
          setIsStopDisabled(true);
        };

        recognition.onresult = (event) => {
          const finalTranscript = event.results[event.results.length - 1][0].transcript;
          getSpeechValue(finalTranscript);
        };
      }
    };

    const stopSpeech = () => {
      if (isRecording) {
        recognition.stop();
        setIsStopDisabled(true);
        setIsStartDisabled(false);
        setIsRecording(false);
      }
    };
    const handleToggle = () => {
      setShow((prev) => !prev);
      stopSpeech();
    };
    const handleDismiss = () => {
      setShow(false);
    };

    const langOptions = [
      { value: 'en-UK', label: t('speech.english') },
      { value: 'ar-SA', label: t('speech.arabic') },
    ];

    const onChangeLang = (i) => {
      setSelectedOption(i);
    };
    const popover = (
      <Popover className={`speech-popover p-4 shadow ${speechClassName}`}>
        <Popover.Header className="border-0 p-0 m-0 d-flex justify-content-end align-items-end">
          <Button
            onClick={() => { stopSpeech(); handleDismiss(); }}
            size="sm"
            variant="link"
            className="transparent btn-dismiss p-0 text-gray mb-2"
            text={
              <GrFormClose className="text-gray fs-22" />
          }
          />
        </Popover.Header>
        <Popover.Body className="p-0 d-flex flex-column fs-14 text-gray-700">
          <div className="d-flex align-items-stretch">
            <Select
              options={langOptions}
              className="lang-select defaultSelect"
              selectedOption={selectedOption}
              setSelectedOption={onChangeLang}
            />
            <Button
              text={
                <BsMic />
            }
              variant="primary"
              onClick={startRecored}
              disabled={isStartDisabled}
              className={`${isStartDisabled ? 'disabled' : ''} start-btn p-2 app-bg-primary text-white mx-2`}
            />
            <Button
              variant="outline-primary"
              text={<div className="rounded" />}
              onClick={stopSpeech}
              disabled={isStopDisabled}
              className={`${isStopDisabled ? 'disabled' : ''} stop-btn p-2 border-0`}
            />
          </div>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        onToggle={handleToggle}
        show={show}
      >
        <BsMic className={className} />
      </OverlayTrigger>
    );
  } catch {
    return null;
  }
};

Speech.propTypes = {
  className: PropTypes.string,
  speechClassName: PropTypes.string,
  getSpeechValue: PropTypes.func.isRequired,
};

Speech.defaultProps = {
  className: '',
  speechClassName: '',
};

export default Speech;
