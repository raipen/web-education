const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'asdf'
}); 
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.get('/todo', (req, res) => {
  connection.connect();
  connection.query('SELECT * FROM todo', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
