import { Router } from 'express';
import { Todo } from '../models/todo';

const todoRouter: Router = Router();

const todos: Array<Todo> = [];

todoRouter.get('/', (req, res, next) => {
  res.status(200).json({todos: todos})
})

todoRouter.post('/todo', (req, res, next) => {
  const newTodo: Todo ={ id: '111', text: 'todo' };
})

export default todoRouter;