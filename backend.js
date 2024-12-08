const hostname = '127.0.0.1';

const port = 3000;

const express = require('express');

const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();

const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json());

const db = new sqlite3.Database('./recipes.db');

//server for hosting
app.get('/', (req,res) => 
    {
      res.send('Hello world!');
    });
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
    
setInterval(() => {
    console.log('Heartbeat: Server is still running...');
}, 2500);

// Create the users table
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`;

db.run(createUsersTableQuery, (err) => {
  if (err) {
    return console.error("Error creating users table:", err.message);
  }
  console.log("Users table created successfully");
});

// Create the recipes table
const createRecipesTableQuery = `
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    category TEXT NOT NULL
  );
`;


db.run(createRecipesTableQuery, (err) => {
  if (err) {
    return console.error("Error creating recipes table:", err.message);
  }
  console.log("Recipes table created successfully");
});

// Close the database connection
db.close();


//signup api

app.post('/signup', (req, res) => {
    const{username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (username, password) VALUES (?,?)';
    db.run(sql, [username, hash], function (err) {
            if(err) {
                return res.status(500).json({message: 'error in signing up :('});
            }
            res.status(201).json({message: 'user created :) '});
        
    });
});


//login api

app.post('/login', (req, res) => {
    const {username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if(err || !row){
            return res.status(404).json({ message: 'User not found'});
        }
        if (bcrypt.compareSync(password, row.password)) {
            res.status(200).json({message: 'login successful'});
        } else {
            res.status(400).json({message: 'wrong password or username'});
        }
    });
});

//get recipes by category

app.get('/recipes/:category', (req, res) => {
    const {category} = req.params;
    db.all(
        'SELECT * FROM recipes WHERE category = ?',
        [category],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'cant find recipe'});
            }
            res.status(200).json(rows);
        }
    );
});

// create a new recipe
app.post('/recipes', (req, res) => {
    const {title, description, ingredients, instructions, category} = req.body;
    db.run(
        'INSERT INTO recipes (title,description, ingredients, instructions, category) VALUES(?,?,?,?,?)',
        [title, description, ingredients, instructions, category],
        function (err) {
            if (err) {
                return res.status(500).json({ message: 'problem while adding recipe'});

            }
            res.status(201).json({message: 'recipe added suuccessfuly'});
        }
    );
});

// update a recipe
app.put('/recipes/:id', (req, res) => {
    const {id} = req.params;
    const { title, description, ingredients, instructions, category} = req.body;

    db.run(
        'UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, category = ? WHERE id = ?',
        [title, description, ingredients, instructions, category, id],
        function (err) {
            if (err) {
                return res.status(500).json({message: 'error in recipe updating'});
            }
            res.status(200).json({message: 'update successfull'});
        }
    );
});

//delete recipe
app.delete('/recipe/:id', (req, res) => {
    const {id} = req.params;
    db.run('DELETE FROM recipes WHERE id = ?', [id], function (err){
        if(err) {
            return res.status(500).json({message: 'problem while deleting'});
        }
        res.status(200).json({message: 'recipe deleted'});
    });
});


