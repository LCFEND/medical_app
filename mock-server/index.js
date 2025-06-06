const express = require('express');
const cors = require('cors');
const { join } = require('path');
// lowdb v5+ exposes adapters like JSONFile under the `lowdb/node` entry
// Using `require('lowdb')` doesn't export JSONFile, so import it from `lowdb/node`
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 8181;

const dbFile = join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDb() {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
}

initDb();

app.use(cors());
app.use(express.json());

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, phone } = req.body;
  await db.read();
  const existing = db.data.users.find(u => u.email === email);
  if (existing) {
    return res.status(403).json({ error: 'A User with this email address already exists' });
  }
  const user = { id: nanoid(), email, password, name, phone, createdAt: new Date().toISOString() };
  db.data.users.push(user);
  await db.write();
  res.json({ authtoken: 'mock-token', user });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(403).json({ error: 'Invalid Credentials' });
  }
  res.json({ authtoken: 'mock-token', user });
});

app.get('/api/auth/user', async (req, res) => {
  const email = req.headers.email;
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.put('/api/auth/user', async (req, res) => {
  const email = req.headers.email;
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  Object.assign(user, req.body, { updatedAt: new Date().toISOString() });
  await db.write();
  res.json({ authtoken: 'mock-token', user });
});

const server = app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Set the PORT env variable to use a different port.`
    );
    process.exit(1);
  } else {
    throw err;
  }
});
