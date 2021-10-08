const express = require('express');

const server = express();

server.all('/', (req, res)=>{
    res.send('Brave-Bot online.')
})


function keepAlive(){
    server.listen(3000, ()=>{console.log("Server online.")});
}

module.exports = keepAlive;
