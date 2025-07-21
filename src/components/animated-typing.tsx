"use client";

import { useState, useEffect, type FC } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTypingProps {
  titles: string[];
  className?: string;
}

const AnimatedTyping: FC<AnimatedTypingProps> = ({ titles, className }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(150);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let newCharIndex = charIndex;
      if (isDeleting) {
        newCharIndex -= 1;
      } else {
        newCharIndex += 1;
      }

      if (newCharIndex === titles[titleIndex].length + 1) {
        setIsDeleting(true);
        setDelay(2000); // Pause before deleting
      } else if (newCharIndex === -1) {
        setIsDeleting(false);
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        newCharIndex = 0;
        setDelay(500); // Pause before typing new title
      } else {
        setDelay(isDeleting ? 75 : 150);
      }
      setCharIndex(newCharIndex);
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex, titles, delay]);

  return (
    <span className={cn(className)}>
      {titles[titleIndex].substring(0, charIndex)}
      <span className="blinking-cursor text-accent">|</span>
    </span>
  );
};

export default AnimatedTyping;
