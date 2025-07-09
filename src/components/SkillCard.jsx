import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ logo, name }) => (
    <motion.div
        whileHover={{ scale: 1.15, boxShadow: '0 8px 32px #7f5cff77' }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(40,40,60,0.92)',
            borderRadius: 20,
            padding: '28px 10px 16px 10px',
            boxShadow: '0 2px 16px #7f5cff22',
            border: '1.5px solid #7f5cff33',
            minWidth: 120,
            minHeight: 140,
            margin: '0 auto',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, background 0.18s',
            zIndex: 2,
        }}
    >
        <img
            src={logo}
            alt={name + ' logo'}
            style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 14, filter: 'drop-shadow(0 0 12px #7f5cff88)' }}
        />
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{ color: '#bdbdfc', fontWeight: 700, fontSize: 17, textAlign: 'center', letterSpacing: 0.5 }}
        >
            {name}
        </motion.span>
    </motion.div>
);

export default SkillCard; 