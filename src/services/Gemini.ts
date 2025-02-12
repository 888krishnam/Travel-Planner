import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
model: "gemini-2.0-flash-exp",
});

const generationConfig = {
temperature: 1,
topP: 0.95,
topK: 40,
maxOutputTokens: 8192,
responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate a JSON travel plan for Las Vegas for 3 days for a couple on a budget. Include a list of at least three budget-friendly hotels with their hotelName, hotelAddress, price, rating. The itinerary should be structured an array of objects which include a list of places to visit each day. For each place, provide the place name, details about the place, and the best time to visit. The itinerary should cover three days."
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
  "hotels": [
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": "$30-$70/night (depending on season and deals)",
      "rating": "3.5 stars"
    },
    {
      "hotelName": "Excalibur Hotel & Casino",
      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price": "$40-$80/night (depending on season and deals)",
      "rating": "4 stars"
    },
    {
      "hotelName": "Luxor Hotel and Casino",
      "hotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
      "price": "$50-$90/night (depending on season and deals)",
      "rating": "4 stars"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "placeName": "Welcome to Las Vegas Sign",
          "placeDetails": "Iconic photo opportunity. Free to visit.",
          "bestTimeToVisit": "Late afternoon/evening (to avoid daytime heat)"
        },
        {
          "placeName": "Bellagio Fountains",
          "placeDetails": "Free water show choreographed to music and lights. Runs every 30 minutes in the afternoon and every 15 minutes in the evening.",
          "bestTimeToVisit": "Late afternoon/sunset for best views"
        },
        {
          "placeName": "Free Shows on the Strip (e.g., Mirage Volcano)",
          "placeDetails": "Check show schedules online. Many hotels offer free shows.",
          "bestTimeToVisit": "Late afternoon/sunset for best views"
        }
      ]
    },
    {
      "day": 2,
      "places": [
        {
          "placeName": "Fremont Street Experience",
          "placeDetails": "Light and sound show on a canopy over Fremont Street. Free to walk around.",
          "bestTimeToVisit": "Late afternoon/evening for best views"
        },
        {
          "placeName": "Downtown Casinos (e.g., Golden Nugget)",
          "placeDetails": "Explore classic Vegas casinos with lower table minimums than the Strip.",
          "bestTimeToVisit": "Late afternoon/evening"
        }
      ]
    },
    {
      "day": 3,
      "places": [
        {
          "placeName": "High Roller Observation Wheel",
          "placeDetails": "Giant Ferris wheel offering panoramic views of Las Vegas.",
          "bestTimeToVisit": "Late afternoon/sunset for best views"
        },
        {
          "placeName": "LINQ Promenade",
          "placeDetails": "Outdoor shopping, dining, and entertainment district connected to the High Roller.",
          "bestTimeToVisit": "Late afternoon/sunset for best views"
        }
      ]
    }
  ]
}`
                },
            ],
        },
    ],
});