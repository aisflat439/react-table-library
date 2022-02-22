import * as React from 'react';

import { TableContext } from '@table-library/react-table-library/common/context/Table';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutProvider } from '@table-library/react-table-library/common/context/Layout';
import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { PaginationContext } from '@table-library/react-table-library/common/context/Pagination';

import { applyModifiers } from '@table-library/react-table-library/common/util/modifiers';

import { Nullish } from '@table-library/react-table-library/types/common';
import { TableNode, Data } from '@table-library/react-table-library/types/table';
import { Theme } from '@table-library/react-table-library/types/theme';
import {
  Layout,
  TableMemory,
  TableMemoryRef,
  TableElementRef,
} from '@table-library/react-table-library/types/layout';
import { Sort } from '@table-library/react-table-library/types/sort';
import { Pagination } from '@table-library/react-table-library/types/pagination';
import { Select } from '@table-library/react-table-library/types/select';
import { Tree } from '@table-library/react-table-library/types/tree';

import { useShiftDown } from './useShiftDown';
import { useOnInit, OnInitFunction } from './useOnInit';

import styles from './styles';

const useTableElementRef = (ref: TableElementRef | Nullish): TableElementRef => {
  let tableElementRef = React.useRef(null) as TableElementRef;
  if (ref) tableElementRef = ref;

  return tableElementRef;
};

const useTableMemoryRef = (): TableMemoryRef => {
  const tableMemoryRef = React.useRef<TableMemory | null>(null);

  if (!tableMemoryRef.current) {
    tableMemoryRef.current = {
      resizedLayout: [],
      hiddenSpacesInMemory: [],
    };
  }

  return tableMemoryRef;
};

export interface TableProps {
  data: Data;
  theme?: Theme;
  layout?: Layout;
  sort?: Sort;
  pagination?: Pagination;
  select?: Select;
  tree?: Tree;
  onInit?: OnInitFunction;
  children?: (nodes: TableNode[]) => React.ReactNode;
}

const Table = React.forwardRef(
  (
    {
      data,
      theme,
      layout,
      sort,
      pagination,
      select,
      tree,
      onInit = () => {},
      children,
    }: TableProps,
    ref: any,
  ) => {
    const tableElementRef = useTableElementRef(ref);
    const tableMemoryRef = useTableMemoryRef();

    const modifiedNodes = applyModifiers({
      sort,
      pagination,
      tree,
      select,
    })(data.nodes);

    // callback handler to notifty internal but also optionally outside world that table got rendered
    const [calledOnce, callbackRef] = useOnInit(onInit, tableElementRef);

    // no selection of content (e.g. text) in table if shift is active (e.g. select shift feature)
    const isShiftDown = useShiftDown();

    return (
      <div
        className="table"
        css={`
          ${styles(layout, { isShiftDown })}
          ${theme?.Table}
        `}
        role="grid"
        ref={callbackRef}
      >
        {calledOnce && (
          <TableContext.Provider value={data}>
            <ThemeContext.Provider value={theme}>
              <SortContext.Provider value={sort}>
                <SelectContext.Provider value={select}>
                  <TreeContext.Provider value={tree}>
                    <PaginationContext.Provider value={pagination}>
                      <LayoutProvider
                        layout={layout}
                        tableElementRef={tableElementRef}
                        tableMemoryRef={tableMemoryRef}
                      >
                        {children && children(modifiedNodes)}
                      </LayoutProvider>
                    </PaginationContext.Provider>
                  </TreeContext.Provider>
                </SelectContext.Provider>
              </SortContext.Provider>
            </ThemeContext.Provider>
          </TableContext.Provider>
        )}
      </div>
    );
  },
);

export { Table };
