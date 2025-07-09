import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const app = express();
const PORT = process.env.PORT || 4000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const LLAMA_MODEL = 'meta-llama/llama-4-maverick-17b-128e-instruct';

app.use(cors());
app.use(express.json());

let resumeText = '';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const resumePath = path.join(__dirname, 'resume.pdf');


async function extractResumeText() {
    try {
        const data = new Uint8Array(fs.readFileSync(resumePath));
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        resumeText = text;
        console.log('Resume text loaded.');
    } catch (err) {
        console.error('Failed to load resume text:', err);
        resumeText = '';
    }
}

extractResumeText();

const portfolioContext = `
You are Pujan Mevawala, a passionate developer. Answer all questions as if you are Pujan, in first person, using the following information:
- Name: Pujan Mevawala
- Age: 21
- Location: Surat, Gujarat
- Tech Stack: JavaScript, React, Node, MongoDB
- About: Passionate developer exploring technology and building stellar projects.
- Projects: Galactic App, Orbit Simulator, Space Blog
- Skills: JavaScript, React, Node.js, WebGL, UI/UX, AI/ML, CSS, Framer Motion, Three.js, APIs
- Fun Facts: 🚀 Astronomy, 🎮 Sci-fi games, 🎵 Synthwave music, 🌌 Backyard telescope
`;

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Llama proxy server is running.');
});

app.post('/api/llama-chat', async (req, res) => {
    console.log('--- /api/llama-chat called ---', req.body);
    const { message, portfolio } = req.body;
    console.log('Received /api/llama-chat request:', req.body);
    if (!message) return res.status(400).json({ error: 'No message provided' });
    try {
        // Restrict to only answer about you/portfolio/resume
        const aboutMeKeywords = [
            'pujan', 'mevawala', 'portfolio', 'resume', 'project', 'skill', 'about you', 'about yourself', 'your experience', 'your education', 'your work', 'your job', 'your background', 'your hobbies', 'your interests', 'your tech', 'your stack', 'your contact', 'your email', 'your phone', 'your address', 'your github', 'your linkedin', 'your website', 'your blog', 'your fun facts', 'your age', 'your location', 'your city', 'your state', 'your country', 'your achievements', 'your awards', 'your certifications', 'your summary', 'your bio', 'your introduction', 'your intro', 'your education', 'your degree', 'your university', 'your college', 'your school', 'your experience', 'your work', 'your employment', 'your company', 'your companies', 'your position', 'your title', 'your role', 'your responsibilities', 'your duties', 'your tasks', 'your contributions', 'your technologies', 'your frameworks', 'your languages', 'your tools', 'your libraries', 'your platforms', 'your systems', 'your databases', 'your apis', 'your ai', 'your ml', 'your webgl', 'your framer motion', 'your three.js', 'your css', 'your javascript', 'your react', 'your node', 'your mongo', 'your astronomy', 'your sci-fi', 'your games', 'your synthwave', 'your music', 'your telescope', 'your galactic app', 'your orbit simulator', 'your space blog'
        ];
        const lowerMsg = message.toLowerCase();
        const isAboutMe = aboutMeKeywords.some(k => lowerMsg.includes(k));
        if (!isAboutMe) {
            return res.json({ response: 'I am only here to talk about me and my portfolio.' });
        }
        let messages;
        let systemPrompt = portfolioContext;
        if (resumeText) {
            systemPrompt += '\n\nHere is my resume for reference:\n' + resumeText;
        }
        if (portfolio) {
            messages = [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ];
        } else {
            messages = [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ];
        }
        // Add a timeout to the fetch call (10 seconds)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const groqRes = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: LLAMA_MODEL,
                    messages,
                    temperature: 1,
                    max_tokens: 1024,
                    top_p: 1,
                    stream: false
                }),
                signal: controller.signal
            }
        );
        clearTimeout(timeout);
        const data = await groqRes.json();
        console.log('Groq API response:', JSON.stringify(data, null, 2));
        let aiText = null;
        if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            aiText = data.choices[0].message.content;
        } else if (data && data.error && data.error.message) {
            aiText = `Groq API error: ${data.error.message}`;
        }
        // Post-process for generic/irrelevant/empty answers
        if (!aiText ||
            /large language model|trained by|i do not have a name|i am an ai|i am an artificial intelligence|i do not have that information|i am unable to answer|i'm sorry|as an ai|i cannot|i'm not sure|i don't know|no information|not available|cannot provide|i am not able|i am not sure|i do not know|i do not have access|i do not possess/i.test(aiText.trim())
        ) {
            aiText = "Sorry, I don't have an answer for that, but I'm happy to chat about my projects, skills, or anything tech-related!";
        }
        if (!aiText) {
            aiText = "Sorry, I don't have an answer for that, but I'm happy to chat about my projects, skills, or anything tech-related!";
        }
        res.json({ response: aiText });
    } catch (err) {
        console.error('Error connecting to Groq API:', err);
        let errorMsg = "Sorry Bro I'm not chatGPT. But hey, do you want to chat about something tech-related or maybe my projects? 😊";
        if (err.name === 'AbortError') {
            errorMsg = 'Error: The request timed out. Please try again.';
        }
        res.status(500).json({ error: errorMsg });
    }
});

// Test endpoint for health/debug
app.post('/api/test', (req, res) => {
    console.log('Test endpoint hit:', req.body);
    res.json({ ok: true, message: req.body.message });
});

// Catch-all error handlers to prevent server from crashing
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

// Add a global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Llama proxy server running on port ${PORT}`);
}); 