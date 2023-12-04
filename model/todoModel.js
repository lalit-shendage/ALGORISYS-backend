
const db = require('../config/db');

const Todo = {
  create: (todoData) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO todos (title, description, state, user_id) VALUES (?, ?, ?, ?)';
      const values = [todoData.title, todoData.description, todoData.state, todoData.user_id];

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getAllByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM todos WHERE user_id = ?';
      const values = [userId];

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getTodoById: (id, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM todos WHERE id = ? AND user_id = ?';
      const values = [id, userId];

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]); 
        }
      });
    });
  },
  updateTodo: (id, todoData) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE todos SET title = ?, description = ?, state = ? WHERE id = ?';
      const values = [todoData.title, todoData.description, todoData.state, id];

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  
  deleteTodo: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM todos WHERE id = ?';
      const values = [id];

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

module.exports = Todo;
