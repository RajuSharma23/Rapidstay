const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/room_rental", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.error("MongoDB connection error:", err));

// Room Schema & Model
const roomSchema = new mongoose.Schema({
    title: String,
    location: String,
    price: Number,
    description: String,
    image: String
});

const Room = mongoose.model("Room", roomSchema);

// Route to Render Rooms Page
app.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.render("index", { rooms });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Internal Server Error");
    }
});

// API for Filtering Rooms
app.get("/filter", async (req, res) => {
    try {
        let { location, price } = req.query;
        price = price ? parseFloat(price) : 99999;
        
        let filter = { price: { $lte: price } };
        if (location && location !== "all") {
            filter.location = location;
        }
        
        const rooms = await Room.find(filter);
        res.json(rooms);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route to Render a Single Room Page
app.get("/room/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send("Room not found");
        }
        res.render("rooms-views", { room });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.set("view engine", "ejs");
app.use(express.static("public"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
