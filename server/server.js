const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Express app has started!!");
})

app.get("/data", async (req, res) => {
	const apiEndpoint = "https://api.nasa.gov/planetary/apod?api_key=ACwqZciCzQfnUsRxIMfNgzH3ySBeo6OOSDXT8KhL&count=30";
	const result = await axios.get(apiEndpoint);
	console.log(result.data);
	res.send(result.data);
})


app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
})


