const express = require('express');
const mysql = require('mysql');
const app = express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'room_rental'
});

db.connect(err => {
    if (err) throw err;
    console.log("Database connected...");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/room/:id', (req, res) => {
    const roomId = req.params.id;
    const sql = "SELECT * FROM rooms WHERE id = ?";
    
    db.query(sql, [roomId], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.render('rooms-views', { room: results[0] });
        } else {
            res.status(404).send("Room not found");
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
console.log(room);

