import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Features/Layout', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
  .add('evenly distributed (%)', () => {
    const data = { nodes };

    return (
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('percentage', () => {
    const theme = useTheme({
      BaseCell: `
        &:nth-of-type(1) {
          min-width: 35%;
          width: 35%;
        }

        &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
          min-width: 15%;
          width: 15%;
        }

        &:nth-of-type(5) {
          min-width: 20%;
          width: 20%;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('px', () => {
    const theme = useTheme({
      BaseCell: `
        &:nth-of-type(1) {
          min-width: 100px;
          width: 100px;
        }

        &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
          min-width: 75px;
          width: 75px;
        }

        &:nth-of-type(5) {
          min-width: 100px;
          width: 100px;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('class', () => {
    const theme = useTheme({
      BaseCell: `
        &.task {
          min-width: 35%;
          width: 35%;
        }

        &.deadline, &.type, &.complete {
          min-width: 100px;
          width: 100px;
        }

        &.tasks {
          min-width: 35%;
          width: 35%;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className="task">Task</HeaderCell>
                <HeaderCell className="deadline">Deadline</HeaderCell>
                <HeaderCell className="type">Type</HeaderCell>
                <HeaderCell className="complete">Complete</HeaderCell>
                <HeaderCell className="tasks">Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell className="task">{item.name}</Cell>
                  <Cell className="deadline">
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell className="type">{item.type}</Cell>
                  <Cell className="complete">{item.isComplete.toString()}</Cell>
                  <Cell className="tasks">{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('fill space', () => {
    const theme = useTheme({
      BaseCell: `
        &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3) {
          min-width: 15%;
          width: 15%;
        }

        &:nth-of-type(4) {
          flex: 1;
        }

        &:nth-of-type(5) {
          min-width: 100px;
          width: 100px;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('squeeze space', () => {
    const theme = useTheme({
      BaseCell: `
        &:nth-of-type(1), &:nth-of-type(2) {
          min-width: 25%;
          width: 25%;
        }

        &:nth-of-type(3) {
          width: 25%;
        }

        &:nth-of-type(4) {
          min-width: 100px;
          width: 100px;
        }

        &:nth-of-type(5) {
          min-width: 25%;
          width: 25%;
        }
      `,
    });

    const data = { nodes };

    return (
      <Table data={data} theme={theme} layout={{ custom: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('horizontal scroll', () => (
    <>
      See <strong>Features/Horizontal Scroll</strong>
    </>
  ));
