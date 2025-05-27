import React, { useEffect, useState } from 'react';

const LandingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  const fullText = 'Meet The Executive Committee of BEC-IEEE student branch';
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(onComplete, 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center max-w-4xl px-4">
        {text}
        <span className="animate-pulse">|</span>
      </h1>
    </div>
  );
};

export default LandingAnimation;