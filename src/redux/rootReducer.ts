import { combineReducers } from 'redux';
import counterSlice from './features/counterSlice';
import todosReducer from './features/todosSlice';

const rootReducer = combineReducers({
  counter: counterSlice,
  todos: todosReducer,
});

export default rootReducer;
