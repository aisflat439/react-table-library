/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Content,
  Header,
  HeaderRow,
  Body,
  HeaderCell,
  Cell
} from '@table';

import { RowTreeSelect } from '@composite';
import { RowTree, CellTree } from '@tree';
import { RowSelect, CellSelect, HeaderCellSelect } from '@select';

const list = [
  {
    id: '1',
    name: 'Hello',
    stars: 24,
    count: 42,
    light: true,
    nodes: []
  },
  {
    id: '2',
    name: 'There',
    stars: 42,
    count: 24,
    light: false,
    nodes: [
      {
        id: '62',
        name: 'Welcome',
        stars: 322,
        count: 333,
        light: true,
        nodes: [
          {
            id: '6442',
            name: 'Hey',
            stars: 2322,
            count: 3333,
            light: true
          },
          {
            id: '6444',
            name: 'There There',
            stars: 3522,
            count: 3633,
            light: false,
            nodes: [
              {
                id: '64422',
                name: 'Hi',
                stars: 423224,
                count: 233334,
                light: true
              },
              {
                id: '64144',
                name: 'Ha ',
                stars: 135224,
                count: 136334,
                light: false
              }
            ]
          }
        ]
      },
      {
        id: '64',
        name: 'You',
        stars: 522,
        count: 633,
        light: false
      }
    ]
  },
  {
    id: '3',
    name: 'Nice',
    stars: 111,
    count: 111,
    light: true,
    nodes: []
  },
  {
    id: '4',
    name: 'To',
    stars: 122,
    count: 133,
    light: false,
    nodes: [
      {
        id: '42',
        name: 'Goodbye',
        stars: 422,
        count: 433,
        light: true
      },
      {
        id: '44',
        name: 'World',
        stars: 222,
        count: 233,
        light: false
      }
    ]
  },
  { id: '5', name: 'Meet', stars: 133, count: 122, light: true },
  {
    id: '6',
    name: 'You',
    stars: 155,
    count: 155,
    light: true,
    nodes: []
  },
  {
    id: '7',
    name: 'And Welcome To This Table Folks',
    stars: 155,
    count: 155,
    light: true
  }
];

storiesOf('02. Composite/ 01. Tree & Select', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTreeSelect key={item.id} item={item}>
                  {tableItem => (
                    <>
                      <Cell width="25%">{tableItem.name}</Cell>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTreeSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('only icon: tree on icon, select on row', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCell width="25%">Name</HeaderCell>
                <HeaderCell width="25%">Stars</HeaderCell>
                <HeaderCell width="25%">Light</HeaderCell>
                <HeaderCell width="25%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTreeSelect
                  key={item.id}
                  item={item}
                  treeType={RowTreeSelect.TREE_TYPES.ButtonTreeClick}
                >
                  {tableItem => (
                    <>
                      <CellTree item={tableItem} width="25%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="25%">{tableItem.stars}</Cell>
                      <Cell width="25%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="25%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTreeSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('only checkbox: select on checkbox, tree on row', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell width="20%">Name</HeaderCell>
                <HeaderCell width="20%">Stars</HeaderCell>
                <HeaderCell width="20%">Light</HeaderCell>
                <HeaderCell width="20%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTreeSelect
                  key={item.id}
                  item={item}
                  selectType={
                    RowTreeSelect.SELECT_TYPES.ButtonSelectClick
                  }
                  treeColumnLevel={2}
                >
                  {tableItem => (
                    <>
                      <CellSelect item={tableItem} />
                      <Cell width="20%">{tableItem.name}</Cell>
                      <Cell width="20%">{tableItem.stars}</Cell>
                      <Cell width="20%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="20%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTreeSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('select on checkbox, tree on icon', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell width="20%">Name</HeaderCell>
                <HeaderCell width="20%">Stars</HeaderCell>
                <HeaderCell width="20%">Light</HeaderCell>
                <HeaderCell width="20%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTreeSelect
                  key={item.id}
                  item={item}
                  selectType={
                    RowTreeSelect.SELECT_TYPES.ButtonSelectClick
                  }
                  treeType={RowTreeSelect.TREE_TYPES.ButtonTreeClick}
                  treeColumnLevel={2}
                >
                  {tableItem => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem} width="20%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="20%">{tableItem.stars}</Cell>
                      <Cell width="20%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="20%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTreeSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('select on row, tree on icon', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell width="20%">Name</HeaderCell>
                <HeaderCell width="20%">Stars</HeaderCell>
                <HeaderCell width="20%">Light</HeaderCell>
                <HeaderCell width="20%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTreeSelect
                  key={item.id}
                  item={item}
                  selectType={
                    RowTreeSelect.SELECT_TYPES.RowSelectClick
                  }
                  treeType={RowTreeSelect.TREE_TYPES.ButtonTreeClick}
                  treeColumnLevel={2}
                >
                  {tableItem => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem} width="20%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="20%">{tableItem.stars}</Cell>
                      <Cell width="20%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="20%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTreeSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  })
  .add('tree on row, select on checkbox', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Content>
            <Header>
              <HeaderRow>
                <HeaderCellSelect />
                <HeaderCell width="20%">Name</HeaderCell>
                <HeaderCell width="20%">Stars</HeaderCell>
                <HeaderCell width="20%">Light</HeaderCell>
                <HeaderCell width="20%">Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <RowTreeSelect
                  key={item.id}
                  item={item}
                  selectType={
                    RowTreeSelect.SELECT_TYPES.ButtonSelectClick
                  }
                  treeType={RowTreeSelect.TREE_TYPES.RowTreeClick}
                  treeColumnLevel={2}
                >
                  {tableItem => (
                    <>
                      <CellSelect item={tableItem} />
                      <CellTree item={tableItem} width="20%">
                        {tableItem.name}
                      </CellTree>
                      <Cell width="20%">{tableItem.stars}</Cell>
                      <Cell width="20%">
                        {tableItem.light.toString()}
                      </Cell>
                      <Cell width="20%">{tableItem.count}</Cell>
                    </>
                  )}
                </RowTreeSelect>
              ))}
            </Body>
          </Content>
        )}
      </Table>
    );
  });