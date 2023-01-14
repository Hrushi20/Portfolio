const express = require("express");

const app = express();

const PORT = 8082;

app.use(express.static('public'));

app.listen(PORT, ()=>{
	console.log("Server running on ",PORT);
})
