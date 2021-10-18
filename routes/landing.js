const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/', async (req, res) => {
    try{
        res.status(200).render('lol/landing', {title: 'Landing'});
    } catch(e){
        console.log(e);
        res.status(500).render('lol/error', {error: e, title: 'Error 500'});
    }
});

module.exports = router;