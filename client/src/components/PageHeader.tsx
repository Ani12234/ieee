import React from 'react';
import { Users } from 'lucide-react';

const PageHeader = () => {
  return (
    <div className="flex items-center justify-center mb-6 mt-16 sm:mt-20">
      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mr-2" />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
        Executive Committee
      </h1>
    </div>
  );
};

export default PageHeader;