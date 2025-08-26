// Quantum Sentinel - Production Server
const express = require('express');
const path = require('path');
const app = express();

// Security & Performance Headers
app.use((req, res, next) => {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve static files with caching
app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: true
}));

// Handle SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Quantum Sentinel Error:', err);
    res.status(500).send('Quantum systems offline. Please try again.');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌌 Quantum Sentinel running at http://localhost:${PORT}`);
});

module.exports = app;
