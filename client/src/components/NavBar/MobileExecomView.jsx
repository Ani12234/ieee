import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommitteePage from '../../pages/CommitteePage';
import UnderConstruction from '../../components/UnderConstruction/UnderConstruction';

const MobileExecomView = ({ year, onClose }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/execoms');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]">
      <div className="absolute top-20 left-0 right-0 bottom-0 bg-[#0A0011] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">Execom {year}</h2>
            <button
              onClick={handleBack}
              className="text-white hover:text-gray-300"
            >
              Close
            </button>
          </div>
          {year === "2025" ? (
            <CommitteePage />
          ) : (
            <UnderConstruction />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileExecomView; 