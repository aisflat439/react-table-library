import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { HeaderRowContainer } from '@shared';
import { ThemeContext } from '@context';

import { useRowLayout } from '../useRowLayout';

const HeaderRow = ({ className, rowLayout, disabled, children }) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef();

  useRowLayout(ref, '.th', rowLayout);

  return (
    <HeaderRowContainer
      role="rowheader"
      className={cs('tr', className, { disabled })}
      css={theme?.HeaderRow}
      ref={ref}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { index })
      )}
    </HeaderRowContainer>
  );
};

HeaderRow.propTypes = {
  className: PropTypes.string,
  rowLayout: PropTypes.arrayOf(PropTypes.any),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { HeaderRow };
