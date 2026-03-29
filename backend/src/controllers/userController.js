const pool = require('../db/postgres');// Connect the database logic
const logger = require('../../middleware/logger'); // Connect our logger

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    logger.info('Fetched %d users', result.rows.length);
    res.status(200).json(result.rows);
  } catch (err) {
    logger.error('Error fetching users: %s', err.stack);
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', 
      [name, email]);
      logger.info('Created user: %s (%s)', name, email);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error('Error fetching users: %s', email, err.stack);
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', 
      [name, email, id]
    );
    logger.info('Updated user id=%s to %s (%s)', id, name, email);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    logger.error('Error updating user id=%s: %s', id, err.stack);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    logger.info('Deleted user id=%s', id);
    res.status(204).send();
  } catch (err) {
    logger.error('Error deleting user id=%s: %s', id, err.stack);
    res.status(500).json({ error: err.message });
  }
};