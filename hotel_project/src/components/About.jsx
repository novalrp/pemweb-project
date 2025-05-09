import React from 'react';
import Title from './Title'; // Pastikan Title sudah dibuat
import { teamMembers } from '../assets/assets';

const About = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gradient-to-r from-teal-100 via-indigo-100 to-lime-100 pt-20 pb-30">
      <Title
        title="Tentang Kami"
        subTitle="Kami adalah tim pengembang yang berdedikasi untuk memberikan pengalaman terbaik bagi pengguna."
      />
      
      <div className="grid grid-cols-4 gap-6 mt-20 max-w-7xl">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-lg max-w-xs mx-auto">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">{member.name}</h3>
            <p className="text-center text-gray-500">{member.role}</p>
            <p className="text-gray-600 mt-4 text-center">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
