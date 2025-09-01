import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const QUESTIONS_FILE = "./questions.json";

// 📥 Get questions
app.get("/api/questions", (req, res) => {
    fs.readFile(QUESTIONS_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        res.json(JSON.parse(data));
    });
});

// ➕ Add question
app.post("/api/questions", (req, res) => {
    fs.readFile(QUESTIONS_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });

        let questions = JSON.parse(data);
        const newQuestion = {
            id: questions.length + 1,
            question: req.body.question,
            options: req.body.options,
            answer: req.body.answer,
        };
        questions.push(newQuestion);

        fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 2), err2 => {
            if (err2) return res.status(500).json({ error: "File write error" });
            res.json(newQuestion);
        });
    });
});

// ✏️ Edit question
app.put("/api/questions/:id", (req, res) => {
    fs.readFile(QUESTIONS_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        let questions = JSON.parse(data);
        const idx = questions.findIndex(q => q.id == req.params.id);
        if (idx === -1) return res.status(404).json({ error: "Not found" });

        questions[idx] = { ...questions[idx], ...req.body };

        fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 2), err2 => {
            if (err2) return res.status(500).json({ error: "File write error" });
            res.json(questions[idx]);
        });
    });
});

// 🗑 Delete question
app.delete("/api/questions/:id", (req, res) => {
    fs.readFile(QUESTIONS_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        let questions = JSON.parse(data);
        questions = questions.filter(q => q.id != req.params.id);

        fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 2), err2 => {
            if (err2) return res.status(500).json({ error: "File write error" });
            res.json({ success: true });
        });
    });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
