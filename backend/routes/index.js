const express = require('express');
const router = express.Router();

const NoWhere = () =>{
    return (
        `
        <style>
        body {
            margin: 0;
            padding: 0;
            background: #f1f1f1;
            font-family: sans-serif;
        }
        .errorpage {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
        .errorpage h1 {
            font-size: 100px;
            color: #333;
            margin: 0;
            padding: 0;
            font-weight: bold;
        }
        .errorpage h2 {
            font-size: 50px;
            color: #333;
            margin: 0;
            padding: 0;
            font-weight: bold;
        }
        </style>
        <div class="errorpage">
            <h1>Are You Lost?</h1>
            <h2>Baby Girl</h2>
        </div>
        `
    )
}

router.get('/', (req, res) => {
    res.send(NoWhere());
});

router.get('*', (req, res) => {
    res.send(NoWhere());
});

module.exports = router;