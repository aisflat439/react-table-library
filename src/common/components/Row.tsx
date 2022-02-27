import * as React from 'react';
import { styled } from '@stitches/react';

import * as COLORS from '@table-library/react-table-library/common/colors';
import { LayoutContext } from '@table-library/react-table-library/common/context/Layout';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Layout } from '@table-library/react-table-library/types/layout';

const getBaseStyle = (layout: Layout | Nullish) =>
  styled('div', {
    display: 'flex',
    alignItems: 'stretch',

    /* #1 */
    /* otherwise tree + resize would have overflow icons */
    backgroundColor: `${COLORS.BACKGROUND}`,

    /* otherwise pin feature pushes pined columns eventually outside if sum of all column widths is greater than container size */
    /* https://stackoverflow.com/a/57437315/1189762 */
    ...(layout?.horizontalScroll ? { minWidth: 'max-content' } : {}),
  });

const BaseRowContainer = (layout: Layout | Nullish) =>
  styled(getBaseStyle(layout), {
    fontSize: '18px',
    color: `${COLORS.FONT_SECONDARY}`,

    '&:hover': {
      color: `${COLORS.FONT_PRIMARY}`,
    },

    '&.disabled': {
      color: `${COLORS.FONT_DISABLED}`,
    },

    '&.clickable': {
      cursor: 'pointer',
    },
  });

const RowContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement> | Nullish) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;

    const Component = BaseRowContainer(layout);
    return <Component {...props} ref={ref} />;
  },
);

const BaseHeaderRowContainer = (layout: Layout | Nullish) =>
  styled(getBaseStyle(layout), {
    fontSize: '18px',
    color: `${COLORS.FONT_PRIMARY}`,
  });

const HeaderRowContainer = React.forwardRef(
  (props: Record<string, any>, ref: React.ForwardedRef<HTMLDivElement> | Nullish) => {
    const context = React.useContext(LayoutContext);

    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout } = context;
    const Component = BaseHeaderRowContainer(layout);

    return <Component {...props} ref={ref} />;
  },
);

export { RowContainer, HeaderRowContainer };
