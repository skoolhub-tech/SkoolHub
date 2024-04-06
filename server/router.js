const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/login', controller.userLogin);



module.exports = router;
