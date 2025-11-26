

// "use client";
// import { useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// import { db } from '@/utils/db'; // Ensure this path is correct for your db import
// import { resumeScore } from '@/utils/schema'; // Import your schema
// import { chatSession } from '@/utils/GeminiAiModel';

// // Point to the local worker file in the public directory
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

// export default function ATS() {
//   const [jobDescription, setJobDescription] = useState('');
//   const [resumeFile, setResumeFile] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false); // For loading indicator

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setResumeFile(file);
//     await extractTextFromPDF(file);
//   };

//   const extractTextFromPDF = async (file) => {
//     const reader = new FileReader();
//     reader.onload = async function () {
//       const typedarray = new Uint8Array(this.result);
//       const pdf = await pdfjsLib.getDocument(typedarray).promise;
//       let text = '';

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item) => item.str).join(' ');
//       }
//       setExtractedText(text);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!resumeFile) {
//       alert("Please upload a resume PDF.");
//       return;
//     }

//     // Show loading state
//     setLoading(true);

//     // Create feedback prompt
//     const feedbackPrompt = `
//       Job Description: ${jobDescription}, 
//       Resume Text: ${extractedText}. 
//       Please provide an ATS score, strengths, weaknesses, and job match percentage (if job description is given) 
//       in JSON format with fields 'atsScore', 'strengths', 'weaknesses', and 'jobMatching'.
//     `;

//     try {
//       // Send feedback prompt to Gemini API
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       let responseText = await result.response.text();

//       // Extract JSON part from response
//       const jsonMatch = responseText.match(/\{.*\}/s); // Match JSON object in the response
//       if (jsonMatch) {
//         const JsonFeedbackResp = JSON.parse(jsonMatch[0]);

//         // Store the data in the database
//         await db.insert(resumeScore).values({
//           mockIdRef: "unique_mock_id", // Replace with the actual mock interview ID
//           resumeText: extractedText,
//           jobDescription: jobDescription,
//           atsScore: JsonFeedbackResp.atsScore || '',
//           strength: JsonFeedbackResp.strengths.join(', ') || '',
//           weakness: JsonFeedbackResp.weaknesses.join(', ') || '',
//           jobMatching: JsonFeedbackResp.jobMatching || '',
//         });

//         setResults(JsonFeedbackResp); // Update the UI with the response
//       } else {
//         console.error("No valid JSON found in the response:", responseText);
//         alert("Error: Could not parse feedback from the response.");
//       }
//     } catch (error) {
//       console.error("Error saving data or generating feedback:", error);
//     } finally {
//       setLoading(false); // Turn off loading state
//     }
//   };


//   return (
//     <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
//       <h1 className="text-2xl font-bold text-center mb-6">ATS Resume Analyzer</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           placeholder="Paste Job Description"
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="6"
//         />

//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
//         />

//         <button
//           type="submit"
//           className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
//         >
//           {loading ? "Analyzing..." : "Analyze"}
//         </button>
//       </form>

//       {loading && (
//         <p className="text-center text-gray-600 mt-4">Analyzing resume and generating feedback...</p>
//       )}

//       {/* {extractedText && (
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
//           <h2 className="text-xl font-semibold">Extracted Resume Text</h2>
//           <p className="mt-2 text-gray-700 whitespace-pre-wrap">{extractedText}</p>
//         </div>
//       )} */}

//       {results && (
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
//           <h2 className="text-xl font-semibold">Results</h2>
//           <h3 className="mt-2 text-lg">ATS Score: <span className="font-bold">{results.atsScore}</span></h3>
//           {results.jobMatching && (
//             <p className="mt-4 font-semibold">Job Match Percentage: <span className="text-blue-600">{results.jobMatching}%</span></p>
//           )}
//           <div className="mt-4">
//             <h4 className="font-semibold">Strengths:</h4>
//             <ul className="list-disc ml-5">
//               {results.strengths.map((str, index) => (
//                 <li key={index} className="text-gray-700">{str}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="mt-4">
//             <h4 className="font-semibold">Weaknesses:</h4>
//             <ul className="list-disc ml-5">
//               {results.weaknesses.map((weak, index) => (
//                 <li key={index} className="text-gray-700">{weak}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { db } from "@/utils/db";
import { resumeScore } from "@/utils/schema";
import { generateAtsFeedback } from "@/utils/GeminiAiModel";


// PDF worker (keep your worker file in /public)
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function ATS() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [results, setResults] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    await extractTextFromPDF(file);
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();

    reader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + "\n";
        }

        setExtractedText(text);
      } catch (err) {
        console.error("Error reading PDF:", err);
        alert("Failed to read PDF. Please try a different file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload a resume PDF.");
      return;
    }

    if (!extractedText.trim()) {
      alert("Could not read text from the PDF. Try another file.");
      return;
    }

    setLoading(true);

    const feedbackPrompt = `
You are an ATS resume analyzer.

Job Description:
${jobDescription || "Not provided"}

Resume Text:
${extractedText}

Return ONLY strict JSON (no extra text) with this structure:
{
  "atsScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "missingKeywords": string[],
  "suggestions": string[],
  "jobMatching": number
}
    `;

    try {
      // 🔮 Call Gemini helper
      const responseText = await generateAtsFeedback(feedbackPrompt);

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("No JSON in Gemini response:", responseText);
        alert("Could not parse feedback from Gemini.");
        return;
      }

      const jsonFeedback = JSON.parse(jsonMatch[0]);

      // Save to DB
      await db.insert(resumeScore).values({
        mockIdRef: "unique_mock_id", // TODO: replace with real mock id
        resumeText: extractedText,
        jobDescription: jobDescription,
        atsScore: jsonFeedback.atsScore ?? "",
        strength: (jsonFeedback.strengths || []).join(", "),
        weakness: (jsonFeedback.weaknesses || []).join(", "),
        jobMatching: jsonFeedback.jobMatching ?? "",
        missingKeywords: (jsonFeedback.missingKeywords || []).join(", "),
        suggestions: (jsonFeedback.suggestions || []).join(", "),
      });

      setResults(jsonFeedback);
    } catch (error) {
      console.error("Error saving data or generating feedback:", error);
      alert("Failed to generate feedback from Gemini. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
      <h1 className="text-2xl font-bold text-center mb-6">
        ATS Resume Analyzer
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Paste Job Description (optional)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {loading && (
        <p className="text-center text-gray-600 mt-4">
          Analyzing resume and generating feedback...
        </p>
      )}

      {results && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
          <h2 className="text-xl font-semibold">Results</h2>

          <h3 className="mt-2 text-lg">
            ATS Score: <span className="font-bold">{results.atsScore}</span>
          </h3>

          {results.jobMatching !== undefined && (
            <p className="mt-4 font-semibold">
              Job Match Percentage:{" "}
              <span className="text-blue-600">{results.jobMatching}%</span>
            </p>
          )}

          <Section title="Strengths" items={results.strengths} />
          <Section title="Weaknesses" items={results.weaknesses} />
          <Section title="Missing Keywords" items={results.missingKeywords} />
          <Section title="Suggestions" items={results.suggestions} />
        </div>
      )}
    </div>
  );
}

function Section({ title, items }) {
  if (!items || !items.length) {
    return (
      <div className="mt-4">
        <h4 className="font-semibold">{title}:</h4>
        <p className="text-gray-700">No data.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="font-semibold">{title}:</h4>
      <ul className="list-disc ml-5">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
