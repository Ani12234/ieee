import React from 'react';
import type { Committee } from './data/committees';

interface CommitteeSelectorProps {
  committees: Committee[];
  activeCommittee: string;
  onSelect: (name: string) => void;
}

const CommitteeSelector = ({ committees, activeCommittee, onSelect }: CommitteeSelectorProps) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
      {committees.map((committee) => (
        <button
          key={committee.name}
          onClick={() => onSelect(committee.name)}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 ${
            activeCommittee === committee.name
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
          }`}
        >
          {committee.name}
        </button>
      ))}
    </div>
  );
};

export default CommitteeSelector;