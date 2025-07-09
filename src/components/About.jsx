import React from 'react';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../utils/animations';
// import avatar from '../assets/images/avatar.jpg';

const About = () => {
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
        <img
        //   src={avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6"
        />
        <p className="text-lg md:text-xl">
          I'm a passionate developer exploring the vast expanse of technology. My
          mission is to create stellar projects that push boundaries and inspire
          others. Age: 21, Location: India, Tech Stack: JavaScript, React, Node,
        </p>
      </div>
    </motion.section>
  );
};

export default About;