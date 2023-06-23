import { Router } from 'express';
import { Todo } from '../models/todo';

const todoRouter: Router = Router();

const todos: Array<Todo> = [];

type RequestParams = {todoId: string};
todoRouter.get('/', (req, res, next) => {
  const {todoId} = req.params as RequestParams;
  res.status(200).json({todos: todos})
})

todoRouter.post('/todo', (req, res, next) => {
  const newTodo: Todo ={ id: '111', text: 'todo' };
  res.status(200).json(newTodo);
})

export default todoRouter;