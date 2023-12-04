
const express = require('express');
const TodoController = require('../controller/todoController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', authenticateUser, TodoController.getAllTodos);
router.post('/', authenticateUser, TodoController.createTodo);
router.get('/:id', authenticateUser, TodoController.getTodoById);
router.put('/:id', authenticateUser, TodoController.updateTodo);
router.delete('/:id', authenticateUser, TodoController.deleteTodo);

module.exports = router;
