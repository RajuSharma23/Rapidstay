const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {
        phoneNumber: req.query.phoneNumber || '',
        error: req.query.error || '',
        isLoading: false
    });
});

router.post('/login', (req, res) => {
    // Authentication logic
});

module.exports = router;