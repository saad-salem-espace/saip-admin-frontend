const SelectStyle = {
  option: (provided) => ({
    ...provided,
    color: '#888',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#F2F7F6',
    },
    '&:active': {
      backgroundColor: '#F2F7F6',
    },
  }),
  control: () => ({
    border: '1px solid #DDD',
    display: 'flex',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#000',
  }),
  placeholder: () => ({
    color: '#888',
    fontSize: '16px',
    margin: '-40px 16px 0 8px',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    marginTop: '-4px',
    boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.14)',
  }),
};

export default SelectStyle;
