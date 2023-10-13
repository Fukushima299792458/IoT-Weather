const express= require('express');
const router = express.Router();
const {fetch} = require('undici');
// var data;

router.use('/status', async(req, res) => {
    console.log(req.query.update);
    // if (req.query.update) {
        // try {
    fetch(`http://192.168.4.1/update?update=${req.query.update}`);
        // } catch (error) {
        //     res.errored;
        //     // throw error;
        // }
    // }
    // const data = await (await fetch('http://192.168.4.1')).json();
    // data.InbuiltBrightness = (data.InbuiltAuto) ? data.InbuiltBrightness : undefined;
    // try {
        // res.send(await (await fetch('http://192.168.4.1')).json());
    // } catch (error) {
    //     res.errored;
    //     // throw error;
    // }
    res.sendStatus(200);
})

router.use('/data', async(req, res) => {
    res.send(await (await fetch('http://192.168.4.1')).json());
})

// router.use('/load.html', async(req, res) => {
//     // try {
//     res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/views/home/load.html');
//     // } catch (error) {
//     //     res.send('Couldn`t connect to the server. index.js:10');
//     // }
// })

// router.use('/index.html', async(req, res) => {
//     // try {
//     res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/views/home/index.html');
//     // } catch (error) {
//     //     res.send('Couldn`t connect to the server. index.js:10');
//     // }
// })

// router.use('/spaceMusic.mp3', async(req, res) => {
//     // try {
//     res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/views/home/spaceMusic.mp3');
//     // } catch (error) {
//     //     res.send('Couldn`t connect to the server. index.js:10');
//     // }
// })

router.use('/', async(req, res) => {
    console.log(req.url);
    if (req.url != '/') {
        res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/' + req.url);
    } else {
        res.sendFile('/Documents/Phoenix/School/IT/IoT-Weather/CoreStuff/nav.html');
    }
    // res.send(await (await fetch('http://192.168.4.1')).json());
})

// async function getApiData(http) {
//     try { 

//         return await (await fetch('http://192.168.4.1' + ((http) ? http : ''))).json();
//     } catch (error) {
//         // throw error;
//     }
    
// }



module.exports = router;