/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export default css`
  display: flex;
  align-items: center;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  width: 100%;
  height: 100%;

  &.narrow {
    width: auto;
  }

  &.active {
    font-weight: bold;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div:after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;
