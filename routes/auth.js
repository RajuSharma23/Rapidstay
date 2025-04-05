router.get('/login', (req, res) => {
    res.render('login', {
        phoneNumber: req.query.phoneNumber || '',
        error: req.query.error || '',
        isLoading: false
    });
});