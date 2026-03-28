// IMPORT EXPRESS
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Server is working!");
});
// MIDDLEWARE (allows JSON data)
app.use(express.json());


// FAKE DATABASE
let todos = [
    { id: 1, task: "Learn Node.js", completed: false },
    { id: 2, task: "Build API", completed: true }
];


// CREATE (POST)
app.post('/todos', (req, res) => {
    const { task } = req.body;

    // Validation
    if (!task) {
        return res.status(400).json({ message: "Task is required" });
    }

    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});


// READ ALL (GET)
app.get('/todos', (req, res) => {
    res.json(todos);
});



// GET ACTIVE TODOS
app.get('/todos/active', (req, res) => {
    const activeTodos = todos.filter(t => !t.completed);
    res.json(activeTodos);
});


// UPDATE (PUT)
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});


// DELETE
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    todos = todos.filter(t => t.id !== id);

    res.json({ message: "Todo deleted" });
});


 // READ ONE (GET BY ID)#ID APA

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
});




// START SERVER (ALWAYS LAST)
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});