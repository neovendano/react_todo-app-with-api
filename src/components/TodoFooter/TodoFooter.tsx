import React, { useContext } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { TodoContext } from '../../context/TodoContext';

interface Props {
  filter: Filter,
  setFilter: (newFilter: Filter) => void,
}

export const TodoFooter: React.FC<Props> = ({
  filter,
  setFilter,
}) => {
  const {
    activeTodos,
    completedTodos,
    clearCompleted,
  } = useContext(TodoContext);

  const activeTodosCount = activeTodos.length;
  const completedTodosCount = completedTodos.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} item${activeTodosCount === 1 ? '' : 's'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.keys(Filter).map((filterName) => (
          <a
            href={`#/${filterName}`}
            className={classNames('filter__link', {
              selected: filterName === filter,
            })}
            data-cy={`FilterLink${filterName}`}
            onClick={() => setFilter(filterName as Filter)}
          >
            {filterName}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          visible: completedTodos.length,
          hidden: !completedTodos.length,
        })}
        data-cy="ClearCompletedButton"
        disabled={!completedTodosCount}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};