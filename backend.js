const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
<<<<<<< Updated upstream

const app = express();
app.use(bodyParser.json());
=======
const cors = require('cors');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors()); 
>>>>>>> Stashed changes

const db = new sqlite3.Database('./recipes.db');

// Server for hosting
app.get('/', (req, res) => {
<<<<<<< Updated upstream
    res.send('Hello world!');
});
=======
    const filePath = path.join(__dirname, 'home.html');  
    res.sendFile(filePath);
});
   

>>>>>>> Stashed changes

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

<<<<<<< Updated upstream
setInterval(() => {
    console.log('Heartbeat: Server is still running...');
}, 2500);

=======
>>>>>>> Stashed changes
// Create the users table with the role column
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
<<<<<<< Updated upstream
    role TEXT NOT NULL DEFAULT 'guest'  -- Default role is 'guest'
=======
    role TEXT NOT NULL DEFAULT 'guest'
>>>>>>> Stashed changes
  );
`;

db.run(createUsersTableQuery, (err) => {
  if (err) {
    console.error("Error creating users table:", err.message);
  } else {
    console.log("Users table created successfully");
  }
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
    console.error("Error creating recipes table:", err.message);
  } else {
    console.log("Recipes table created successfully");
  }
});

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    const { role } = req.body;  

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied. Admins only.' });
    }
    next();
}

// Signup API
app.post('/signup', (req, res) => {
    const { username, password, role } = req.body;
<<<<<<< Updated upstream

    
=======
>>>>>>> Stashed changes
    const userRole = role || 'guest';  

    const hash = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.run(sql, [username, hash, userRole], function (err) {
        if (err) {
            console.error("Error signing up:", err.message);  
            return res.status(500).json({ message: 'Error in signing up' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (bcrypt.compareSync(password, row.password)) {
            res.status(200).json({
                message: 'Login successful',
<<<<<<< Updated upstream
                role: row.role  // Include the role in the response
=======
                role: row.role
>>>>>>> Stashed changes
            });
        } else {
            res.status(400).json({ message: 'Wrong password or username' });
        }
    });
});

<<<<<<< Updated upstream
// Get recipes by category (available to everyone)
=======
// Get recipes by category
>>>>>>> Stashed changes
app.get('/recipes/:category', (req, res) => {
    const { category } = req.params;
    db.all(
        'SELECT * FROM recipes WHERE category = ?',
        [category],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Unable to find recipe' });
            }
            res.status(200).json(rows);
        }
    );
});

// Create a new recipe (admin only)
app.post('/recipes', isAdmin, (req, res) => {
    const { title, description, ingredients, instructions, category } = req.body;
    db.run(
        'INSERT INTO recipes (title, description, ingredients, instructions, category) VALUES (?, ?, ?, ?, ?)',
        [title, description, ingredients, instructions, category],
        function (err) {
            if (err) {
                return res.status(500).json({ message: 'Problem while adding recipe' });
            }
            res.status(201).json({ message: 'Recipe added successfully' });
        }
    );
});

// Update a recipe (admin only)
app.put('/recipes/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, instructions, category } = req.body;

    db.run(
        'UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, category = ? WHERE id = ?',
        [title, description, ingredients, instructions, category, id],
        function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error updating recipe' });
            }
            res.status(200).json({ message: 'Update successful' });
        }
    );
});

// Delete a recipe (admin only)
app.delete('/recipe/:id', isAdmin, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM recipes WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Problem while deleting' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    });
});
