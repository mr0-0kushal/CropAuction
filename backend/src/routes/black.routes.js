import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const CROP_API_URL = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24';
const API_KEY = '579b464db66ec23bdd00000127c243d395cf405f47672e417ff0c690';

const availableCrops = ['potato', 'wheat', 'rice', 'onion', 'tomato', 'corn'];
const availableStates = ['Delhi', 'Maharashtra', 'Uttar Pradesh', 'Punjab', 'Rajasthan'];

async function fetchLatestCropPrices(crops) {
    let allCrops = [];

    for (const state of availableStates) {
        for (const crop of crops) {
            const response = await axios.get(CROP_API_URL, {
                params: {
                    'api-key': API_KEY,
                    format: 'json',
                    'filters[Commodity]': crop,
                    'filters[State]': state
                }
            });

            const cropsData = response.data.records || [];
            allCrops = allCrops.concat(cropsData);
        }
    }

    if (allCrops.length === 0) {
        return 'No crop data found for the selected crops.';
    }

    const formatted = allCrops.map(crop =>
        `${crop.Commodity} (${crop.Variety}, Grade: ${crop.Grade})\nMin: ₹${crop.Min_Price}, Max: ₹${crop.Max_Price}, Modal: ₹${crop.Modal_Price}\nMarket: ${crop.Market}, Date: ${crop.Arrival_Date}\nState: ${crop.State}`
    ).join('\n\n');

    return formatted;
}

async function askGemini(prompt) {
    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: { 'Content-Type': 'application/json' },
                params: { key: process.env.GEMINI_API_KEY }
            }
        );

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    } catch (error) {
        console.error('Error calling Gemini:', error.message);
        return 'Error processing your query.';
    }
}

function extractCropsFromQuestion(question) {
    const lower = question.toLowerCase();
    return availableCrops.filter(crop => lower.includes(crop));
}

router.post("/ask", async (req, res) => {
    const { question } = req.body;
    console.log("Received question:", question);

    const crops = extractCropsFromQuestion(question);
    if (crops.length === 0) {
        return res.json({
            reply: 'Please mention a crop in your question. Example: "What is the price of potato?"'
        });
    }

    const cropData = await fetchLatestCropPrices(crops);
    const fullPrompt = `
You are an AI assistant named Black helping Indian farmers.

Here is the latest crop price info:\n${cropData}

Now answer this farmer's question in a helpful tone:\n"${question}"
    `;

    const reply = await askGemini(fullPrompt);
    console.log("repy")
    res.json({ reply });
});

export default router;
