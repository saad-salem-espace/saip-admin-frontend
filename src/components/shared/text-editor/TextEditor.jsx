import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import './textEditor.scss';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useTranslation } from 'react-i18next';
import { BsExclamationTriangle } from 'react-icons/bs';
import ErrorMessage from '../error-message/ErrorMessage';

function TextEditor({
  className, maxLength, setNoteText, disableEditor, disableChangeTab, SubmitNote,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState();
  const [isMaxLength, setIsMaxLength] = useState(false);
  const { t } = useTranslation(['error', 'translation']);

  const currentContent = editorState.getCurrentContent();
  const currentContentLength = currentContent.getPlainText('').length;
  const hasText = editorState.getCurrentContent().hasText();

  const handleContentStateChange = (c) => {
    setContentState(draftToHtml(c));
    setNoteText(contentState);
    SubmitNote(isMaxLength);

    if (currentContentLength > maxLength) {
      setIsMaxLength(true);
    }
    if (currentContentLength <= maxLength) {
      setIsMaxLength(false);
    }
    disableChangeTab(hasText);
  };

  const handleEditorStateChange = (e) => {
    setEditorState(e);
  };

  return (
    <div className={`${className} `}>
      <div className={`${isMaxLength ? 'error' : ''} ${disableEditor ? 'disabled-editor' : ''}`}>
        <Editor
          readOnly={disableEditor}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorStateChange}
          onContentStateChange={handleContentStateChange}
          toolbar={{
            options: ['inline', 'link', 'list', 'fontSize', 'fontFamily', 'textAlign', 'blockType'],
            list: { options: ['unordered', 'ordered'] },
            blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
          }}
        />
      </div>
      <div className={`mt-2 d-flex  ${isMaxLength ? 'justify-content-between' : 'justify-content-end'}`}>
        {isMaxLength && <ErrorMessage
          className="mb-0"
          msg={
            <p className="fs-12 d-flex mb-0">
              <BsExclamationTriangle className="me-2 fs-base" />
              {t('errorText')}
            </p>
        }
        />}
        <p className="fs-12 text-gray-700 mb-1">
          <span className="pe-1">{maxLength}</span>
          {t('translation:character')}
        </p>
      </div>
    </div>
  );
}

TextEditor.propTypes = {
  className: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  setNoteText: PropTypes.func.isRequired,
  disableEditor: PropTypes.bool,
  disableChangeTab: PropTypes.func,
  SubmitNote: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {
  className: '',
  disableEditor: false,
  disableChangeTab: () => {},
};

export default TextEditor;