require('dotenv').config();

const express = require('express');
const users = require('./api/users')
const cors = require('cors')

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT || 9000;

server.get('/api/users', (req, res) => {
    res.json(users);
})

server.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password };
    users.push(newUser);
    res.json(newUser);
});

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        res.json({ message: `Welcome, ${username}!`});
    } else {
        res.status(401).json({ message: 'Invalid credentials'})
    }
});

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });
  