const highlightListener = (setLeft, setTop) => {
  const selection = window.getSelection();

  if (!selection.toString()) {
    window.document.getElementById('col').classList.remove('added');
  } else if ((selection.anchorNode) === (selection.focusNode)) {
    setLeft(selection.getRangeAt(0).getBoundingClientRect().left);
    setTop(selection.getRangeAt(0).getBoundingClientRect().top);
    if (window.document.getElementById('col').contains(selection.anchorNode)) {
      window.document.getElementById('col').classList.add('added');
    }
  }
};

// eslint-disable-next-line
export { highlightListener };
