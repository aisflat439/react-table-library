import * as React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CellContainer } from '@shared';
import { ThemeContext } from '@context';

const Cell = ({ className, indentation, children }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <CellContainer
      role="gridcell"
      className={cs('td', className)}
      css={theme?.Cell}
      indentation={indentation}
    >
      <div>{children}</div>
    </CellContainer>
  );
};

Cell.propTypes = {
  className: PropTypes.string,
  indentation: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Cell };
