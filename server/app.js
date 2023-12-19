require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database');

//middleware
app.use(cors());
app.use(express.json());


//routes
//create a todo

app.post('/todos', async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) values($1) RETURNING *',[description]);
        res.json(newTodo);
    } catch (error) {
        console.error(error.message);
    }
})

//get all todo
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get a todo

app.get('/todos/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE tid = $1', [id]);
        res.json(todo.rows[0]);    
    } catch (error) {
        console.error(error.message);
    }
});

// update a todo

app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query('UPDATE todo SET description = $1 WHERE tid = $2',[description, id]);
        res.json(`Todo ${id} updated with - ${description}`);
    } catch (error) {
        console.error(error.message);
    }
})

// delete a todo

app.delete('/todos/:id', async(req,res) => {
    try {
        const { id }  = req.params;
        const todo = await pool.query('DELETE FROM todo WHERE tid = $1',[id]);
        res.json(`Todo ${id} deleted.`);
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(process.env.APP_PORT,() => {
    console.log(`Listening on PORT - ${process.env.APP_PORT}`);
})