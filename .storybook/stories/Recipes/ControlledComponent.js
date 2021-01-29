/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell
} from '@table-library/react-table-library/lib/table';

import {
  useSort,
  HeaderCellSort
} from '@table-library/react-table-library/lib/sort';

import { nodes } from '../data';

storiesOf('06. Recipes/ 01. Controlled Component', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const SORTS = {
      NONE: {
        label: 'None',
        sortKey: 'NONE',
        sortFn: array => array
      },
      TASK: {
        label: 'Task',
        sortKey: 'TASK',
        sortFn: array =>
          array.sort((a, b) => a.name.localeCompare(b.name))
      },
      DEADLINE: {
        label: 'Deadline',
        sortKey: 'DEADLINE',
        sortFn: array => array.sort((a, b) => a.deadline - b.deadline)
      },
      TYPE: {
        label: 'Type',
        sortKey: 'TYPE',
        sortFn: array =>
          array.sort((a, b) => a.type.localeCompare(b.type))
      },
      COMPLETE: {
        label: 'Complete',
        sortKey: 'COMPLETE',
        sortFn: array =>
          array.sort((a, b) => a.isComplete - b.isComplete)
      },
      TASKS: {
        label: 'Tasks',
        sortKey: 'TASKS',
        sortFn: array =>
          array.sort(
            (a, b) => (a.nodes || []).length - (b.nodes || []).length
          )
      }
    };

    const data = { nodes };

    const sort = useSort({
      onChange: onSortChange
    });

    function onSortChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <select
          value={sort.state.sortKey}
          onChange={event =>
            sort.fns.onToggleSort(SORTS[event.target.value])
          }
        >
          {Object.keys(SORTS).map(key => (
            <option key={key} value={SORTS[key].sortKey}>
              {SORTS[key].label}
            </option>
          ))}
        </select>

        <Table data={data} sort={sort}>
          {tableList => (
            <>
              <Header>
                <HeaderRow>
                  {Object.keys(SORTS)
                    .filter(key => key !== 'NONE')
                    .map(key => (
                      <HeaderCellSort
                        key={key}
                        sortKey={SORTS[key].sortKey}
                        sortFn={SORTS[key].sortFn}
                      >
                        {SORTS[key].label}
                      </HeaderCellSort>
                    ))}
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map(item => (
                  <Row item={item} key={item.id}>
                    {tableItem => (
                      <React.Fragment key={tableItem.id}>
                        <Cell>{tableItem.name}</Cell>
                        <Cell>
                          {tableItem.deadline.toLocaleDateString(
                            'fr-CA',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }
                          )}
                        </Cell>
                        <Cell>{tableItem.type}</Cell>
                        <Cell>{tableItem.isComplete.toString()}</Cell>
                        <Cell>{tableItem.nodes?.length}</Cell>
                      </React.Fragment>
                    )}
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </>
    );
  });
