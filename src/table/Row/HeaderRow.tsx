import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { HeaderRowContainer } from '@table-library/react-table-library/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import {
  LayoutContext,
  preserveResizedLayout,
  setResizedLayout,
} from '@table-library/react-table-library/common/context';
import {
  toDataColumn,
  getHeaderColumns,
} from '@table-library/react-table-library/common/util/columns';

import { HeaderRowProps } from '@table-library/react-table-library/types/table';

const isReactFragment = (variableToInspect: any) => {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
};

const useInitialLayout = () => {
  const context = React.useContext(LayoutContext);

  React.useLayoutEffect(() => {
    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { layout, tableElementRef, tableMemoryRef } = context;

    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);

    if (tableMemoryRef.current?.onlyOnce) return;
    tableMemoryRef.current!.onlyOnce = true;

    if (layout?.resizedLayout) {
      const controlledResizedLayout = layout?.resizedLayout;
      setResizedLayout(controlledResizedLayout, tableElementRef, tableMemoryRef);
    }

    // distribute layout once evenly if no custom layout is defined
    else if (!layout?.custom) {
      const visibleDataColumns = dataColumns.filter((dataColumn) => !dataColumn.isHide);

      const getPartialLayout = () => 'minmax(0px, 1fr)';

      const resizedLayout = visibleDataColumns.map(getPartialLayout).join(' ');
      setResizedLayout(resizedLayout, tableElementRef, tableMemoryRef);
    } else {
      preserveResizedLayout(tableElementRef, tableMemoryRef);
    }
  }, [context]);
};

export const HeaderRow: React.FC<HeaderRowProps> = ({
  className,
  role = 'rowheader',
  _className = 'tr-header',
  children,
  ...rest
}: HeaderRowProps) => {
  const theme = React.useContext(ThemeContext);

  const ref = React.useRef<HTMLTableRowElement>(null);

  useInitialLayout();

  return (
    <HeaderRowContainer
      role={role}
      data-table-library_tr-header=""
      css={css`
        ${theme?.BaseRow}
        ${theme?.HeaderRow}
      `}
      className={cs('tr', _className, className)}
      ref={ref}
      {...rest}
    >
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
          if (React.isValidElement(child)) {
            let extraProps = {};

            // edge case: CompactTable renders checkbox (select feature) + cell in one fragment
            // this would break the resize feature
            // hence we need to pass the index from the outside then (see CompactTable)
            if (!isReactFragment(child)) {
              extraProps = {
                ...extraProps,
                index,
              };
            }

            return React.cloneElement(child, extraProps);
          }
        })}
    </HeaderRowContainer>
  );
};
