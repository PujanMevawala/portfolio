import React, { useState, useEffect, useRef } from 'react';
import avatarImg from '../assets/avatar.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const NAV_BG = 'rgba(28, 28, 32, 0.92)';
const NAV_BORDER = '1.5px solid #33353a';
const NAV_SHADOW = '0 4px 24px 0 #0006';
const NAV_ACTIVE_BG = 'rgba(60, 60, 70, 0.92)';
const NAV_ACTIVE_SHADOW = '0 0 12px 2px #fff2, 0 2px 16px #0008';

const sections = [
    { label: 'Me', icon: '👤' },
    { label: 'Projects', icon: '💻' },
    { label: 'Skills', icon: '🛠️' },
    { label: 'Education', icon: '🎓' },
    { label: 'Achievements', icon: '🏆' },
    { label: 'Contact', icon: '✉️' },
];

// Section details
const sectionDetails = {
    Me: {
        title: 'About Me',
        avatar: avatarImg,
        name: 'Pujan Mevawala',
        subtitle: 'Passionate Developer',
        description: `I'm a passionate developer exploring the vast expanse of technology. My mission is to create stellar projects that push boundaries and inspire others.`,
        tags: ['AI Enthusiast', 'Developer', 'GenAI', 'Tech Explorer'],
    },
    Projects: {
        title: 'Projects',
        projects: [
            {
                title: 'PaperPulse: AI-Powered Research Transformation',
                description: "Developed an AI-powered platform leveraging LLMs and RAG to convert research papers into multi-format output, including podcasts, animated reels, videos, and PowerPoint presentations. Enhances accessibility and engagement with academic content. Tech Stack: Gemini Flash, Gemini Pro, PDFPlumber/Fitz, Manim, MoviePy, gTTS, python-pptx, Langchain.",
                link: 'https://github.com/',
            },
            {
                title: 'SmartFitAI: Intelligent Job Match & Prep Companion',
                description: "Built an AI-driven resume analysis tool to optimize job seekers' resumes for ATS compatibility and provide interview preparation. Features include resume assessment, tailored interview questions, improvement suggestions, and job fit scoring using multiple LLMs. Tech Stack: Python, Streamlit, Groq API, Google Generative AI API, PDF2Image, Poppler, Langchain, Plotly.",
                link: 'https://github.com/',
            },
            {
                title: 'CancerScan: Diagno Cancer',
                description: "Built a deep learning model for early detection of leukemia, lung, and colon cancer using medical imaging, dataset augmentation, and ResNet-34, achieving 97% accuracy. Assists healthcare professionals by providing automated preliminary diagnoses. Tech Stack: Python, Keras, ResNet-34, Medical Image Datasets, Pandas, Matplotlib.",
                link: 'https://github.com/',
            },
            {
                title: 'DocUChat Pro: CrewAI, QLoRA with LLaMA 3.2',
                description: "An AI-driven system for document-based conversations and summarization using RAG, embeddings, and FAISS, enhancing PDF text extraction by 35%. Integrated CrewAI for real-time news retrieval and applied PEFT on the LLaMA 3.2 1B model for efficient fine-tuning, reducing model size by 65%. Tech Stack: Python, Streamlit, LLaMA 3.2, PEFT, RAG, LangChain, FAISS, CrewAI.",
                link: 'https://github.com/',
            },
        ],
    },
    Skills: {
        title: 'Skills',
        skills: [
            'Python', 'Java', 'C/C++', 'JavaScript', 'HTML', 'CSS', 'React', 'PHP', 'Laravel', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'Tableau', 'KNIME', 'Github', 'Kaggle', 'Colab', 'Jupyter Notebook', 'LangChain', 'ANNs', 'CNNs', 'RNNs', 'Regressors', 'SVMs', 'Decision Tree', 'Transformer Encoders Decoders', 'Autoencoders', 'GAN', 'Fine Tuning', 'PEFT', 'RAG', 'GPT', 'LLaMA', 'BERT', 'YoLo', 'Other LLMs', 'Vision Models', 'Machine Learning', 'Natural Language Computing', 'Federated Learning', 'Reinforcement Learning', 'Computer Vision', 'Cloud Computing', 'Data Analysis and Visualization', 'Data Structures', 'Database Management System', 'Object Oriented Programming', 'Operating Systems'
        ],
    },
    Education: {
        title: 'Education',
        education: [
            {
                degree: 'Bachelor of Technology in Computer Science',
                institution: 'Institute of Technology, Nirma University, Ahmedabad, India',
                duration: 'Sept. 2023 - June 2026',
                cgpa: '8.43/10',
            },
            {
                degree: 'Diploma in Information Technology',
                institution: 'Dr S & SS Ghandhy Government Engineering College, Surat, India',
                duration: 'Oct. 2020 - July 2023',
                cgpa: '9.61/10',
            },
        ],
    },
    Achievements: {
        title: 'Achievements & Certifications',
        achievements: [
            '2025 - Secured Runner-Up position in MINeD 2025 - Academic Research Remix among 50+ teams.',
            '2025 - Earned Certification for completing AWS Academy Cloud Foundations by AWS Academy.',
            '2024 - Awarded Certificate of Scholar for academic excellence 2nd year, BTech CSE with 8.43 CGPA.',
            '2024 - Successfully completed a minor specialization in Adaptive AI courses - NLC, CVDL.',
        ],
    },
    Contact: {
        title: 'Contact',
        description: 'Want to collaborate on a cosmic project? Reach out!',
        links: [
            { label: 'Email', url: 'mailto:pujanmevawala080304@gmail.com' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
        ],
    },
};

// Section keywords for modal redirection
const sectionKeywords = {
    Me: ['about', 'yourself', 'who are you', 'bio', 'introduction'],
    Projects: ['project', 'projects', 'work', 'portfolio'],
    Skills: ['skill', 'skills', 'technologies', 'tech stack'],
    Education: ['education', 'degree', 'university', 'college', 'btech', 'diploma', 'cgpa', 'school'],
    Achievements: ['achievement', 'achievements', 'certification', 'certifications', 'award', 'awards', 'honor', 'honours'],
    Contact: ['contact', 'email', 'reach', 'connect'],
};

// Section summaries for chat preview
const sectionSummaries = {
    Me: "I'm Pujan Mevawala, a passionate developer exploring technology and building stellar projects. Want to know more about me?",
    Projects: "I've built projects like PaperPulse, SmartFitAI, CancerScan, and DocUChat Pro. Curious about my work?",
    Skills: "My skills include Python, Java, C/C++, JavaScript, React, Node.js, AI/ML, and more. Want to see the full list?",
    Education: "I'm pursuing a BTech in Computer Science at Nirma University (CGPA: 8.43) and hold a Diploma in IT from Ghandhy College (CGPA: 9.61). Want to know more about my education?",
    Achievements: "I've earned awards and certifications including MINeD 2025 Runner-Up, AWS Cloud Foundations, and more. Want to see my achievements?",
    Contact: "Want to connect or collaborate? I'm always open to new opportunities! Need my contact info?",
};

// Add a mapping from skill names to logo URLs (SVG or PNG, from official or reliable CDNs)
const skillLogos = {
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'UI/UX': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'AI/ML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', // Python as proxy for AI/ML
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Framer Motion': 'https://raw.githubusercontent.com/framer/logos/main/logo.svg',
    'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    'APIs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/api/api-original-wordmark.svg', // generic API icon
};

// Helper for infinite horizontal scroll animation
const horizontalScrollVariants = {
    animate: {
        x: [0, -1000],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 18,
                ease: 'linear',
            },
        },
    },
};

function getSectionFromMessage(msg) {
    const lower = msg.toLowerCase();
    // Priority order: Projects, Skills, Education, Achievements, Contact, Me
    if (/\b(project|projects|portfolio|work)\b/.test(lower)) return 'Projects';
    if (/\b(skill|skills|technologies|tech stack)\b/.test(lower)) return 'Skills';
    if (/\b(education|degree|university|college|btech|diploma|cgpa|school)\b/.test(lower)) return 'Education';
    if (/\b(achievement|achievements|certification|certifications|award|awards|honor|honours)\b/.test(lower)) return 'Achievements';
    if (/\b(contact|email|reach|connect)\b/.test(lower)) return 'Contact';
    if (/\b(about( me)?|yourself|who are you|bio|introduction)\b/.test(lower)) return 'Me';
    return null;
}

const summaryLines = [
    "I'm Pujan Mevawala, a passionate developer and tech explorer.",
    "I love building beautiful, interactive web experiences.",
    "My mission: create stellar projects that inspire and solve real problems.",
    "Skilled in React, Node.js, UI/UX, and more.",
    "Let's connect and build something amazing together! 🚀",
];

function TypingNameSubtitle({ name, subtitle, speed = 60 }) {
    const [displayedName, setDisplayedName] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [displayedSubtitle, setDisplayedSubtitle] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayedName('');
        setDisplayedSubtitle('');
        setShowSubtitle(false);
        setDone(false);
        let i = 0;
        const nameStr = name || '';
        const subtitleStr = subtitle || '';
        const nameInterval = setInterval(() => {
            if (i < nameStr.length) {
                setDisplayedName(nameStr.slice(0, i + 1));
                i++;
            } else {
                clearInterval(nameInterval);
                setTimeout(() => setShowSubtitle(true), 400);
            }
        }, speed);
        return () => clearInterval(nameInterval);
    }, [name, speed, subtitle]);

    useEffect(() => {
        if (!showSubtitle) return;
        let j = 0;
        const subtitleStr = subtitle || '';
        const subtitleInterval = setInterval(() => {
            if (j < subtitleStr.length) {
                setDisplayedSubtitle(subtitleStr.slice(0, j + 1));
                j++;
            } else {
                clearInterval(subtitleInterval);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(subtitleInterval);
    }, [showSubtitle, subtitle, speed]);

    return (
        <>
            <span style={{ fontWeight: 800, fontSize: 26, color: '#fff', letterSpacing: 1.2, textAlign: 'center', display: 'block' }}>{displayedName}{!showSubtitle && <span className="blinking-cursor">|</span>}</span>
            <br />
            {showSubtitle && subtitle && (
                <span style={{ fontWeight: 700, fontSize: 18, color: '#7f5cff', letterSpacing: 1.1, textAlign: 'center', display: 'block' }}>{displayedSubtitle}{!done && <span className="blinking-cursor">|</span>}</span>
            )}
        </>
    );
}

const WelcomeChat = ({ initialSection }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { from: 'ai', text: 'Hi I am Pujan Mevawala.' },
    ]);
    const [displayedSection, setDisplayedSection] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [pauseSkillsScroll, setPauseSkillsScroll] = useState(false);
    const [pauseProjectsScroll, setPauseProjectsScroll] = useState(false);
    const [showChatHint, setShowChatHint] = useState(true);
    const [navShadow, setNavShadow] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const navRef = useRef(null);
    const [aboutMeSummary, setAboutMeSummary] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const url = new URL(window.location);
        if (url.pathname === '/chat' && url.searchParams.has('query')) {
            url.search = '';
            window.history.replaceState({}, '', url);
        }
    }, []);

    const greetings = /\b(hi|hello|hey|hii|yo|sup|hola|namaste|wassup|what's up|heyy|hlo|hlo+|hii+)\b/i;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMsg = input;
        // Update the URL with the current query, using /chat?query=... and encodeURIComponent
        const url = new URL(window.location);
        url.pathname = '/chat';
        url.searchParams.set('query', encodeURIComponent(userMsg));
        window.history.pushState({}, '', url);
        const matchedSection = getSectionFromMessage(userMsg);
        // Centralized prompt for Pujan persona
        const pujanPrompt = (msg) => `You are Pujan Mevawala, a friendly, personal, and passionate developer. Answer the following as yourself: ${msg}`;
        if (matchedSection) {
            setMessages((msgs) => [
                ...msgs,
                { from: 'user', text: userMsg },
            ]);
            setInput('');
            // Always use Pujan persona for section summaries
            const summaryPrompt = matchedSection === 'Me'
                ? `As Pujan Mevawala, give a short summary about yourself for a portfolio chat. End with: To know more about Pujan's details.`
                : `As Pujan Mevawala, give a short summary about your ${matchedSection.toLowerCase()} for a portfolio chat. End with: To know more about Pujan's ${matchedSection.toLowerCase()}.`;
            try {
                const res = await fetch('http://localhost:4000/api/llama-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: summaryPrompt })
                });
                const data = await res.json();
                let aiText = data && data.response ? data.response : `Here's a brief about my ${matchedSection.toLowerCase()}. To know more about Pujan's ${matchedSection.toLowerCase()}.`;
                setMessages((msgs) => [
                    ...msgs,
                    { from: 'ai', text: aiText, section: matchedSection },
                ]);
            } catch (err) {
                setMessages((msgs) => [
                    ...msgs,
                    { from: 'ai', text: `Here's a brief about my ${matchedSection.toLowerCase()}. To know more about Pujan's ${matchedSection.toLowerCase()}.`, section: matchedSection },
                ]);
            }
            setDisplayedSection(matchedSection);
            return;
        }
        // Greetings logic
        if (greetings.test(userMsg)) {
            setMessages((msgs) => [
                ...msgs,
                { from: 'user', text: userMsg },
            ]);
            setInput('');
            try {
                const res = await fetch('http://localhost:4000/api/llama-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: pujanPrompt(userMsg) })
                });
                const data = await res.json();
                let aiText = data && data.response ? data.response : `Hey! I'm Pujan 😊 How can I help you today?`;
                setMessages((msgs) => [
                    ...msgs,
                    { from: 'ai', text: aiText },
                ]);
            } catch (err) {
                setMessages((msgs) => [
                    ...msgs,
                    { from: 'ai', text: `Hey! I'm Pujan 😊 How can I help you today?` },
                ]);
            }
            return;
        }
        // For all other messages, always use Pujan persona
        setMessages((msgs) => [
            ...msgs,
            { from: 'user', text: userMsg },
        ]);
        setInput('');
        try {
            const res = await fetch('http://localhost:4000/api/llama-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: pujanPrompt(userMsg) })
            });
            const data = await res.json();
            let aiText = data && data.response ? data.response : `Sorry, I couldn't get a response right now.`;
            setMessages((msgs) => [
                ...msgs,
                { from: 'ai', text: aiText },
            ]);
        } catch (err) {
            setMessages((msgs) => [
                ...msgs,
                { from: 'ai', text: `Sorry, I couldn't get a response right now.` },
            ]);
        }
    };

    // Section modal content
    const renderSectionContent = (sectionName) => {
        const details = sectionDetails[sectionName];
        if (!details) return null;
        if (sectionName === 'Me') {
            return (
                <>
                    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 16px' }}>
                        <motion.div
                            initial={{ y: 0, boxShadow: '0 0 32px 8px #7f5cff55' }}
                            animate={{
                                y: [0, -12, 0, 12, 0],
                                boxShadow: [
                                    '0 0 32px 8px #7f5cff55',
                                    '0 0 48px 16px #bdbdfc88',
                                    '0 0 32px 8px #7f5cff55',
                                    '0 0 48px 16px #bdbdfc88',
                                    '0 0 32px 8px #7f5cff55',
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                zIndex: 1,
                            }}
                        >
                            <img src={details.avatar} alt="Avatar" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 24px #7f5cff55', border: '3px solid #bdbdfc', background: '#18182a' }} />
                        </motion.div>
                        {/* Spacey glow behind avatar */}
                        <motion.div
                            initial={{ opacity: 0.7, scale: 1 }}
                            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.15, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #7f5cff55 0%, #23234a00 80%)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 0,
                                filter: 'blur(8px)',
                            }}
                        />
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{details.name}</div>
                    <div style={{ fontSize: 16, color: '#bdbdfc', marginBottom: 10 }}>{details.subtitle}</div>
                    <div style={{ fontSize: 17, margin: '12px 0 18px 0', color: '#e0e0ff' }}>
                        {aboutMeSummary || details.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
                        {details.tags.map(tag => (
                            <span key={tag} style={{ background: '#7f5cff22', color: '#bdbdfc', borderRadius: 8, padding: '4px 12px', fontSize: 15 }}>{tag}</span>
                        ))}
                    </div>
                </>
            );
        }
        if (sectionName === 'Projects') {
            return (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{ fontSize: 32, fontWeight: 800, color: '#bdbdfc', textAlign: 'center', marginBottom: 32, letterSpacing: 1.2, textShadow: '0 2px 16px #7f5cff55', position: 'relative', zIndex: 2 }}
                    >
                        <span style={{ color: '#7f5cff', fontSize: 36, marginRight: 12 }}>🚀</span> Projects
                    </motion.div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: 32,
                        width: '100%',
                        maxWidth: 1100,
                        margin: '0 auto',
                        marginBottom: 32,
                    }}>
                        {sectionDetails.Projects.projects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: idx * 0.12, ease: 'easeOut' }}
                                style={{
                                    background: 'rgba(28,28,48,0.32)',
                                    border: '1.5px solid #7f5cff44',
                                    borderRadius: 20,
                                    boxShadow: '0 2px 32px #7f5cff33, 0 2px 16px #0008',
                                    padding: '32px 28px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    minHeight: 260,
                                }}
                            >
                                <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 10, letterSpacing: 0.7 }}>{project.title}</div>
                                <div style={{ color: '#bdbdfc', fontSize: 16, marginBottom: 18, fontWeight: 500 }}>{project.description}</div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                                            background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            borderRadius: 8,
                                            padding: '8px 18px',
                                            textDecoration: 'none',
                                            boxShadow: '0 2px 8px #7f5cff55',
                                            letterSpacing: 0.7,
                                            fontSize: 15,
                                            transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
                                        }}>GitHub</a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                                            background: 'linear-gradient(120deg, #4f46e5 60%, #7f5cff 100%)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            borderRadius: 8,
                                            padding: '8px 18px',
                                            textDecoration: 'none',
                                            boxShadow: '0 2px 8px #7f5cff55',
                                            letterSpacing: 0.7,
                                            fontSize: 15,
                                            transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
                                        }}>Live Demo</a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            );
        }
        if (sectionName === 'Skills') {
            return (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{ fontSize: 32, fontWeight: 800, color: '#bdbdfc', textAlign: 'center', marginBottom: 32, letterSpacing: 1.2, textShadow: '0 2px 16px #7f5cff55', position: 'relative', zIndex: 2 }}
                    >
                        <span style={{ color: '#7f5cff', fontSize: 36, marginRight: 12 }}>🛠️</span> Skills
                    </motion.div>
                    <div style={{ width: '100%', overflow: 'hidden', position: 'relative', margin: '0 auto', maxWidth: 900 }}>
                        <motion.div
                            style={{ display: 'flex', gap: 32, width: 'max-content' }}
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                        >
                            {[...sectionDetails.Skills.skills, ...sectionDetails.Skills.skills].map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.12 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                                    style={{
                                        background: 'rgba(40,40,60,0.7)',
                                        border: '1.5px solid #7f5cff44',
                                        borderRadius: 16,
                                        padding: '18px 32px',
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: 20,
                                        boxShadow: '0 2px 16px #7f5cff22',
                                        margin: '0 8px',
                                        minWidth: 120,
                                        textAlign: 'center',
                                        letterSpacing: 0.7,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 10,
                                        position: 'relative',
                                    }}
                                >
                                    <span style={{ position: 'absolute', top: 0, left: 0, right: 0, fontSize: 13, color: '#bdbdfc', background: 'rgba(40,40,60,0.92)', borderRadius: 8, padding: '2px 6px', opacity: 0, pointerEvents: 'none', transition: 'opacity 0.18s', zIndex: 10 }} className="skill-tooltip">{skill}</span>
                                    <img
                                        src={getSkillLogo(skill)}
                                        alt={skill + ' logo'}
                                        style={{ width: 38, height: 38, objectFit: 'contain', marginBottom: 8, filter: 'drop-shadow(0 0 8px #7f5cff88)' }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                        onMouseOver={e => { e.target.previousSibling.style.opacity = 1; }}
                                        onMouseOut={e => { e.target.previousSibling.style.opacity = 0; }}
                                        aria-label={skill + ' logo'}
                                    />
                                    <span>{skill}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </>
            );
        }
        if (sectionName === 'Education') {
            return (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{ fontSize: 32, fontWeight: 800, color: '#bdbdfc', textAlign: 'center', marginBottom: 32, letterSpacing: 1.2, textShadow: '0 2px 16px #7f5cff55', position: 'relative', zIndex: 2 }}
                    >
                        <span style={{ color: '#7f5cff', fontSize: 36, marginRight: 12 }}>🎓</span> Education
                    </motion.div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', width: '100%', maxWidth: 700, margin: '0 auto', minHeight: 320 }}>
                        {/* Timeline vertical line */}
                        <motion.div
                            initial={{ height: 0, opacity: 0.7 }}
                            animate={{ height: '100%', opacity: 1 }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                left: 54,
                                top: 0,
                                width: 7,
                                height: '100%',
                                background: 'linear-gradient(180deg, #7f5cff 0%, #bdbdfc 100%)',
                                borderRadius: 8,
                                zIndex: 0,
                                boxShadow: '0 0 16px 2px #7f5cff55',
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, marginLeft: 0, width: '100%' }}>
                            {sectionDetails.Education.education.map((edu, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', minHeight: 120 }}>
                                    {/* Timeline stop (animated glowing dot) */}
                                    <motion.div
                                        initial={{ scale: 0.7, boxShadow: '0 0 0px #7f5cff00' }}
                                        animate={{ scale: 1, boxShadow: '0 0 18px 6px #7f5cff88' }}
                                        transition={{ duration: 0.7, delay: idx * 0.18, type: 'spring', stiffness: 180, damping: 18 }}
                                        style={{
                                            position: 'absolute',
                                            left: 51,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            width: 22,
                                            height: 22,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(120deg, #7f5cff 60%, #bdbdfc 100%)',
                                            border: '3px solid #fff',
                                            zIndex: 2,
                                        }}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7, delay: idx * 0.18, ease: 'easeOut' }}
                                        style={{
                                            background: 'rgba(28,28,48,0.32)',
                                            border: '1.5px solid #7f5cff44',
                                            borderRadius: 24,
                                            boxShadow: '0 2px 32px #7f5cff33, 0 2px 16px #0008',
                                            padding: '32px 32px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 32,
                                            minWidth: 340,
                                            maxWidth: 520,
                                            marginLeft: 90,
                                            zIndex: 2,
                                            position: 'relative',
                                        }}
                                    >
                                        <motion.img
                                            src={idx === 0 ? '/nirma.jpeg' : '/gandhi.png'}
                                            alt={idx === 0 ? 'Nirma University Logo' : 'Dr S & SS Ghandhy College Logo'}
                                            initial={{ scale: 0.85, opacity: 0 }}
                                            animate={{ scale: 1.08, opacity: 1 }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                            whileHover={{ scale: 1.16, filter: 'drop-shadow(0 0 18px #7f5cffbb)' }}
                                            style={{ width: 68, height: 68, borderRadius: 14, background: '#fff', objectFit: 'contain', boxShadow: '0 2px 8px #7f5cff55', transition: 'box-shadow 0.18s, transform 0.18s, filter 0.18s' }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 6, letterSpacing: 0.7 }}>{edu.institution}</div>
                                            <div style={{ color: '#bdbdfc', fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{edu.degree}</div>
                                            <div style={{ color: '#bdbdfc', fontSize: 14, fontWeight: 500 }}>{edu.duration} | CGPA: {edu.cgpa}</div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            );
        }
        if (sectionName === 'Achievements') {
            return (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{ fontSize: 32, fontWeight: 800, color: '#bdbdfc', textAlign: 'center', marginBottom: 32, letterSpacing: 1.2, textShadow: '0 2px 16px #7f5cff55', position: 'relative', zIndex: 2 }}
                    >
                        <span style={{ color: '#7f5cff', fontSize: 36, marginRight: 12 }}>🏆</span> Achievements & Certifications
                    </motion.div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: '100%', maxWidth: 700, margin: '0 auto' }}>
                        {sectionDetails.Achievements.achievements.map((ach, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
                                style={{
                                    background: 'rgba(28,28,48,0.32)',
                                    border: '1.5px solid #7f5cff44',
                                    borderRadius: 20,
                                    boxShadow: '0 2px 32px #7f5cff33, 0 2px 16px #0008',
                                    padding: '24px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 18,
                                    width: '100%',
                                }}
                            >
                                <span style={{ fontSize: 32, color: '#7f5cff', marginRight: 8 }}>✔️</span>
                                <div style={{ color: '#fff', fontWeight: 600, fontSize: 17 }}>{ach}</div>
                            </motion.div>
                        ))}
                    </div>
                </>
            );
        }
        if (sectionName === 'Contact') {
            return (
                <>
                    <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Contact</div>
                    <div style={{ color: '#e0e0ff', fontSize: 16, marginBottom: 18 }}>{details.description}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                        {details.links.map(link => (
                            <motion.a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#7f5cff', fontWeight: 600, fontSize: 17, textDecoration: 'none', background: '#23234a', borderRadius: 8, padding: '8px 18px', marginBottom: 2, boxShadow: '0 2px 8px #7f5cff22', display: 'flex', alignItems: 'center', gap: 10 }}
                                whileHover={{ scale: 1.12, boxShadow: '0 0 16px #7f5cffcc' }}
                                aria-label={link.label}
                            >
                                {link.label === 'Email' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Email" style={{ width: 22, height: 22 }} />}
                                {link.label === 'LinkedIn' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: 22, height: 22 }} />}
                                {link.label === 'GitHub' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style={{ width: 22, height: 22 }} />}
                                {link.label}
                            </motion.a>
                        ))}
                    </div>
                </>
            );
        }
        return null;
    };

    // Animate navbar shadow on scroll and update scroll progress
    useEffect(() => {
        const handleScroll = () => {
            setNavShadow(window.scrollY > 8);
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            setScrollProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fade-in animation for navbar
    const [navVisible, setNavVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => setNavVisible(true), 200);
    }, []);

    // For animated underline effect
    const [activeNav, setActiveNav] = useState('me');
    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace('#', '') || 'me';
            setActiveNav(hash);
        };
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    // Enhance the /chat details section (About Me) to use backend summary
    useEffect(() => {
        if (displayedSection === 'Me' && !aboutMeSummary) {
            (async () => {
                try {
                    const res = await fetch('http://localhost:4000/api/llama-chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: 'As Pujan Mevawala, give a detailed summary about yourself for a portfolio chat. Use your resume if needed.' })
                    });
                    const data = await res.json();
                    setAboutMeSummary(data && data.response ? data.response : null);
                } catch {
                    setAboutMeSummary(null);
                }
            })();
        }
    }, [displayedSection, aboutMeSummary]);

    // Enhance Skills section to fetch logos in real-time if not in mapping
    const getSkillLogo = (skill) => {
        if (skillLogos[skill]) return skillLogos[skill];
        // Try devicon CDN
        const deviconName = skill.toLowerCase().replace(/\+/g, 'plus').replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '');
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${deviconName}-original.svg`;
    };

    // Sync section with route
    useEffect(() => {
        if (initialSection && displayedSection !== initialSection) {
            setDisplayedSection(initialSection);
            setShowChat(false);
        }
    }, [initialSection]);

    // Update URL on section change
    useEffect(() => {
        if (displayedSection) {
            const routeMap = {
                Me: '/about',
                Projects: '/projects',
                Skills: '/skills',
                Education: '/education',
                Achievements: '/achievements',
                Contact: '/contact',
            };
            if (location.pathname !== routeMap[displayedSection]) {
                navigate(routeMap[displayedSection], { replace: true });
            }
        } else if (showChat) {
            if (!location.pathname.startsWith('/chat')) {
                navigate('/chat', { replace: true });
            }
        }
    }, [displayedSection, showChat]);

    const NAV_LINKS = [
        { label: 'About', to: '/about' },
        { label: 'Projects', to: '/projects' },
        { label: 'Skills', to: '/skills' },
        { label: 'Education', to: '/education' },
        { label: 'Achievements', to: '/achievements' },
        { label: 'Contact', to: '/contact' },
        { label: 'Chat', to: '/chat' },
        { label: 'Resume/CV', to: '/resume.pdf', external: true },
    ];

    // Add quick message buttons for sections
    const QUICK_MESSAGES = [
        { label: 'About Me', message: 'Tell me about yourself' },
        { label: 'Projects', message: 'Show me your projects' },
        { label: 'Skills', message: 'What are your skills?' },
        { label: 'Education', message: 'Your education background?' },
        { label: 'Achievements', message: 'Your achievements?' },
        { label: 'Contact', message: 'How can I contact you?' },
    ];

    return (
        <>
            {/* Section Anchors for smooth scroll */}
            <div id="me" style={{ position: 'relative', top: -64 }}></div>
            <div id="projects" style={{ position: 'relative', top: -64 }}></div>
            <div id="skills" style={{ position: 'relative', top: -64 }}></div>
            <div id="education" style={{ position: 'relative', top: -64 }}></div>
            <div id="achievements" style={{ position: 'relative', top: -64 }}></div>
            <div id="contact" style={{ position: 'relative', top: -64 }}></div>
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                pointerEvents: 'auto',
                paddingTop: 80,
                scrollBehavior: 'smooth',
            }}>
                <AnimatePresence mode="wait">
                    {!displayedSection && !showChat && (
                        <>
                            {/* Modern glassy navbar */}
                            <nav style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: 72,
                                background: 'rgba(24, 24, 40, 0.82)',
                                borderBottom: '2px solid #7f5cff44',
                                boxShadow: '0 4px 24px 0 #0006',
                                zIndex: 1000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 32px',
                                backdropFilter: 'blur(22px) saturate(1.4)',
                                borderRadius: '0 0 28px 28px',
                                transition: 'background 0.25s, box-shadow 0.25s, border-bottom 0.25s',
                            }}>
                                <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
                                    {NAV_LINKS.map(link => link.external ? (
                                        <a
                                            key={link.label}
                                            href={link.to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#fff', fontWeight: 800, fontSize: 18, textDecoration: 'none', padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)', marginLeft: 8, transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s, filter 0.18s', filter: 'drop-shadow(0 0 8px #7f5cff88)' }}
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.label}
                                            to={link.to}
                                            style={{ color: '#bdbdfc', fontWeight: 800, fontSize: 18, textDecoration: 'none', padding: '10px 18px', borderRadius: 10, transition: 'background 0.18s, color 0.18s', marginLeft: 8 }}
                                            activeclassname="active"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                            {/* Advanced hero section below navbar */}
                            <motion.div
                                key="default"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -60, scale: 0.96 }}
                                transition={{ duration: 0.7, ease: 'easeInOut' }}
                                style={{ width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                            >
                                {/* Avatar above details box */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.8, type: 'spring', stiffness: 180 }}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, marginTop: 60 }}
                                >
                                    <div style={{ position: 'relative', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <motion.div
                                            initial={{ opacity: 0.7, scale: 1 }}
                                            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.15, 1] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                            style={{
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                width: 150,
                                                height: 150,
                                                borderRadius: '50%',
                                                background: 'radial-gradient(circle, #7f5cff55 0%, #23234a00 80%)',
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 0,
                                                filter: 'blur(10px)',
                                            }}
                                        />
                                        <motion.img
                                            src={avatarImg}
                                            alt="Avatar"
                                            initial={{ scale: 0.85, opacity: 0 }}
                                            animate={{ scale: 1.08, opacity: 1 }}
                                            transition={{ delay: 1.3, duration: 0.7, type: 'spring', stiffness: 180 }}
                                            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 24px #7f5cff55', border: '3px solid #bdbdfc', background: '#18182a', position: 'relative', zIndex: 2 }}
                                        />
                                    </div>
                                </motion.div>
                                {/* Details box below avatar */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    style={{
                                        maxWidth: 540,
                                        margin: '0 auto',
                                        marginTop: 0,
                                        marginBottom: 32,
                                        padding: '40px 32px 32px 32px',
                                        borderRadius: 32,
                                        background: 'rgba(28,28,48,0.38)',
                                        boxShadow: '0 2px 32px #7f5cff33, 0 2px 16px #0008',
                                        border: '1.5px solid #7f5cff44',
                                        backdropFilter: 'blur(16px) saturate(1.2)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        zIndex: 2,
                                        position: 'relative',
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.7 }}
                                        style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 18, textAlign: 'center', letterSpacing: 1.1, textShadow: '0 2px 16px #7f5cff55' }}
                                    >
                                        Code is like humor, it's not good if you have to explain it.
                                    </motion.div>
                                    <TypingNameSubtitle name="Pujan Mevawala" subtitle="Passionate Developer" speed={60} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.7, duration: 0.7 }}
                                        style={{ color: '#bdbdfc', fontSize: 16, marginBottom: 0, textAlign: 'center', minHeight: 40, marginTop: 24 }}
                                    >
                                        I'm a passionate developer exploring the vast expanse of technology. My mission is to create stellar projects that push boundaries and inspire others.
                                    </motion.div>
                                </motion.div>
                                {/* Chat button always in bottom right */}
                                <motion.div
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 60 }}
                                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                                    style={{
                                        position: 'fixed',
                                        right: 36,
                                        bottom: 48,
                                        zIndex: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 18,
                                    }}
                                >
                                    <motion.button
                                        onClick={() => setShowChat(true)}
                                        whileTap={{ scale: 0.92 }}
                                        whileHover={{ scale: 1.08, boxShadow: '0 0 16px #7f5cffcc' }}
                                        style={{
                                            background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: 68,
                                            height: 68,
                                            fontSize: 32,
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 16px #7f5cff88',
                                            transition: 'background 0.18s, box-shadow 0.18s',
                                            outline: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        aria-label="Chat with Pujan"
                                    >
                                        💬
                                    </motion.button>
                                </motion.div>
                                <style>{`.blinking-cursor { animation: blink 1.1s steps(1) infinite; } @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} } nav a.active { color: #fff; background: linear-gradient(120deg, #7f5cff44 60%, #4f46e522 100%); }`}</style>
                            </motion.div>
                        </>
                    )}
                    {showChat && !displayedSection && (
                        <motion.div
                            key="chatbox"
                            initial={{ opacity: 0, y: 60, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.98 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            style={{
                                position: 'fixed',
                                left: 0,
                                top: 0,
                                width: '100vw',
                                height: '100vh',
                                zIndex: 200,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(20, 20, 36, 0.72)',
                                backdropFilter: 'blur(18px) saturate(1.2)',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                style={{
                                    width: '100%',
                                    maxWidth: 480,
                                    minHeight: 540,
                                    background: 'rgba(28, 28, 48, 0.92)',
                                    borderRadius: 28,
                                    boxShadow: '0 2px 32px #7f5cff88, 0 2px 16px #0008',
                                    border: '1.5px solid #7f5cff44',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Quick message buttons */}
                                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', padding: '14px 18px 0 18px', background: 'rgba(40,40,60,0.82)', borderBottom: '1.5px solid #7f5cff22' }}>
                                    {QUICK_MESSAGES.map(q => (
                                        <button
                                            key={q.label}
                                            onClick={() => {
                                                setInput(q.message);
                                                setTimeout(() => document.querySelector('form input[type="text"]').focus(), 0);
                                            }}
                                            style={{
                                                background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: '7px 14px',
                                                fontWeight: 700,
                                                fontSize: 15,
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 8px #7f5cff33',
                                                transition: 'background 0.18s, box-shadow 0.18s',
                                                letterSpacing: 0.7,
                                            }}
                                        >
                                            {q.label}
                                        </button>
                                    ))}
                                </div>
                                {/* Chat messages */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    style={{
                                        flex: 1,
                                        minHeight: 0,
                                        maxHeight: 340,
                                        overflowY: 'auto',
                                        background: 'rgba(28, 28, 48, 0.22)',
                                        borderRadius: 18,
                                        margin: '0 18px 0 18px',
                                        boxShadow: '0 2px 16px #7f5cff33',
                                        padding: 18,
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#7f5cff #23232a',
                                        backdropFilter: 'blur(10px) saturate(1.2)',
                                        border: '1.5px solid #7f5cff44',
                                        position: 'relative',
                                        zIndex: 2,
                                    }}
                                    className="modern-chat-scroll"
                                >
                                    <motion.div
                                        initial={{ opacity: 0.5, scale: 1 }}
                                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.04, 1] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{ position: 'absolute', left: '50%', top: '50%', width: '90%', height: '90%', background: 'radial-gradient(circle, #7f5cff33 0%, #23234a00 80%)', transform: 'translate(-50%, -50%)', zIndex: 0, filter: 'blur(24px)', pointerEvents: 'none' }}
                                    />
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ duration: 0.32, delay: idx * 0.04 }}
                                            style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', position: 'relative', zIndex: 2 }}
                                        >
                                            <motion.span
                                                initial={{ scale: 0.98 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                                                style={{ background: msg.from === 'user' ? 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)' : 'linear-gradient(120deg, rgba(127,85,255,0.13) 0%, rgba(0,200,255,0.10) 100%)', color: msg.from === 'user' ? '#fff' : '#bdbdfc', borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 20px', maxWidth: '75%', wordBreak: 'break-word', fontSize: 17, fontWeight: 500, boxShadow: msg.from === 'user' ? '0 2px 12px #7f5cff55, 0 2px 8px #7f5cff33' : '0 2px 8px #7f5cff22', border: msg.from === 'user' ? '1.5px solid #7f5cff' : '1.5px solid #7f5cff22', marginLeft: msg.from === 'user' ? 32 : 0, marginRight: msg.from === 'user' ? 0 : 32, marginTop: 8, marginBottom: 8, transition: 'background 0.2s', backdropFilter: 'blur(2px)', textShadow: msg.from === 'user' ? '0 1px 4px #4f46e5cc' : '0 1px 4px #7f5cff88', position: 'relative', zIndex: 2 }}
                                            >
                                                {msg.text}
                                                {msg.section && (
                                                    <a
                                                        href="#"
                                                        style={{ color: '#a78bfa', textDecoration: 'underline', marginLeft: 8, cursor: 'pointer', fontWeight: 600 }}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            setDisplayedSection(msg.section);
                                                            setShowChat(false);
                                                        }}
                                                    >To know more</a>
                                                )}
                                            </motion.span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                {/* Chat input bar */}
                                <form onSubmit={handleSend} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '18px 24px', borderTop: '1.5px solid #7f5cff33', background: 'rgba(30,30,50,0.92)', borderRadius: '0 0 28px 28px', boxShadow: '0 2px 12px #7f5cff22', backdropFilter: 'blur(8px)', position: 'relative', zIndex: 3 }}>
                                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything about portfolio!" style={{ flex: 1, padding: '14px 18px', borderRadius: 14, border: '1.5px solid #7f5cff', fontSize: 18, background: 'rgba(40,40,60,0.97)', color: '#fff', outline: 'none', boxShadow: '0 2px 8px #7f5cff22', marginRight: 4, letterSpacing: 1.1 }} />
                                    <motion.button type="submit" whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.08, boxShadow: '0 0 16px #7f5cffcc' }} style={{ background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 28px', fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px #7f5cff55', transition: 'background 0.18s, box-shadow 0.18s', letterSpacing: 1.1, outline: 'none' }}>
                                        <motion.span initial={{ opacity: 0.7 }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} style={{ display: 'inline-block' }}>
                                            🚀 Send
                                        </motion.span>
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                    {displayedSection && (
                        <motion.div
                            key={displayedSection}
                            initial={{ opacity: 0, y: 60, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -60, scale: 0.96 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            style={{
                                width: '100%',
                                maxWidth: 1100,
                                margin: '48px auto 0 auto',
                                minHeight: 400,
                                position: 'relative',
                                zIndex: 2,
                                borderRadius: 32,
                                background: 'rgba(28,28,48,0.08)',
                                boxShadow: '0 2px 32px #7f5cff18, 0 2px 16px #0004',
                                padding: '48px 32px 56px 32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                overflow: 'visible',
                                backdropFilter: 'blur(16px) saturate(1.2)',
                                border: '1.5px solid #7f5cff22',
                            }}
                        >
                            <motion.button
                                onClick={() => {
                                    setDisplayedSection(null);
                                    setShowChat(true);
                                }}
                                whileTap={{ scale: 0.92 }}
                                whileHover={{ scale: 1.08, boxShadow: '0 0 16px #7f5cffcc' }}
                                style={{
                                    background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 12,
                                    padding: '10px 28px',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px #7f5cff55',
                                    transition: 'background 0.18s, box-shadow 0.18s',
                                    letterSpacing: 1.1,
                                    outline: 'none',
                                    marginBottom: 32,
                                    alignSelf: 'flex-start',
                                    zIndex: 2,
                                }}
                                aria-label="BacChat"
                            >
                                ← Chat with me
                            </motion.button>
                            <div style={{ position: 'relative', zIndex: 2, padding: 40 }}>
                                {renderSectionContent(displayedSection)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default WelcomeChat; 