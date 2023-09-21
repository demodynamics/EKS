const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

// Route to return "PONG" in HTML format
app.get('/ping', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.status(200).send('<html><body>PONG</body></html>');
});

// Route to fetch and return current weather in London, UK, in HTML format
app.get('/', async (req, res) => {
  try {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'a6311858fb35df63b55216bae4aa952a';
    const city = 'London,UK';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiURL);
    const data = response.data;
    const weatherDescription = data.weather[0].description;
    const temperatureKelvin = data.main.temp;

    // Convert temperature to Celsius
    const temperatureCelsius = temperatureKelvin - 273.15;

    // Create an HTML response
    const htmlResponse = `<html><body><h1>Weather in London, UK</h1><p>Description: ${weatherDescription}</p><p>Temperature: ${temperatureCelsius.toFixed(2)}°C</p></body></html>`;
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.status(200).send(htmlResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching weather data.');
  }
});

// Route to return "HEALTHY" in JSON format
app.get('/health', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.status(200).json({ status: 'HEALTHY' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
