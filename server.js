require('dotenv').config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the 'waitlist' database with the 'emails' collection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB database 'waitlist'");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define the schema and explicitly set the collection to 'emails'
const waitlistSchema = new mongoose.Schema({
    email: { type: String, unique: true },
});

const Waitlist = mongoose.model("Email", waitlistSchema, "emails");

// API to add email to the waitlist
app.post("/join-waitlist", async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await Waitlist.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" }); // This will trigger the flash message on frontend
        }

        await Waitlist.create({ email });
        res.status(201).json({ message: "Successfully joined the waitlist!" });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
