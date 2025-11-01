const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all stored procedures
router.get('/procedures', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT ROUTINE_NAME as name, ROUTINE_DEFINITION as definition, 
             ROUTINE_COMMENT as comment, CREATED as created
      FROM information_schema.ROUTINES
      WHERE ROUTINE_SCHEMA = DATABASE() AND ROUTINE_TYPE = 'PROCEDURE'
      ORDER BY ROUTINE_NAME
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching procedures:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all functions
router.get('/functions', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT ROUTINE_NAME as name, ROUTINE_DEFINITION as definition,
             ROUTINE_COMMENT as comment, CREATED as created
      FROM information_schema.ROUTINES
      WHERE ROUTINE_SCHEMA = DATABASE() AND ROUTINE_TYPE = 'FUNCTION'
      ORDER BY ROUTINE_NAME
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching functions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all triggers
router.get('/triggers', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT TRIGGER_NAME as name, EVENT_MANIPULATION as event,
             EVENT_OBJECT_TABLE as table_name, ACTION_STATEMENT as definition,
             ACTION_TIMING as timing, CREATED as created
      FROM information_schema.TRIGGERS
      WHERE TRIGGER_SCHEMA = DATABASE()
      ORDER BY TRIGGER_NAME
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching triggers:', error);
    res.status(500).json({ error: error.message });
  }
});

// Execute a stored procedure
router.post('/execute', async (req, res) => {
  try {
    const { procedureName, parameters } = req.body;
    
    // Build the CALL statement
    const placeholders = parameters ? parameters.map(() => '?').join(', ') : '';
    const query = `CALL ${procedureName}(${placeholders})`;
    
    const [rows] = await promisePool.query(query, parameters || []);
    res.json({ 
      success: true, 
      message: `Procedure ${procedureName} executed successfully`,
      result: rows 
    });
  } catch (error) {
    console.error('Error executing procedure:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get procedure/function details
router.get('/details/:type/:name', async (req, res) => {
  try {
    const { type, name } = req.params;
    const routineType = type.toUpperCase();
    
    const [rows] = await promisePool.query(`
      SELECT ROUTINE_NAME, ROUTINE_DEFINITION, ROUTINE_TYPE,
             DTD_IDENTIFIER, ROUTINE_COMMENT, CREATED, LAST_ALTERED
      FROM information_schema.ROUTINES
      WHERE ROUTINE_SCHEMA = DATABASE() 
        AND ROUTINE_TYPE = ? 
        AND ROUTINE_NAME = ?
    `, [routineType, name]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: `${type} not found` });
    }
    
    // Get parameters
    const [params] = await promisePool.query(`
      SELECT PARAMETER_NAME, PARAMETER_MODE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
      FROM information_schema.PARAMETERS
      WHERE SPECIFIC_SCHEMA = DATABASE() 
        AND SPECIFIC_NAME = ?
      ORDER BY ORDINAL_POSITION
    `, [name]);
    
    res.json({ 
      routine: rows[0],
      parameters: params
    });
  } catch (error) {
    console.error('Error fetching routine details:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
