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
    type: String,
    description: String,
    guests: Number,
    size: String,
    price: Number,
    image: String,
    location: String,
    amenities: [String],
    rating: Number
});

const Room = mongoose.model("Room", roomSchema);

// Seed initial data
async function seedRooms() {
    try {
        const count = await Room.countDocuments();
        if (count === 0) {
            const sampleRooms = [
                {
                    type: 'Deluxe Suite',
                    description: 'Spacious room with ocean view',
                    guests: 2,
                    size: '400 sq ft',
                    price: 299,
                    image: '/images/deluxe-suite.jpg',
                    location: 'Ocean Front',
                    amenities: ['King Bed', 'Ocean View', 'WiFi'],
                    rating: 4.8
                },
                {
                    type: 'Family Room',
                    description: 'Perfect for families with children',
                    guests: 4,
                    size: '600 sq ft',
                    price: 399,
                    image: '/images/family-room.jpg',
                    location: 'Garden View',
                    amenities: ['2 Queen Beds', 'Kitchenette', 'WiFi'],
                    rating: 4.5
                }
            ];
            await Room.insertMany(sampleRooms);
            console.log('Sample rooms added to database');
        }
    } catch (err) {
        console.error('Error seeding rooms:', err);
    }
}

mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
    seedRooms();
});

// Basic Routes
app.get('/', (req, res) => {
    try {
        res.render("index");
    } catch (err) {
        console.error("Error rendering index:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/contact', (req, res) => res.render('contact'));

// Login Route - FIXED
app.get('/login', (req, res) => {
    try {
        console.log("Rendering login page");
        res.render('login');
    } catch (err) {
        console.error("Error rendering login page:", err);
        res.status(500).send("Internal Server Error: " + err.message);
    }
});

// Login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username);
    // Here you would add authentication logic
    res.redirect('/');
});

// Room Routes
app.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.render('room', { rooms });
    } catch (err) {
        console.error('Error fetching rooms:', err);
        res.render('room', { rooms: [] });
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

// Error handling middleware
app.use((req, res) => {
    res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
