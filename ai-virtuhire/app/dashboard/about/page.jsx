// import React from 'react'

// function page() {
//   return (
//     <div className='shadow-sm max-width-400 mt-10'>
//       <h1 className='text-2xl font-extrabold text-blue-900 sm:text-3xl text-center mt-5'>About AI-VirtuHire</h1>
//       <div className='border shadow-sm mt-8 p-10'>
//         <p className='font-arial mt-8'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque nobis, sunt deleniti laborum quos impedit expedita officiis iste. Sequi, quidem laboriosam cum esse alias nobis placeat recusandae sit inventore fugiat.</p>
//         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, harum? A nobis doloremque, nam laudantium inventore ipsam id molestiae excepturi expedita quia ex fugiat et unde ipsa? Maiores, reiciendis corrupti.</p>
//         <h3 className='text-primary font-bold'>Benifits</h3>
//         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab delectus maxime maiores nulla voluptate earum facilis fuga dolore aliquid exercitationem dicta beatae aut, veniam vitae doloremque, necessitatibus, harum perspiciatis a.
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur labore necessitatibus facere saepe velit, perferendis repellendus architecto odio? Ex at quod officia inventore repudiandae. Debitis veniam at explicabo quis?
//         </p>
//         <h3 className='text-primary font-bold'>Team Members:</h3>
//         <div className='grid'>
//           <img src="/imag.jpg" alt="" />
//           <h4 className='font-bold'>Chetan Mohan Raval</h4>
//           <h5 className='text-sm text-gray-600'>Third Year CSE-AIML DYPCET</h5>
//           <br />
//           <img src="/imag.jpg" alt="" />
//           <h4 className='font-bold'>Pratik Yuvraj Chougule</h4>
//           <h5 className='text-sm text-gray-600'>Third Year CSE-AIML DYPCET</h5>
//           <br />
//           <img src="/imag.jpg" alt="" />
//           <h4 className='font-bold'>Sahil Amir Mulani</h4>
//           <h5 className='text-sm text-gray-600'>Third Year CSE-AIML DYPCET</h5>
//           <br />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default page

import React from 'react';

function page() {
  return (
    <div className='shadow-lg max-w-4xl mx-auto mt-10 p-8 bg-white'>
      <h1 className='text-3xl font-extrabold text-blue-800 text-center mb-8'>About AI-VirtuHire</h1>
      <div className='border shadow-sm p-6 rounded-lg bg-gray-50'>
        <p className='mb-4'>
          AI-VirtuHire is a next-generation AI-powered virtual interview platform designed to streamline the hiring process for organizations. By leveraging advanced AI and machine learning models, AI-VirtuHire evaluates candidates through automated interviews that mimic real-world boardroom experiences. This tool allows for an unbiased assessment of technical, managerial, and soft skills, providing employers with a comprehensive understanding of a candidate's capabilities.
        </p>
        <h3 className='text-primary font-bold text-xl mb-4'>Benefits</h3>
        <ul className='list-disc list-inside mb-4'>
          <li>Streamlines the hiring process with AI automation.</li>
          <li>Provides unbiased, objective evaluations of candidates.</li>
          <li>Reduces the need for multiple interview rounds, saving time.</li>
          <li>Analyzes verbal and non-verbal communication cues.</li>
          <li>Offers detailed insights for better hiring decisions.</li>
        </ul>

        <h3 className='text-primary font-bold text-xl mb-4'>Team Members</h3>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
          <div className='text-center'>
            <img src="/New_Photo.jpg" alt="Chetan Raval" className='mx-auto rounded-full w-32 h-32 object-cover mb-4' />
            <h4 className='font-bold text-lg'>Chetan Mohan Raval</h4>
            <h5 className='text-sm text-gray-600'>Third Year CSE-AIML, DYPCET</h5>
          </div>

          <div className='text-center'>
            <img src="/imag.jpg" alt="Pratik Chougule" className='mx-auto rounded-full w-32 h-32 object-cover mb-4' />
            <h4 className='font-bold text-lg'>Pratik Yuvraj Chougule</h4>
            <h5 className='text-sm text-gray-600'>Third Year CSE-AIML, DYPCET</h5>
          </div>

          <div className='text-center'>
            <img src="/imag.jpg" alt="Sahil Mulani" className='mx-auto rounded-full w-32 h-32 object-cover mb-4' />
            <h4 className='font-bold text-lg'>Sahil Amir Mulani</h4>
            <h5 className='text-sm text-gray-600'>Third Year CSE-AIML, DYPCET</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
