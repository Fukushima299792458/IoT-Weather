const express= require('express');
const router = express.Router();
const {fetch} = require('undici');

router.use('/status', async(req, res) => {
    console.log(req.query.update);
    fetch(`http://192.168.4.1/update?update=${req.query.update}`);
    res.sendStatus(200);
})

router.use('/data', async(req, res) => {
    res.send(await (await fetch('http://192.168.4.1')).json());
})

router.use('/', async(req, res) => {
    console.log(req.url);
    if (req.url != '/') {
        res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/' + req.url);
    } else {
        res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/CoreStuff/nav.html');
    }
})

module.exports = router;