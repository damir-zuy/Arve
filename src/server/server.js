import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Validate environment variables with detailed error messages
const requiredEnvVars = {
    MONGO_URI: 'MongoDB connection string',
    JWT_SECRET: 'JWT secret key for authentication',
    PORT: 'Port number for the server'
};

const missingVars = Object.entries(requiredEnvVars)
    .filter(([key]) => !process.env[key])
    .map(([key, desc]) => `${key} (${desc})`);

if (missingVars.length > 0) {
    console.error('\nMissing required environment variables:');
    console.error(missingVars.join('\n'));
    console.error('\nPlease check that:');
    console.error('1. The .env file exists in the project root directory');
    console.error(`2. The .env file is located at: ${path.resolve(__dirname, '../../.env')}`);
    console.error('3. The .env file contains all required variables\n');
    process.exit(1);
}

const app = express();
const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Update CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Improved MongoDB connection
mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    w: 'majority'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    }
});

const TradeLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pair: { type: String, required: true },
    date: { type: Date, required: true },
    session: { type: String, required: true },
    position: { type: String, required: true },
    result: { type: Number, required: true }, // Store as number
    rr: { type: Number, required: true }, // Store as number
    risk: { type: Number, required: true }, // Store as number
    note: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const TradeLog = mongoose.model('TradeLog', TradeLogSchema);

app.use(express.json()); // Middleware to parse JSON

// User Registration
app.post('/auth/signup', async (req, res) => {
    console.log('Registration request body:', req.body); // Log the request body
    try {
        const { email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
}

        // Add validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        // Generate a token for the user
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// User Login
app.post('/auth/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ token, redirectUrl: '/' });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


// Log a Trade
app.post('/api/trades', authenticateToken, async (req, res) => {
    try {
        const { pair, date, session, position, result, rr, risk, note } = req.body;
        
        // Validate required fields
        if (!pair || !date || !session || !position || result === undefined || rr === undefined || risk === undefined) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                received: { pair, date, session, position, result, rr, risk }
            });
        }

        const userId = req.user.id;

        // Clean and convert the data
        const cleanResult = parseFloat(result.toString().replace('%', ''));
        const cleanRr = parseFloat(rr.toString().replace('1:', ''));
        const cleanRisk = parseFloat(risk.toString().replace('%', ''));

        // Validate numeric values
        if (isNaN(cleanResult) || isNaN(cleanRr) || isNaN(cleanRisk)) {
            return res.status(400).json({ 
                message: 'Invalid numeric values',
                received: { result, rr, risk }
            });
        }

        const tradeLog = new TradeLog({
            userId,
            pair: pair.trim(), // Ensure pair is trimmed
            date: new Date(date),
            session,
            position,
            result: cleanResult,
            rr: cleanRr,
            risk: cleanRisk,
            note: note || ''
        });

        console.log('Attempting to save trade:', tradeLog); // Debug log

        const savedTrade = await tradeLog.save();
        res.status(201).json(savedTrade);
    } catch (error) {
        console.error('Error saving trade log:', error);
        res.status(400).json({
            message: 'Failed to log trade',
            error: error.message,
            details: error.errors // Include mongoose validation errors if any
        });
    }
});

// Fetch Trades for a Specific Day
app.get('/api/trades', authenticateToken, async (req, res) => {
    try {
        const dateParam = req.query.date; // Get date from query parameter
        const userId = req.user.id;

        if (!dateParam) {
            return res.status(400).json({ message: 'Date parameter is required' });
        }

        // Convert the date string to a Date object (start and end of the day)
        const startOfDay = new Date(dateParam);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(dateParam);
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch trades for the authenticated user on that day
        const trades = await TradeLog.find({
            userId: userId,
            date: { $gte: startOfDay, $lt: endOfDay }
        });

        res.json(trades);
    } catch (error) {
        console.error('Error fetching trades:', error);
        res.status(500).send('Failed to fetch trades');
    }
});


// Fetch Trades for a Specific Day using path parameter
app.get('/api/trades/:date', authenticateToken, async (req, res) => {
    try {
        const dateParam = req.params.date;
        const userId = req.user.id;

        const startOfDay = new Date(dateParam);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(dateParam);
        endOfDay.setHours(23, 59, 59, 999);

        const trades = await TradeLog.find({
            userId: userId,
            date: { $gte: startOfDay, $lt: endOfDay }
        }).lean(); // Use lean() for better performance

        // Format the trades for the client
        const formattedTrades = trades.map(trade => ({
            _id: trade._id,
            pair: trade.pair,
            date: trade.date,
            session: trade.session,
            position: trade.position,
            result: trade.result, // Client will format with %
            rr: trade.rr, // Client will format as 1:X
            risk: trade.risk, // Client will format with %
            note: trade.note || ''
        }));

        res.json(formattedTrades);
    } catch (error) {
        console.error('Error fetching trades:', error);
        res.status(500).send('Failed to fetch trades');
    }
});


// update trade (editing)
app.put('/api/trades/:id', authenticateToken, async (req, res) => {
    try {
        const tradeId = req.params.id;
        const userId = req.user.id;
        const updates = {
            pair: req.body.pair,  // Changed from asset to pair
            date: new Date(req.body.date),
            session: req.body.session,
            position: req.body.position,
            result: parseFloat(req.body.result),
            rr: parseFloat(req.body.rr),
            risk: parseFloat(req.body.risk),
            note: req.body.note || ''
        };

        const trade = await TradeLog.findOneAndUpdate(
            { _id: tradeId, userId },
            updates,
            { new: true }
        );

        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        res.json(trade);
    } catch (error) {
        console.error('Error updating trade:', error);
        res.status(500).json({ message: 'Failed to update trade', error: error.message });
    }
});

// delete trade
app.delete('/api/trades/:id', authenticateToken, async (req, res) => {
    try {
        const tradeId = req.params.id;
        const userId = req.user.id;

        // delete trade, belongs to current user
        const trade = await TradeLog.findOneAndDelete({ _id: tradeId, userId });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }

        res.json({ message: 'Trade deleted successfully' });
    } catch (error) {
        console.error('Error deleting trade:', error);
        res.status(500).json({ message: 'Failed to delete trade', error: error.message });
    }
});


// Fetch Trades for a Specific Month
app.get('/api/trades/month/:year/:month', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month) - 1; // JS months are 0-based

        // Create dates in UTC to avoid timezone issues
        const startDate = new Date(Date.UTC(year, month, 1));
        const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

        const tradeSummaries = await TradeLog.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$date" },
                    totalResult: { $sum: { $toDouble: "$result" } }, // Ensure result is treated as number
                    tradeCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    day: "$_id",
                    totalResult: 1,
                    tradeCount: 1,
                    _id: 0
                }
            },
            {
                $sort: { day: 1 } // Sort by day
            }
        ]);

        res.json(tradeSummaries);
    } catch (error) {
        console.error('Error fetching monthly trade summaries:', error);
        res.status(500).json({ message: 'Failed to fetch trade summaries' });
    }
});

// Fetch User Data
app.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) return res.sendStatus(404);
        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Update User Data
app.put('/user', authenticateToken, async (req, res) => {
    const { email, password } = req.body;
    const updates = {};

    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

    try {
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        if (!user) return res.sendStatus(404);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/trade-profits', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const trades = await TradeLog.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    totalProfit: { $sum: "$result" }
                }
            }
        ]);

        res.json(trades);
    } catch (error) {
        console.error("Error fetching trade profits:", error);
        res.status(500).json({ message: "Failed to fetch trade profits" });
    }
});

// Move root route before error handling middleware
app.get('/', (req, res) => {
    res.json({ 
        message: 'Arve backend is running 🚀',
        status: 'healthy',
        version: '1.0.0'
    });
});

// Error handling middleware should be last
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});