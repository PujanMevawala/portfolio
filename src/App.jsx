import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WelcomeChat from './components/WelcomeChat';
import { fadeIn } from './utils/animations';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link, useNavigate } from 'react-router-dom';
import avatarImg from './assets/avatar.png';

const codingQuote = "Code is like humor. When you have to explain it, it's bad.";
const aboutMeText = "I'm Pujan Mevawala, a passionate developer exploring the vast expanse of technology. My mission is to create stellar projects that push boundaries and inspire others.";

function TypingEffect({ text, speed = 32, ...props }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(t => t + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span {...props}>{displayed}<span className="blinking-cursor">|</span></span>;
}

function TypingName({ name, subtitle, speed = 60 }) {
  const [displayed, setDisplayed] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  useEffect(() => {
    setDisplayed('');
    setDisplayedSubtitle('');
    setShowSubtitle(false);
    let i = 0;
    const nameInterval = setInterval(() => {
      setDisplayed(t => t + name[i]);
      i++;
      if (i >= name.length) {
        clearInterval(nameInterval);
        setTimeout(() => setShowSubtitle(true), 400);
      }
    }, speed);
    return () => clearInterval(nameInterval);
  }, [name, speed]);
  useEffect(() => {
    if (!showSubtitle) return;
    let j = 0;
    const subtitleInterval = setInterval(() => {
      setDisplayedSubtitle(t => t + subtitle[j]);
      j++;
      if (j >= subtitle.length) clearInterval(subtitleInterval);
    }, speed);
    return () => clearInterval(subtitleInterval);
  }, [showSubtitle, subtitle, speed]);
  return (
    <>
      <span style={{ fontWeight: 900, fontSize: 28, color: '#bdbdfc', letterSpacing: 1.2 }}>{displayed}<span className="blinking-cursor">|</span></span>
      <br />
      {showSubtitle && (
        <span style={{ fontWeight: 700, fontSize: 20, color: '#7f5cff', letterSpacing: 1.1 }}>{displayedSubtitle}<span className="blinking-cursor">|</span></span>
      )}
    </>
  );
}

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

const HomeBrief = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', position: 'relative' }}>
      {/* Navbar */}
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
      {/* No main content, only navbar remains */}
      <WelcomeChat initialSection={null} showChatButtonOnly />
      <style>{`.blinking-cursor { animation: blink 1.1s steps(1) infinite; } @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} } nav a.active { color: #fff; background: linear-gradient(120deg, #7f5cff44 60%, #4f46e522 100%); }`}</style>
    </div>
  );
};

const SectionRouter = () => {
  const location = useLocation();
  let section = null;
  if (location.pathname === '/about') section = 'Me';
  else if (location.pathname === '/projects') section = 'Projects';
  else if (location.pathname === '/skills') section = 'Skills';
  else if (location.pathname === '/education') section = 'Education';
  else if (location.pathname === '/achievements') section = 'Achievements';
  else if (location.pathname === '/contact') section = 'Contact';
  else if (location.pathname === '/chat') section = null;
  return <WelcomeChat initialSection={section} />;
};

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <ParticleBackground />
        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Routes>
            <Route path="/" element={<HomeBrief />} />
            <Route path="/about" element={<SectionRouter />} />
            <Route path="/projects" element={<SectionRouter />} />
            <Route path="/skills" element={<SectionRouter />} />
            <Route path="/education" element={<SectionRouter />} />
            <Route path="/achievements" element={<SectionRouter />} />
            <Route path="/contact" element={<SectionRouter />} />
            <Route path="/chat" element={<SectionRouter />} />
            <Route path="*" element={<HomeBrief />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

export default App;