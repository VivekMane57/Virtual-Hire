"use client"

import React, { useState } from 'react';

const videos = [
  {
    id: 1,
    title: 'Aptitude Video 1',
    url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_1',
    articles: [
      { title: 'Understanding Aptitude', link: '/path-to-article-1' },
      { title: 'Aptitude Tests Overview', link: '/path-to-article-2' },
    ],
    pdfNotes: [
      { title: 'Aptitude Notes PDF', link: '/path-to-pdf-notes-1' },
    ],
  },
  {
    id: 2,
    title: 'Aptitude Video 2',
    url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2',
    articles: [
      { title: 'Aptitude Practice Questions', link: '/path-to-article-3' },
    ],
    pdfNotes: [
      { title: 'Aptitude Practice PDF', link: '/path-to-pdf-notes-2' },
    ],
  },
  // Add more video objects as needed
];

const AptitudePage = () => {
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState(Array(videos.length).fill('')); // Array for multiple notes

  const handleCompletionToggle = () => {
    setCompleted(!completed);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  return (
    <div className="flex p-10">
      {/* Main Content */}
      <div className="flex-1 pr-10">
        <h1 className="text-2xl font-bold">Aptitude Practice</h1>

        {/* Render videos dynamically */}
        <div className="flex flex-col gap-6">
          {videos.map((video) => (
            <div key={video.id}>
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <iframe
                width="560"
                height="315"
                src={video.url}
                title={`YouTube video player - ${video.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Articles Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Articles</h3>
                <ul className="list-disc list-inside">
                  {video.articles.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.link}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PDF Notes Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">PDF Notes</h3>
                <ul className="list-disc list-inside">
                  {video.pdfNotes.map((pdf, index) => (
                    <li key={index}>
                      <a
                        href={pdf.link}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pdf.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notes Field */}
              <div className="mb-4 mt-4">
                <label className="block text-sm font-medium mb-2">Notes for {video.title}:</label>
                <textarea
                  rows="3"
                  className="w-full border rounded-md p-2 text-gray-700"
                  placeholder="Write your notes here..."
                  value={notes[video.id - 1]} // Access the specific note
                  onChange={(e) => handleNoteChange(video.id - 1, e.target.value)} // Update the specific note
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Resources</h2>

        {/* Mark as Completed */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletionToggle}
            className="mr-2"
          />
          <label className="text-sm">Mark as Completed</label>
        </div>
      </div>
    </div>
  );
};

export default AptitudePage;
