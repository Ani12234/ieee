import React, { useState, useEffect } from 'react';
import { IoTerminalOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ text }) => {
  const [showMessage, setShowMessage] = useState(true);
  const [hasTimerRun, setHasTimerRun] = useState(false);

  useEffect(() => {
    if (showMessage && !hasTimerRun) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setHasTimerRun(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage, hasTimerRun]);

  return (
    <div className="fixed bottom-5 right-5 flex items-center gap-3 z-50">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-black sm:w-80 w-64 px-4 py-2 rounded-lg shadow-lg border border-gray-600"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:scale-110 active:scale-90"
        onClick={() => setShowMessage(!showMessage)}
      >
        <IoTerminalOutline size={24} className="text-white" />
      </motion.button>
    </div>
  );
};

export default Popup;
