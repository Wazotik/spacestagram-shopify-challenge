require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	next();
// });

app.get("/", (req, res) => {
	res.send("Express app has started!!");
})

app.get("/data", async (req, res) => {
	console.log("data requested");
	const apiEndpoint = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&count=2`;
	const result = await axios.get(apiEndpoint);
	console.log(result.data);
	res.send(result.data);
})

app.post("/data", async (req, res) => {
	console.log("data requested");
	const numOfResults = req.body.numOfResults;
	const apiEndpoint = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&count=${numOfResults}`;
	const result = await axios.get(apiEndpoint);
	console.log(result.data);
	res.send(result.data);
})


app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
})


