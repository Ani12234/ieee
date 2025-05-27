import React from 'react';
import MemberCard from '../components/MemberCard';
import PageHeader from '../../components/PageHeader';
import { committees } from '../../components/data/committees';

const CommitteePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0022] to-[#0A0011] py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader />
        
        {committees.map((committee) => (
          <div key={committee.name} className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                {committee.name}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5">
              {committee.members.map((member) => (
                <MemberCard
                  key={member.name}
                  image={member.image}
                  name={member.name}
                  designation={member.designation}
                  linkedin={member.linkedin}
                  portfolio={member.portfolio}
                  email={member.email}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteePage;