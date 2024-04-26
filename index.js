const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('API IS RUNNING!!')
})

app.get('/board', (req, res) => {
    connection.query(
        'SELECT * FROM board',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/board/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )   
})

app.post('/board', (req, res) => {
    connection.query(
        'INSERT INTO `users` (`name`, `avatar`, `detail`, `picture`) VALUES (?, ?, ?, ?)',
        [req.body.name, req.body.avatar, req.body.detail, req.body.picture],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.put('/board', (req, res) => {
    connection.query(
        'UPDATE `users` SET `detail`=?, `picture`=? WHERE id =?',
        [req.body.fname, req.body.detail, req.body.picture, req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/users', (req, res) => {
    connection.query(   
        'SELECT * FROM users',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/users', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.post('/users', (req, res) => {
    connection.query(
        'INSERT INTO `users` (`email`, `password`, `name`, `lname`,`avatar`) VALUES (?, ?, ?, ?, ?)',
        [req.body.email, req.body.password, req.body.name, req.body.lname,req.body.avatar],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.put('/users', (req, res) => {
    connection.query(
        'UPDATE `users` SET `password`=?, `name`=?, `lname`=?, `email`=?, `avatar`=? WHERE id =?',
        [req.body.password, req.body.name, req.body.lname , req.body.email, req.body.avatar, req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.delete('/users', (req, res) => {
    connection.query(
        'DELETE FROM `users` WHERE id =?',
        [req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

