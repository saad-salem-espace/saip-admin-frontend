import PropTypes from 'prop-types';
import Button from 'components/shared/button/Button';
import React, { useState } from 'react';
import { LuPlus, LuMinus } from 'react-icons/lu';
import Badge from 'components/shared/badge/Badge';
import FilterActionBtn from './FilterActionBtn';

function FilterOption({
  name, count, children,
  showButtons,
}) {
  const [isShown, setIsShown] = useState(false);
  const toggleShowHide = () => {
    setIsShown(!isShown);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
        <div className="d-flex align-items-center">
          <Button
            text={isShown ? (
              <LuMinus />
            ) : (<LuPlus />)}
            variant={isShown ? 'primary' : 'primary-dark'}
            onClick={toggleShowHide}
            className="appBtn me-3 py-1 px-2"
            size="sm"
          />
          <h6 className={`${isShown ? 'app-text-primary' : 'text-black'} mb-0 text-capitalize`}>{name}</h6>
        </div>
        <Badge className="app-bg-primary-10 app-text-primary" text={count} />
      </div>
      {isShown && (
        <div className="mb-7">
          {children}
          {showButtons && <FilterActionBtn
            applyAction={() => {}}
            clearAction={() => {}}
          />}
        </div>
      )}

    </>
  );
}

FilterOption.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.string,
  children: PropTypes.node.isRequired,
  showButtons: PropTypes.bool.isRequired,
};

FilterOption.defaultProps = {
  count: null,
};

export default FilterOption;
