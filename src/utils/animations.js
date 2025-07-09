import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export const useInViewAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return {
    ref,
    controls: isInView ? 'visible' : 'hidden',
  };
};