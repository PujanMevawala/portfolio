import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../utils/animations';
import { projects } from '../data/project';

// Tech logo mapping (extend as needed)
const techLogos = {
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Streamlit': 'https://streamlit.io/images/brand/streamlit-logo-secondary-colormark-darktext.png',
  'Langchain': 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4',
  'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg',
  'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'Matplotlib': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
  'Plotly': 'https://images.plot.ly/logo/new-branding/plotly-logomark.png',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Google Generative AI API': 'https://ai.google/static/images/share.png',
  'Groq API': 'https://pbs.twimg.com/profile_images/1765439820738570240/2QwQw6pA_400x400.jpg',
  'ResNet-34': 'https://upload.wikimedia.org/wikipedia/commons/6/6c/ResNet.png',
  'FAISS': 'https://avatars.githubusercontent.com/u/36327841?s=200&v=4',
  'LLaMA 3.2': 'https://seeklogo.com/images/M/meta-logo-0B6C6D7B0B-seeklogo.com.png',
  'PEFT': 'https://avatars.githubusercontent.com/u/126969164?s=200&v=4',
  'CrewAI': 'https://avatars.githubusercontent.com/u/167434715?s=200&v=4',
  'Gemini Flash': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_Gemini_logo.svg',
  'Gemini Pro': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Google_Gemini_logo.svg',
  'PDFPlumber/Fitz': 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4',
  'Manim': 'https://www.manim.community/assets/logo.png',
  'MoviePy': 'https://raw.githubusercontent.com/Zulko/moviepy/master/docs/logo.png',
  'gTTS': 'https://avatars.githubusercontent.com/u/7902842?s=200&v=4',
  'python-pptx': 'https://avatars.githubusercontent.com/u/646278?s=200&v=4',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  // Add more as needed
};

function getTechLogo(tech) {
  if (techLogos[tech]) return techLogos[tech];
  // Try devicon CDN fallback
  const deviconName = tech.toLowerCase().replace(/\+/g, 'plus').replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${deviconName}-original.svg`;
}

const cardWidth = 320;
const cardHeight = 370;

const ProjectCard = ({ project }) => {
  const [flipped, setFlipped] = React.useState(false);
  // Touch support for mobile
  const handleTouch = () => setFlipped(f => !f);
  return (
    <div
      style={{
        perspective: 1200,
        width: cardWidth,
        height: cardHeight,
        position: 'relative',
        margin: '0 auto',
      }}
      onTouchStart={handleTouch}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        {/* Front Side */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            background: 'rgba(40,40,60,0.92)',
            borderRadius: 20,
            padding: '18px',
            boxShadow: '0 2px 16px #7f5cff22',
            border: '1.5px solid #7f5cff33',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 2,
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{ width: 220, height: 120, objectFit: 'cover', borderRadius: 14, marginBottom: 18, boxShadow: '0 2px 12px #7f5cff33' }}
          />
          <div style={{ fontSize: 20, fontWeight: 700, color: '#bdbdfc', marginBottom: 8, textAlign: 'center' }}>{project.title}</div>
          <div style={{ fontSize: 15, color: '#e0e0ff', marginBottom: 18, textAlign: 'center', minHeight: 40 }}>{project.description}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(120deg, #23234a 60%, #7f5cff 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px #7f5cff22',
                  transition: 'background 0.18s, box-shadow 0.18s',
                  letterSpacing: 0.8,
                }}
              >
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(120deg, #7f5cff 60%, #4f46e5 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px #7f5cff55',
                  transition: 'background 0.18s, box-shadow 0.18s',
                  letterSpacing: 0.8,
                }}
              >
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
        {/* Back Side */}
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(40,40,60,0.98)',
            borderRadius: 20,
            padding: '28px 18px',
            boxShadow: '0 2px 32px #7f5cff44',
            border: '1.5px solid #7f5cff77',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 2,
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 40 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div style={{ fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 18, letterSpacing: 0.7, textAlign: 'center' }}>Tech Stack</div>
          <motion.ul
            initial="hidden"
            animate={flipped ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
            }}
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {project.techStack && project.techStack.map((tech, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ color: '#bdbdfc', fontWeight: 600, fontSize: 16, background: '#7f5cff22', borderRadius: 8, padding: '6px 16px', textAlign: 'center', boxShadow: '0 1px 6px #7f5cff22', display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <img src={getTechLogo(tech)} alt={tech + ' logo'} style={{ width: 28, height: 28, objectFit: 'contain', marginRight: 8, filter: 'drop-shadow(0 0 8px #7f5cff88)' }} onError={e => { e.target.style.display = 'none'; }} />
                {tech}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const { ref, controls } = useInViewAnimation();
  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-16"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;