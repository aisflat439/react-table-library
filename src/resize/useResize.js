import * as React from 'react';

import { ResizeContext } from '@table-library/react-table-library/common/context/Resize';

import {
  getHeaderColumns,
  applyToHeaderColumns,
  applyToColumns,
} from './util';

const applyResize = (index, tableRef, resize, resizeWidth) => {
  const headerColumns = getHeaderColumns(tableRef);

  const columns = headerColumns.map((headerCell, j) => ({
    index: j,
    minResizeWidth: +headerCell.getAttribute('data-resize-min-width'),
    width: headerCell.getBoundingClientRect().width,
  }));

  const afterColumn = columns.reduce((acc, value, j) => {
    if (acc) return acc;
    if (j > index && value.width !== 0) return value;

    return acc;
  }, null);

  const { minResizeWidth } = columns[index];

  const actualResizeWidth =
    resizeWidth > minResizeWidth ? resizeWidth : minResizeWidth;

  const diffWidth = actualResizeWidth - columns[index].width;

  const newColumnWidths = columns.map((column, i) => {
    // resize

    if (afterColumn && index === i) {
      const nextWidth = afterColumn.width - diffWidth;
      const willNextAdjust = nextWidth > minResizeWidth;

      return willNextAdjust ? actualResizeWidth : column.width;
    }

    if (afterColumn?.index === i) {
      const nextWidth = column.width - diffWidth;
      const shouldAdjust = nextWidth > minResizeWidth;

      return shouldAdjust ? nextWidth : column.width;
    }

    return column.width;
  });

  const tableOffset = resize?.offset || 0;
  const tableWidth = tableRef.current.getBoundingClientRect().width;

  const columnWidthsPercentages = newColumnWidths.map(
    (width) => `${(width / (tableWidth - tableOffset)) * 100}%`
  );

  // imperative write of all cell widths

  const applyWidth = (cell, i) => {
    cell.style.width = columnWidthsPercentages[i];
  };

  applyToHeaderColumns(tableRef, applyWidth);
  applyToColumns(tableRef, applyWidth);

  return columnWidthsPercentages;
};

export const useResize = (cellRef, index, resize) => {
  const { resizedLayout, tableRef } = React.useContext(ResizeContext);

  const resizeRef = React.useRef();

  const startOffset = React.useRef();
  const isMouseDown = React.useRef(false);

  const onMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();

      isMouseDown.current = true;
      startOffset.current = cellRef.current.offsetWidth - event.pageX;
    },
    [cellRef]
  );

  const onMouseMove = React.useCallback(
    (event) => {
      if (isMouseDown.current) {
        event.preventDefault();

        const resizeWidth = startOffset.current + event.pageX;

        resizedLayout.current = applyResize(
          index,
          tableRef,
          resize,
          resizeWidth
        );
      }
    },
    [index, resize, resizedLayout, tableRef]
  );

  const onMouseUp = React.useCallback(() => {
    isMouseDown.current = false;
  }, []);

  React.useEffect(() => {
    const { current } = resizeRef;

    if (current) {
      current.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      if (current) {
        current.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return { resizeRef };
};
