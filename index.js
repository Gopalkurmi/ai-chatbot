import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("AI Chatbot API Running");
});

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    
    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });

        res.send({
            reply: response.choices[0].message.content
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Something went wrong" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});
