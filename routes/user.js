const express = require('express'),
    router = express.Router();

const User = require('../controllers/user');

// router.get('/users', User.list);

router.post('/cadastro', User.create);

router.post('/update', User.update);

module.exports = router;