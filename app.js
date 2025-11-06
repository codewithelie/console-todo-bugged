const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'todos.json');

if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify([]));

function readTodos() {
  const data = fs.readFileSync(FILE, 'utf8');
  return data ? JSON.parse(data) : [];
}

function writeTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

console.log("📋 TodoConsole prêt !");