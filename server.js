const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const PORT = 8082;
const app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.post("/api/triggerBuild",(req,res,next)=>{
	console.log(req.body);
	console.log("Inside post req");
	return res.json({name:"Thank you"});
});

app.listen(PORT, ()=>{
	console.log("Server running on ",PORT);
})
