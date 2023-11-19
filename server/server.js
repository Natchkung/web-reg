require('dotenv').config()
const connection = require('./db')
const cors = require('cors');
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const { readdirSync } = require('fs')
const env = process.env
const https = require("node:https");

const app = express()
// @ connect server -----
connection();
// ------------

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.static('public'));
app.use('/images', express.static('images'));


// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
 
// Creating server to accept request
http.createServer((req, res) => {
 
    // Parsing the URL
    const request = url.parse(req.url, true);
 
    // Extracting the path of file
    const action = request.pathname;
 
    // Path Refinements
    const filePath = path.join(__dirname,
        action).split("%20").join(" ");
 
    // Checking if the path exists
    fs.exists(filePath, function (exists) {
 
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }
 
        // Extracting file extension
        const ext = path.extname(action);
 
        // Setting default Content-Type
        const contentType = "text/plain";
 
        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType
        });
 
        // Reading the file
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
})
 
    // Listening to the PORT: 3000
    .listen(80, "localhost");

readdirSync('./api/routes')
    .map((r) => app.use('/api', require('./api/routes/' + r)))

app.listen(process.env.UNKNOW_PORT);

app.use((req,res)=>{
    res.status(404).send({url: `${req.originalUrl} not found`})
})

console.log(`Server Started on port ${env.UNKNOW_PORT}`);