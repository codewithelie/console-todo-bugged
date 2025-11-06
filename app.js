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

const action = process.argv[2];
const value = process.argv.slice(3).join(' ');

if (action === 'add') {
  const todos = readTodos();
  todos.push({ id: Date.now(), title: value, done: false });
  writeTodos(todos);
  console.log(`✅ Tâche ajoutée : "${value}"`);
}

if (action === 'list') {
  const todos = readTodos();
  if (todos.length === 0) return console.log("📭 Aucune tâche.");
  todos.forEach(t => console.log(`${t.done ? '✔️' : '🕓'} ${t.title}`));
} 

if (action === 'done') {
  const todos = readTodos();
  const todo = todos.find(t => t.title === value);
  if (!todo) return console.log('❌ Tâche introuvable');
  todo.done = true;
  writeTodos(todos);
  console.log(`🎉 "${value}" est terminée`);
}

if (action === 'clear') {
  writeTodos([]);
  console.log('🧹 Liste vidée');
}