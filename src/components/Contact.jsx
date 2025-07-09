import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../utils/animations';

const Contact = () => {
  const { ref, controls } = useInViewAnimation();

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center text-center py-16"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
      }}
    >
      <div className="text-white max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Me</h2>
        <p className="text-lg md:text-xl mb-6">
          Want to collaborate on a cosmic project? Reach out!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:your.email@example.com"
            className="text-indigo-400 hover:text-indigo-600"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            className="text-indigo-400 hover:text-indigo-600"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yourprofile"
            className="text-indigo-400 hover:text-indigo-600"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;