import React from 'react';

function page() {
  return (
    <div className='shadow-lg max-w-4xl mx-auto mt-10 p-8 bg-white'>
      <h1 className='text-3xl font-extrabold text-blue-800 text-center mb-8'>About AI-VirtuHire</h1>
      
      <div className='border shadow-sm p-6 rounded-lg bg-gray-50'>
        <p className='mb-4'>
          AI-VirtuHire is an AI-powered virtual interview assistant built for modern hiring workflows.
          It helps organizations evaluate candidates using AI-generated interviews, skills assessment, 
          ATS resume analysis, and intelligent scoring. The platform simulates real interview 
          environments, enabling fair and data-driven hiring decisions.
        </p>

        <h3 className='text-primary font-bold text-xl mb-4'>Why AI-VirtuHire?</h3>
        <ul className='list-disc list-inside mb-4 leading-relaxed'>
          <li>Automates mock and real interview processes with AI.</li>
          <li>Provides data-driven and unbiased candidate evaluation.</li>
          <li>Reduces manual interviewer workload and interview fatigue.</li>
          <li>Supports ATS scoring, resume improvement, and job match analysis.</li>
          <li>Improves learning outcomes for students and hiring efficiency for companies.</li>
        </ul>

        <h3 className='text-primary font-bold text-xl mb-4'>Developer</h3>
        <div className='text-center'>
          <img
            src="/vivek.jpg"
            alt="Vivek Mane"
            className='mx-auto rounded-full w-40 h-40 object-cover mb-4 border-2 border-gray-300'
          />
          <h4 className='font-bold text-xl'>Vivek Mane</h4>
          <h5 className='text-sm text-gray-600 mt-1'>Final Year B.Tech | Computer Science & Engineering</h5>
        </div>
      </div>
    </div>
  );
}

export default page;
