import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../redux/features/todosSlice';
import { Todo } from '../redux/types';

const TodoApp: React.FC = () => {
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.data);
  const isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const error = useSelector((state: RootState) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    const newTodo = { id: Date.now(), title: 'New Roy Todo', completed: true };
    dispatch(addTodo(newTodo));
  };

  const handleUpdateTodo = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTodo(updatedTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Todos</h1>
      <button className="btn btn-primary mb-4" onClick={handleAddTodo}>Add Todo</button>
      {todos.map((todo) => (
        <div key={todo.id} className="mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleUpdateTodo(todo)}
            />
          </div>
          <label  className="form-check-label">{todo.title}</label>
          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
