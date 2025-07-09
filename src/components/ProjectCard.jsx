import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ image, title, description, github, demo }) => (
    <motion.div
        whileHover={{ scale: 1.08, boxShadow: '0 8px 32px #7f5cff77' }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(40,40,60,0.92)',
            borderRadius: 20,
            padding: '18px 18px 18px 18px',
            boxShadow: '0 2px 16px #7f5cff22',
            border: '1.5px solid #7f5cff33',
            minWidth: 260,
            minHeight: 320,
            margin: '0 auto',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, background 0.18s',
            zIndex: 2,
            position: 'relative',
        }}
    >
        <img
            src={image}
            alt={title + ' demo'}
            style={{ width: 220, height: 120, objectFit: 'cover', borderRadius: 14, marginBottom: 18, boxShadow: '0 2px 12px #7f5cff33' }}
        />
        <div style={{ fontSize: 20, fontWeight: 700, color: '#bdbdfc', marginBottom: 8, textAlign: 'center' }}>{title}</div>
        <div style={{ fontSize: 15, color: '#e0e0ff', marginBottom: 18, textAlign: 'center', minHeight: 40 }}>{description}</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
            <a
                href={github}
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
            <a
                href={demo}
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
        </div>
    </motion.div>
);

export default ProjectCard; 