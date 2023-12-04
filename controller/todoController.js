
const Todo = require('../model/todoModel');
const { errorHandler, notFoundResponse } = require('../utils/commonUtils');

const TodoController = {
  getAllTodos: async (req, res) => {
    try {
      const userId = req.user.id; 
      const todos = await Todo.getAllByUserId(userId);
      res.json(todos);
    } catch (error) {
      console.log(error)
    }
  },

  getTodoById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; 

      const todo = await Todo.getTodoById(id, userId);
      if (!todo) {
        return notFoundResponse(res, 'Todo not found');
      }

      res.json(todo);
    } catch (error) {
      console.log(error)
    }
  },

  createTodo: async (req, res) => {
    try {
      const { title, description, state } = req.body;
      const userId = req.user.id; 

      const todoData = { title, description, state, user_id: userId };
      await Todo.create(todoData);

      res.status(201).json({ message: 'Todo created successfully' });
    } catch (error) {
      console.log(error)
    }
  },

  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; 
      const { title, description, state } = req.body;

      const todo = await Todo.getTodoById(id, userId);
      if (!todo) {
        return notFoundResponse(res, 'Todo not found');
      }

      await Todo.updateTodo(id, { title, description, state });

      res.json({ message: 'Todo updated successfully' });
    } catch (error) {
      console.log(error)
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; 

      const todo = await Todo.getTodoById(id, userId);
      if (!todo) {
        return notFoundResponse(res, 'Todo not found');
      }

      await Todo.deleteTodo(id);

      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
       console.log(error)
    }
  },
};

module.exports = TodoController;
