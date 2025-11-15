const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory storage for students
let students = ['sree','luci'];
let idCounter = 1;

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// POST - Add a new student
app.post('/students', (req, res) => {
    const { name, age, course } = req.body;
    const newStudent = { id: idCounter++, name, age, course };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PATCH - Update student details
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        const { name, age, course } = req.body;
        if (name) student.name = name;
        if (age) student.age = age;
        if (course) student.course = course;
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// DELETE - Remove a student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        const removedStudent = students.splice(index, 1);
        res.json(removedStudent[0]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
