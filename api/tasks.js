const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'db.json');

function getDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = getDB();
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        if (id) {
          const task = db.tasks.find(t => t.id === id);
          return res.status(200).json(task || {});
        }
        return res.status(200).json(db.tasks);

      case 'POST':
        const newTask = {
          ...req.body,
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        db.tasks.push(newTask);
        saveDB(db);
        return res.status(201).json(newTask);

      case 'PATCH':
        if (!id) return res.status(400).json({ error: 'ID required' });
        const taskIndex = db.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

        db.tasks[taskIndex] = {
          ...db.tasks[taskIndex],
          ...req.body,
          updatedAt: new Date().toISOString(),
        };
        saveDB(db);
        return res.status(200).json(db.tasks[taskIndex]);

      case 'DELETE':
        if (!id) return res.status(400).json({ error: 'ID required' });
        const deleteIndex = db.tasks.findIndex(t => t.id === id);
        if (deleteIndex === -1) return res.status(404).json({ error: 'Task not found' });

        db.tasks.splice(deleteIndex, 1);
        saveDB(db);
        return res.status(204).end();

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
