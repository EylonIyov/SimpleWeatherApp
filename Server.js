import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());                // ← enable CORS for *all* origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/attractions", async (req, res) => {
  const { city, country } = req.query;
  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: `Give me a short description of attractions in ${city} in ${country}, use plain text.`
      }
    ]
  });
  res.json({ text: completion.choices[0].message.content });
});

app.get("/weather", async (req, res) => {
    const { city } = req.query;
    const apiRes = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    if (!apiRes.ok) {
      return res.status(500).json({ error: "Failed to fetch weather data" });
    }
    const weatherData = await apiRes.json();
    res.json(weatherData);
  });
  

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
