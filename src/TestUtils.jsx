import { Suspense } from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import './i18n';

function AllTheProviders({ children }) {
  return (
    <Suspense fallback="Loading ...">
      {children}
    </Suspense>

  );
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
